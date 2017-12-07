import User from './Models/User';
import Asset from './Models/Asset';
import Payment from './Models/Payment';
import Subscriptions from './Models/Subscriptions';
import Misc from './Models/Misc';
import Socket from './Socket';

/**
 * Main class. Contains all others methods and websocket subscription
 *
 * @class InPlayer
 */
class InPlayer {
  constructor(){
    this.User = new User();
    this.Asset = new Asset();
    this.Payment = new Payment();
    this.Subscriptions = new Subscriptions();
    this.Misc = new Misc();
    this.Socket = new Socket();
  }

  /**
   * Subscribes to websocket events
   * @method subscribe
   * @param {String} account_uuid - The users account UUID
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
  subscribe(account_uuid, callbackParams) {
    if(this.User.isSignedIn()){
      this.Socket.subscribe(account_uuid, callbackParams);
      return true;
    }else {
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
  unsubscribe(){
    this.Socket.unsubscribe();
  }
}

export default new InPlayer();
