import 'isomorphic-fetch';
import 'es6-promise/auto';

import Account from './Models/Account';
import Asset from './Models/Asset';
import Payment from './Models/Payment';
import Subscription from './Models/Subscription';
import Misc from './Models/Misc';
import Branding from './Models/Branding';
import Voucher from './Models/Voucher';
import Notifications from './Notifications';
import { API } from './constants/endpoints';

/**
 * Main class. Contains all others methods and websocket subscription
 *
 * @class InPlayer
 */
class InPlayer {
    constructor() {
        this.config = {
            BASE_URL: 'https://services.inplayer.com',
            AWS_IOT_URL:
                'https://eynmuj2g26.execute-api.eu-west-1.amazonaws.com/prod/iot/keys',
            INPLAYER_TOKEN_NAME: 'inplayer_token',
            INPLAYER_IOT_NAME: 'inplayer_iot',
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
         * @property Misc
         * @type Misc
         */
        this.Misc = new Misc(this.config);
        /**
         * @property Misc
         * @type Misc
         */
        this.Voucher = new Voucher(this.config, this.Account);
        /**
         * @property Misc
         * @type Misc
         */
        this.Branding = new Branding(this.config);
        this.Notifications = new Notifications(this.config);
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
     *       onmessage: (message) => { let body = JSON.parse(message.body); console.log(body, 'message') },
     *       onopen: (e) => console.log('open'),
     *       onclose: (e) => console.log('close', e)
     *      }
     *    )
     * @return {Boolean}
     */
    subscribe(accountUid, callbackParams) {
        if (this.Account.isSignedIn()) {
            this.Notifications.subscribe(accountUid, callbackParams);
            return true;
        }
        return false;
    }

    isSubscribed() {
        return this.Socket.isSubscribed();
    }

    /**
     * Unsubscribes from the websocket and event listeners
     * @method unsubscribe
     * @example
     *     InPlayer.unsubscribe()
     * @return {Boolean}
     */
    unsubscribe() {
        this.Socket.unsubscribe();
    }

    /**
     * Overrides the default configs
     * @method setConfig
     * @param {String} config 'prod', 'develop' or 'sandobx'
     * @example
     *     InPlayer.setConfig('develop');
     */
    setConfig(config) {
        switch (config) {
            case 'prod': {
                this.config.BASE_URL = 'https://services.inplayer.com';
                this.config.AWS_IOT_URL =
                    'https://eynmuj2g26.execute-api.eu-west-1.amazonaws.com/prod/iot/keys';
                break;
            }
            case 'develop': {
                this.config.BASE_URL = 'https://staging-v2.inplayer.com';
                this.config.AWS_IOT_URL =
                    'https://o3871l8vj7.execute-api.eu-west-1.amazonaws.com/staging/iot/keys';
                break;
            }
            case 'sandbox': {
                // TODO: to be changed in future
                this.config.BASE_URL = 'https://staging-v2.inplayer.com';
                this.config.AWS_IOT_URL =
                    'https://o3871l8vj7.execute-api.eu-west-1.amazonaws.com/staging/iot/keys';
                break;
            }
            default:
                break;
        }
        this.config.API = API(this.config);
    }
}

export default new InPlayer();
