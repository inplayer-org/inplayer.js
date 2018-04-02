import awsIot from 'aws-iot-device-sdk';
import { config } from '../../config';
import User from '../Models/User';

class Socket {
    constructor(config) {
        this.subscription = null;
        this.config = config;
    }

    async getIotToken() {
        const authToken = localStorage.getItem(this.config.INPLAYER_TOKEN_NAME);

        if (!authToken) {
            return null;
        }

        const response = await fetch(this.config.AWS_IOT_URL, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + authToken,
            },
        });

        const responseData = await response.json();

        return responseData;
    }

    /* Subscribes to Websocket notifications */
    subscribe(accountUid, callbackParams) {
        /* Check for callback functions */
        if (!accountUid && accountUid !== '') {
            return false;
        }

        if (callbackParams && callbackParams.onMessage) {
            if (typeof callbackParams.onMessage !== 'function') {
                return false;
            }
        } else {
            callbackParams.onMessage = e => console.log('Received message:', e);
        }

        if (callbackParams && callbackParams.onOpen) {
            if (typeof callbackParams.onOpen !== 'function') {
                return false;
            }
        }

        /* Connect Stomp over ws */
        var parent = this;
        var uuid = accountUid;

        const IAMToken = localStorage.getItem(config.INPLAYER_IOT_NAME);

        if (!IAMToken) {
            this.getIotToken().then(data => {
                if (!data) {
                    throw new Error(
                        'Invalid AUTH token. You need to be signed in to subscribe.'
                    );
                }
                localStorage.setItem(
                    config.INPLAYER_IOT_NAME,
                    JSON.stringify(data)
                );

                //subscribe
                this.handleSubscribe(data, callbackParams, uuid);
            });
        } else {
            const data = JSON.parse(IAMToken);
            this.handleSubscribe(data, callbackParams, uuid);
        }
    }

    handleSubscribe(data, callbackParams, uuid) {
        const credentials = {
            region: data.region,
            protocol: 'wss',
            accessKeyId: data.accessKey,
            secretKey: data.secretKey,
            sessionToken: data.sessionToken,
            port: 443,
            host: data.iotEndpoint,
        };

        const client = awsIot.device(credentials);

        client.on('connect', data => {
            client.subscribe(uuid);
            callbackParams.onOpen();
            this.setClient(client);
        });

        client.on('message', (topic, message) => {
            const decoded_message = message.toString();
            callbackParams.onMessage(decoded_message);
        });

        client.on('close', () => {
            if (callbackParams.onClose === 'function') {
                callbackParams.onClose();
            }
        });
    }

    setClient(client) {
        this.subscription = client;
    }

    unsubscribe() {
        if (this.subscription) {
            this.subscription.end();
        }
    }
}

export default Socket;
