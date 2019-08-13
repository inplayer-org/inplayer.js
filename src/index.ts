import Account from './Models/Account';
import Asset from './Models/Asset';
import Payment from './Models/Payment';
import Subscription from './Models/Subscription';
import Branding from './Models/Branding';
import Voucher from './Models/Voucher';
import DLC from './Models/Dlc';
import Notifications from './Notifications';
import { API } from './constants/endpoints';

/**
 * Main class. Contains all others methods and websocket subscription
 *
 * @class InPlayer
 */
class InPlayer {
    config: any;
    Account: any;
    Asset: any;
    Payment: any;
    Subscription: any;
    Voucher: any;
    DLC: any;
    Branding: any;
    Notifications: any;

    constructor() {
        this.config = {
            BASE_URL: 'https://services.inplayer.com',
            AWS_IOT_URL: 'https://eynmuj2g26.execute-api.eu-west-1.amazonaws.com/prod/iot/keys',
            IOT_NOTIF_URL: 'a3gkl64duktvc4-ats.iot.eu-west-1.amazonaws.com',
            INPLAYER_TOKEN_NAME: 'inplayer_token',
            INPLAYER_IOT_NAME: 'inplayer_iot',
            INPLAYER_ACCESS_CODE_NAME: (assetId: any) => `access_code_${assetId}`
        };

        this.config.API = API(this.config);
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
     *       onMessage: (message) => { let body = JSON.parse(message.body); console.log(body, 'message') },
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
    setConfig(config: any) {
        switch (config) {
        case 'prod': {
            this.config.BASE_URL = 'https://services.inplayer.com';
            this.config.AWS_IOT_URL = 'https://eynmuj2g26.execute-api.eu-west-1.amazonaws.com/prod/iot/keys';
            this.config.IOT_NOTIF_URL = 'a3gkl64duktvc4-ats.iot.eu-west-1.amazonaws.com';
            break;
        }
        case 'develop': {
            this.config.BASE_URL = 'https://staging-v2.inplayer.com';
            this.config.AWS_IOT_URL = 'https://o3871l8vj7.execute-api.eu-west-1.amazonaws.com/staging/iot/keys';
            this.config.IOT_NOTIF_URL = 'a3gkl64duktvc4-ats.iot.eu-west-1.amazonaws.com';

            break;
        }
        case 'sandbox': {
            // TODO: to be changed in future
            this.config.BASE_URL = 'https://staging-v2.inplayer.com';
            this.config.AWS_IOT_URL = 'https://o3871l8vj7.execute-api.eu-west-1.amazonaws.com/staging/iot/keys';
            this.config.IOT_NOTIF_URL = 'a3gkl64duktvc4-ats.iot.eu-west-1.amazonaws.com';
            break;
        }
        default:
            break;
        }
        this.config.API = API(this.config);
    }
}

export default new InPlayer();
