import awsIot from 'aws-iot-device-sdk';
import { checkStatus, errorResponse } from '../Utils';

const ONE_HOUR = 60 * 60 * 1000;

class Notifications {
    constructor(config, Account) {
        this.subscription = null;
        this.config = config;
        this.Account = Account;
    }

    async getIotToken() {
        if (!this.isAuthenticated()) {
            errorResponse(401, {
                code: 401,
                message: 'User is not authenticated',
            });
        }
        const t = this.getToken();

        const response = await fetch(this.config.AWS_IOT_URL, {
            headers: {
                Authorization: 'Bearer ' + t.token,
            },
        });

        checkStatus(response);

        return await response.json();
    }

    /* Subscribes to Websocket notifications */
    async subscribe(accountUuid = '', callbackParams) {
        if (!accountUuid && accountUuid === '') {
            return false;
        }

        if (callbackParams && callbackParams.onMessage) {
            if (typeof callbackParams.onMessage !== 'function') {
                console.warn('[InPlayer Notifications] onMessage not defined');
                return false;
            }
        } else {
            callbackParams.onMessage = e => console.log('Received message:', e);
        }

        if (callbackParams && callbackParams.onOpen) {
            if (typeof callbackParams.onOpen !== 'function') {
                console.warn('[InPlayer Notifications] onOpen not defined');
                return false;
            }
        }

        const json = localStorage.getItem(this.config.INPLAYER_IOT_NAME);

        if (!json) {
            console.warn(
                '[InPlayer Notifications] Unable to fetch iot credentials'
            );
            return false;
        }

        const iamCreds = JSON.parse(json);

        if (
            iamCreds &&
            iamCreds.expiresAt &&
            new Date() - iamCreds.expiresAt > ONE_HOUR
        ) {
            this.handleSubscribe(iamCreds, callbackParams, accountUuid);

            return true;
        }

        const resp = await this.getIotToken();

        localStorage.setItem(
            this.config.INPLAYER_IOT_NAME,
            JSON.stringify(resp)
        );

        this.handleSubscribe(resp, callbackParams, accountUuid);
        return true;
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

        this.client.on('connect', data => {
            this.client.subscribe(uuid);
            callbackParams.onOpen();
        });

        this.client.on('message', (topic, message) => {
            callbackParams.onMessage(message.toString());
        });

        this.client.on('close', () => {
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

export default Notifications;
