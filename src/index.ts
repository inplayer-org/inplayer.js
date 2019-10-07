import Account from './lib/Account';
import Asset from './lib/Asset';
import Payment from './lib/Payment';
import Subscription from './lib/Subscription';
import Branding from './lib/Branding';
import Voucher from './lib/Voucher';
import DLC from './lib/Dlc';
import Notifications from './Notifications';
import { isAuthenticated } from './Utils/http';
import config from './config';

// types
import {
  ApiConfig,
  DLC as DLCType,
  Notifications as NotificationsType,
} from './Interfaces/CommonInterfaces';
import { Account as AccountType } from './Interfaces/IAccount&Authentication';
import { Asset as AssetType } from './Interfaces/IAsset&Access';
import {
  Payment as PaymentType,
  Subscription as SubscriptionType,
} from './Interfaces/IPayment&Subscription';
import { Voucher as VoucherType } from './Interfaces/IVoucher&Promotion';
import { Branding as BrandingType } from './Interfaces/IBrand';

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

  constructor() {
    this.config = config.production;
    this.Account = new Account();
    this.Asset = new Asset();
    this.Payment = new Payment();
    this.Subscription = new Subscription();
    this.Voucher = new Voucher();
    this.DLC = new DLC();
    this.Branding = new Branding();
    this.Notifications = new Notifications();
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
    if (isAuthenticated()) {
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
