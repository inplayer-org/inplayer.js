/* eslint-disable no-console */
import awsIot from 'aws-iot-device-sdk';
import { ApiConfig, Request } from '../models/Config';
import BaseExtend from '../extends/base';
import tokenStorage from './tokenStorage';

const ONE_HOUR = 60 * 60 * 1000;

class Notifications extends BaseExtend {
  subscription: any;
  constructor(config: ApiConfig, request: Request) {
    super(config, request);
    this.subscription = null;
  }

  async getIotToken(): Promise<any> {
    const tokenObject = await this.request.getToken();

    const iotResponse = await this.request.authenticatedGet(
      this.config.AWS_IOT_URL,
      {
        headers: {
          Authorization: `Bearer ${tokenObject.token}`,
        },
      },
    );

    return {
      ...iotResponse.data,
      iotEndpoint: this.config.IOT_NOTIF_URL,
    };
  }

  /* Subscribes to Websocket notifications */
  async subscribe(
    accountUuid = '',
    callbackParams: Record<string, (...params: any) => void>,
  ): Promise<boolean> {
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
      callbackParams.onMessage = (e: any) =>
        console.log('Received message:', e);
    }

    if (callbackParams && callbackParams.onOpen) {
      if (typeof callbackParams.onOpen !== 'function') {
        console.warn('[InPlayer Notifications] onOpen not defined');
        return false;
      }
    }

    const inplayerIotCreds: any = await tokenStorage.getItem(
      this.config.INPLAYER_IOT_KEY,
    );

    if (!inplayerIotCreds) {
      console.warn('[InPlayer Notifications] Unable to fetch iot credentials');
    }

    const iamCreds = JSON.parse(inplayerIotCreds);

    if (
      iamCreds
      && iamCreds.expiresAt
      && new Date().getMilliseconds() - iamCreds.expiresAt > ONE_HOUR // TODO: check if should be ms
    ) {
      this.handleSubscribe(iamCreds, callbackParams, accountUuid);

      return true;
    }

    const resp = await this.getIotToken();

    await tokenStorage.setItem(
      this.config.INPLAYER_IOT_KEY,
      JSON.stringify(resp),
    );

    this.handleSubscribe(resp, callbackParams, accountUuid);

    return true;
  }

  handleSubscribe(
    data: Record<string, unknown>,
    callbackParams: Record<string, any>,
    uuid: string,
  ): void {
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

  setClient(client: any): void {
    this.subscription = client;
  }

  isSubscribed(): boolean {
    return this.subscription !== null;
  }

  unsubscribe(): void {
    if (this.subscription) {
      this.subscription.end();
      this.subscription = null;
    }
  }
}

export default Notifications;
