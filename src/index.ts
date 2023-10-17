/**
 * @module InPlayer
 */
import { AxiosRequestConfig } from 'axios';
import Account from './endpoints/account';
import Asset from './endpoints/asset';
import Payment from './endpoints/payment';
import Subscription from './endpoints/subscription';
import Branding from './endpoints/branding';
import Voucher from './endpoints/voucher';
import NFTs from './endpoints/nfts';
import Notifications from './factories/notifications';
import RequestFactory from './factories/request';
import tokenStorage, { TokenStorageType } from './factories/tokenStorage';
import config from './config';

// types
import {
  Notifications as NotificationsType,
  Env,
} from './models/CommonInterfaces';
import { ApiConfig, Request as RequestType } from './models/Config';
import { Account as AccountType } from './models/IAccount&Authentication';
import { Asset as AssetType } from './models/IAsset&Access';
import { Payment as PaymentType } from './models/IPayment';
import { Subscription as SubscriptionType } from './models/ISubscription';
import { Voucher as VoucherType } from './models/IVoucher&Promotion';
import { NFTs as NFTsType } from './models/INFTs';
import { Branding as BrandingType } from './models/IBrand';

/**
 * Main class. Contains all others methods and websocket subscription
 *
 * @class InPlayer
 */
export class InPlayer {
  /** @internal */
  config: ApiConfig;
  /** @internal */
  Account: AccountType;
  /** @internal */
  Asset: AssetType;
  /** @internal */
  Payment: PaymentType;
  /** @internal */
  Subscription: SubscriptionType;
  /** @internal */
  Voucher: VoucherType;
  /** @internal */
  NFTs: NFTsType;
  /** @internal */
  Branding: BrandingType;
  /** @internal */
  Notifications: NotificationsType;
  /** @internal */
  request: RequestType;
  /** @internal */
  tokenStorage: TokenStorageType = tokenStorage;

  constructor() {
    this.config = config.production;
    this.request = new RequestFactory(this.config);
    this.Account = new Account(this.config, this.request);
    this.Asset = new Asset(this.config, this.request);
    this.Payment = new Payment(this.config, this.request);
    this.Subscription = new Subscription(this.config, this.request);
    this.Voucher = new Voucher(this.config, this.request);
    this.Branding = new Branding(this.config, this.request);
    this.Notifications = new Notifications(this.config, this.request);
    this.NFTs = new NFTs(this.config, this.request);
  }

  /**
   * Subscribes to websocket events
   * @method subscribe
   * @param {string} accountUuid - The users account UUID
   * @param {Record<string, (...params) => void>} callbackParams - Methods regarding websocket
   * {
   *  onMessage: function,
   *  onOpen: function,
   *  onClose: function
   * }
   * @example
   *     InPlayer.subscribe(
   *      'adsasd-d1-cjc1c-1ajaveo',
   *      {
   *        onMessage: (message) =>
   *        {
   *          let body = JSON.parse(message.body); console.log(body, 'message')
   *        },
   *        onOpen: (e) => console.log('open'),
   *        onClose: (e) => console.log('close', e)
   *      }
   *    )
   */
  subscribe(
    accountUuid: string,
    callbackParams: Record<string, (...params: any) => void>,
  ): void {
    if (this.request.isAuthenticated()) {
      this.Notifications.subscribe(accountUuid, callbackParams)
        .then((data: any) => {
          if (!data) {
            console.error('An error has occured while subscribing.');
          }
        })
        .catch((error: any) => {
          if (error.response) {
            console.warn(error.response);
          }
        });
    }
  }

  /**
   * Checks if user is subscribed
   * @method isSubscribed
   * @example
   *        InPlayer.isSubscribed()
   * @returns {boolean}
   */
  isSubscribed(): boolean {
    return this.Notifications.isSubscribed();
  }

  /**
   * Unsubscribes from the websocket and event listeners
   * @method unsubscribe
   * @example
   *     InPlayer.unsubscribe()
   */
  unsubscribe(): void {
    this.Notifications.unsubscribe();
  }

  /**
   * Overrides the default configs
   * @method setConfig
   * @param {String} config 'production', 'development', 'daily'
   * @example
   *     InPlayer.setConfig('development');
   */
  setConfig(env: Env, axiosConfig?: AxiosRequestConfig): void {
    this.config = config[env];
    this.request.setAxiosConfig(axiosConfig, env);
    this.Account.setConfig(env);
    this.Asset.setConfig(env);
    this.Branding.setConfig(env);
    this.Notifications.setConfig(env);
    this.Payment.setConfig(env);
    this.Subscription.setConfig(env);
    this.Voucher.setConfig(env);
  }
}

export default new InPlayer();
