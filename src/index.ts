import Account from './lib/Account';
import Asset from './lib/Asset';
import Payment from './lib/Payment';
import Subscription from './lib/Subscription';
import Branding from './lib/Branding';
import Voucher from './lib/Voucher';
import DLC from './lib/Dlc';
import Notifications from './Notifications';
import { API } from './constants/endpoints';
import { ApiConfig } from './Interfaces/CommonInterfaces';

/**
 * Main class. Contains all others methods and websocket subscription
 *
 * @class InPlayer
 */
class InPlayer {
  config: ApiConfig;
  Account: Account;
  Asset: Asset;
  Payment: any;
  Subscription: any;
  Voucher: any;
  DLC: any;
  Branding: any;
  Notifications: Notifications;

  constructor() {
    this.config = {
      BASE_URL: 'https://services.inplayer.com',
      AWS_IOT_URL:
        'https://eynmuj2g26.execute-api.eu-west-1.amazonaws.com/prod/iot/keys',
      IOT_NOTIF_URL: 'a3gkl64duktvc4-ats.iot.eu-west-1.amazonaws.com',
      INPLAYER_TOKEN_NAME: 'inplayer_token',
      INPLAYER_IOT_NAME: 'inplayer_iot',
      INPLAYER_ACCESS_CODE_NAME: (assetId: any) => `access_code_${assetId}`,
      API: API('https://services.inplayer.com'),
    };

    /**
     * @property Account
     * @type Account
     */
    this.Account = new Account(this.config);
    /**
     * @property Asset
     * @type Asset
     */
    this.Asset = new Asset(this.config, this.Account);
    /**
     * @property Payment
     * @type Payment
     */
    this.Payment = new Payment(this.config, this.Account);
    /**
     * @property Subscription
     * @type Subscription
     */
    this.Subscription = new Subscription(this.config, this.Account);
    /**
     * @property Voucher
     * @type Voucher
     */
    this.Voucher = new Voucher(this.config, this.Account);
    /**
     * @property Voucher
     * @type Voucher
     */
    this.DLC = new DLC(this.config, this.Account);
    /**
     * @property Branding
     * @type Branding
     */
    this.Branding = new Branding(this.config);
    this.Notifications = new Notifications(this.config, this.Account);
  }

  /**
   * Subscribes to websocket events
   * @method subscribe
   * @param {String} accountUid - The users account UUID
   * @param {Object} callbackParams - Methods regarding websocket
   * {
   *  onmessage: function,
   *  onopen: function,
   *  onclose: function
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
   * @return {Boolean}
   */
  subscribe(accountUid: any, callbackParams: any) {
    if (this.Account.isAuthenticated()) {
      this.Notifications.subscribe(accountUid, callbackParams)
        .then((data: any) => {
          if (!data) {
            console.error('An error has occured while subscribing.');
          }
        })
        .catch((error: any) => {
          if (error.response) {
            error.response.json().then((data: any) => {
              console.warn(data);
            });
          }
        });
    }
  }

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
   * @param {String} config 'prod', 'develop' or 'sandbox'
   * @example
   *     InPlayer.setConfig('develop');
   */
  setConfig(config: string) {
    switch (config) {
    case 'prod': {
      this.config.BASE_URL = 'https://services.inplayer.com';
      this.config.AWS_IOT_URL = 'https://eynmuj2g26.execute-api.eu-west-1.amazonaws.com/prod/iot/keys';
      this.config.IOT_NOTIF_URL = 'a3gkl64duktvc4-ats.iot.eu-west-1.amazonaws.com';
      this.config.API = API('https://services.inplayer.com');
      break;
    }
    case 'develop': {
      this.config.BASE_URL = 'https://staging-v2.inplayer.com';
      this.config.AWS_IOT_URL = 'https://o3871l8vj7.execute-api.eu-west-1.amazonaws.com/staging/iot/keys';
      this.config.IOT_NOTIF_URL = 'a3gkl64duktvc4-ats.iot.eu-west-1.amazonaws.com';
      this.config.API = API('https://staging-v2.inplayer.com');
      break;
    }
    case 'sandbox': {
      // TODO: to be changed in future
      this.config.BASE_URL = 'https://staging-v2.inplayer.com';
      this.config.AWS_IOT_URL = 'https://o3871l8vj7.execute-api.eu-west-1.amazonaws.com/staging/iot/keys';
      this.config.IOT_NOTIF_URL = 'a3gkl64duktvc4-ats.iot.eu-west-1.amazonaws.com';
      this.config.API = API('https://staging-v2.inplayer.com');
      break;
    }
    default:
      break;
    }
  }
}

export default new InPlayer();
