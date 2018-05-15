import awsIot from 'aws-iot-device-sdk';
import { config } from '../../config';

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

        return await response.json();
    }

    async getIotOAuthToken() {
        const authToken = localStorage.getItem(this.config.INPLAYER_TOKEN_NAME);

        if (!authToken) {
            return null;
        }

        const response = await fetch(this.config.AWS_IOT_URL, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + JSON.parse(authToken).access_token,
            },
        });

        return await response.json();
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
        let parent = this;
        let uuid = accountUid;

        const IAMToken = localStorage.getItem(config.INPLAYER_IOT_NAME);
        const ONE_HOUR = 60 * 60 * 1000;

        if (
            !IAMToken ||
            !IAMToken.expiresAt ||
            new Date() - IAMToken.expiresAt > ONE_HOUR
        ) {
            this.getIotToken().then(data => {
                if (!data) {
                    this.getIotOAuthToken().then(data2 => {
                        if (!data2) {
                            throw new Error(
                                'Invalid AUTH token. You need to be signed in to subscribe.'
                            );
                        }

                        data2.expiresAt = new Date();
                        localStorage.setItem(
                            config.INPLAYER_IOT_NAME,
                            JSON.stringify(data2)
                        );

                        //subscribe
                        this.handleSubscribe(data2, callbackParams, uuid);
                    });
                }
                data.expiresAt = new Date();
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

        this.client = awsIot.device(credentials);
        let parent = this;

        this.client.on('connect', function(data) {
            parent.client.subscribe(uuid);
            callbackParams.onOpen();
        });

        this.client.on('message', function(topic, message) {
            const decoded_message = message.toString();
            callbackParams.onMessage(decoded_message);
        });

        this.client.on('close', function() {
            if (callbackParams.onClose === 'function') {
                callbackParams.onClose();
            }
        });

        this.setClient(this.client);
    }

    setClient(client) {
        this.subscription = client;
    }

    isSubscribed() {
        return this.subscription !== null;
    }

    unsubscribe() {
        if (this.subscription) {
            this.subscription.end();
        }
    }
}

export default Socket;
