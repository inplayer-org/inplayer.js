import awsIot from 'aws-iot-device-sdk';
import { getToken, authenticatedApi } from '../Utils/http';
import { Account } from '../Interfaces/IAccount&Authentication';
import { ApiConfig } from '../Interfaces/CommonInterfaces';

const ONE_HOUR = 60 * 60 * 1000;

class Notifications {
  subscription: any;
  config: ApiConfig;
  Account: Account;
  constructor(config: ApiConfig, account: Account) {
    this.subscription = null;
    this.config = config;
    this.Account = account;
  }

  async getIotToken() {
    const iotResponse = await authenticatedApi.get(this.config.AWS_IOT_URL, {
      headers: {
        Authorization: `Bearer ${getToken().token}`,
      },
    });

    return {
      ...iotResponse.data,
      iotEndpoint: this.config.IOT_NOTIF_URL,
    };
  }

  /* Subscribes to Websocket notifications */
  async subscribe(accountUuid = '', callbackParams: Record<string, (...params: any) => void>) {
    if (!accountUuid && accountUuid === '') {
      return false;
    }

    if (callbackParams && callbackParams.onMessage) {
      if (typeof callbackParams.onMessage !== 'function') {
        console.warn('[InPlayer Notifications] onMessage not defined');
        return false;
      }
    } else {
      // eslint-disable-next-line no-param-reassign
      callbackParams.onMessage = (e: any) => console.log('Received message:', e);
    }

    if (callbackParams && callbackParams.onOpen) {
      if (typeof callbackParams.onOpen !== 'function') {
        console.warn('[InPlayer Notifications] onOpen not defined');
        return false;
      }
    }

    const json: any = sessionStorage.getItem(this.config.INPLAYER_IOT_KEY);

    if (!json) {
      console.warn('[InPlayer Notifications] Unable to fetch iot credentials');
    }

    const iamCreds = JSON.parse(json);

    if (
      iamCreds
      && iamCreds.expiresAt
      && new Date().getMilliseconds() - iamCreds.expiresAt > ONE_HOUR // TODO: check if should be ms
    ) {
      this.handleSubscribe(iamCreds, callbackParams, accountUuid);

      return true;
    }

    const resp = await this.getIotToken();

    sessionStorage.setItem(this.config.INPLAYER_IOT_KEY, JSON.stringify(resp));

    this.handleSubscribe(resp, callbackParams, accountUuid);
    return true;
  }

  handleSubscribe(data: any, callbackParams: Record<string, any>, uuid: string) {
    const credentials: any = {
      region: data.region,
      protocol: 'wss',
      accessKeyId: data.accessKey,
      secretKey: data.secretKey,
      sessionToken: data.sessionToken,
      port: 443,
      host: data.iotEndpoint,
    };

    /* eslint-disable new-cap */
    const client = new awsIot.device(credentials);

    client.on('connect', () => {
      client.subscribe(uuid);
      callbackParams.onOpen();
    });

    client.on('message', (topic: any, message: any) => {
      callbackParams.onMessage(message.toString());
    });

    client.on('close', () => {
      if (callbackParams.onClose === 'function') {
        callbackParams.onClose();
      }
    });

    this.setClient(client);
  }

  setClient(client: any) {
    this.subscription = client;
  }

  isSubscribed() {
    return this.subscription !== null;
  }

  unsubscribe() {
    if (this.subscription) {
      this.subscription.end();
      this.subscription = null;
    }
  }
}

export default Notifications;
