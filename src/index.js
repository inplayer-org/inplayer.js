import 'isomorphic-fetch';
import 'es6-promise/auto';
import User from './Models/User';
import Asset from './Models/Asset';
import Payment from './Models/Payment';
import Subscription from './Models/Subscription';
import Misc from './Models/Misc';
import Socket from './Socket';
import { API } from '../constants/endpoints';
import { config } from '../config';

/**
 * Main class. Contains all others methods and websocket subscription
 *
 * @class InPlayer
 */
class InPlayer {
    constructor() {
        this.config = config;
        this.config.API = API(config);
        /**
         * @property User
         * @type User
         */
        this.User = new User(this.config);
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
         * @property Misc
         * @type Misc
         */
        this.Misc = new Misc(this.config);
        this.Socket = new Socket(this.config);
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
        if (this.User.isSignedIn()) {
            this.Socket.subscribe(accountUid, callbackParams);
            return true;
        } else {
            return false;
        }
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
                this.config.stomp.url = 'wss://notify.inplayer.com:15671/ws';
                break;
            }
            case 'develop': {
                this.config.BASE_URL = 'https://staging-v2.inplayer.com';
                this.config.stomp.url = 'ws://staging-v2.inplayer.com:15674/ws';
                break;
            }
            case 'sandbox': {
                //TODO: to be changed in future
                this.config.BASE_URL = 'https://staging-v2.inplayer.com';
                this.config.stomp.url = 'ws://staging-v2.inplayer.com:15674/ws';
                break;
            }
            default:
                break;
        }
        this.config.API = API(this.config);
    }
}

export default new InPlayer();
