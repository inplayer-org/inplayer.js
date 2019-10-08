import Account from './endpoints/account';
import Asset from './endpoints/asset';
import Payment from './endpoints/payment';
import Subscription from './endpoints/subscription';
import Branding from './endpoints/branding';
import Voucher from './endpoints/voucher';
import DLC from './endpoints/dlc';
import Notifications from './factories/notifications';
import RequestFactory from './factories/request';
import config from './config';

// types
import {
  ApiConfig,
  DLC as DLCType,
  Notifications as NotificationsType,
  Request as RequestType,
} from './models/CommonInterfaces';
import { Account as AccountType } from './models/IAccount&Authentication';
import { Asset as AssetType } from './models/IAsset&Access';
import {
  Payment as PaymentType,
  Subscription as SubscriptionType,
} from './models/IPayment&Subscription';
import { Voucher as VoucherType } from './models/IVoucher&Promotion';
import { Branding as BrandingType } from './models/IBrand';

/**
 * Main class. Contains all others methods and websocket subscription
 *
 * @class InPlayer
 */
class InPlayer {
  config: ApiConfig;
  Account: AccountType;
  Asset: AssetType;
  Payment: PaymentType;
  Subscription: SubscriptionType;
  Voucher: VoucherType;
  DLC: DLCType;
  Branding: BrandingType;
  Notifications: NotificationsType;
  request: RequestType;

  constructor() {
    this.config = config.production;
    /**
     * @property Account
     * @type Account
     */
    this.Account = new Account(this.config);
    /**
     * @property Asset
     * @type Asset
     */
    this.Asset = new Asset(this.config);
    /**
     * @property Payment
     * @type Payment
     */
    this.Payment = new Payment(this.config);
    /**
     * @property Subscription
     * @type Subscription
     */
    this.Subscription = new Subscription(this.config);
    /**
     * @property Voucher
     * @type Voucher
     */
    this.Voucher = new Voucher(this.config);
    /**
     * @property Voucher
     * @type Voucher
     */
    this.DLC = new DLC(this.config);
    /**
     * @property Branding
     * @type Branding
     */
    this.Branding = new Branding(this.config);
    this.Notifications = new Notifications(this.config);
    this.request = new RequestFactory(this.config);
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
   *       onMessage: (message) =>
   * { let body = JSON.parse(message.body); console.log(body, 'message') },
   *       onOpen: (e) => console.log('open'),
   *       onClose: (e) => console.log('close', e)
   *      }
   *    )
   */
  subscribe(
    accountUuid: string,
    callbackParams: Record<string, (...params: any) => void>,
  ) {
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
  isSubscribed() {
    return this.Notifications.isSubscribed();
  }

  /**
   * Unsubscribes from the websocket and event listeners
   * @method unsubscribe
   * @example
   *     InPlayer.unsubscribe()
   * @return {Boolean}
   */
  unsubscribe() {
    this.Notifications.unsubscribe();
  }

  /**
   * Overrides the default configs
   * @method setConfig
   * @param {String} config 'production', 'development'
   * @example
   *     InPlayer.setConfig('development');
   */
  setConfig(env: string) {
    enum Env {
      'development',
      'production',
    }

    if (env in Env) {
      this.config = config[env];
    }
  }
}

export default new InPlayer();
