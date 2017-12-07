import {
  API
} from '../../constants/endpoints';

/**
 * Contains all Requests connected with subscriptions
 *
 * @class Subscription
 */
class Subscription {

  /**
   * Gets all subscriptions for a given user
   * @method getSubscriptions
   * @async
   * @param {String} token - The Authorization token
   * @example
   *     InPlayer.Subscription
   *     .getSubscriptions('eyJ0eXAiOiJKPECENR5Y')
   *     .then(data => console.log(data));
   * @return {Object}
  */
  async getSubscriptions(token){
    try{
      const response = await fetch(API.getSubscriptions,{
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + token
        }
      });

      const data = response.json();

      return data;
    }catch(error){
      return false;
    }
  }

  /**
   * Cancels a subscription
   * @method cancelSubscription
   * @async
   * @param {String} unsubscribe_url - The url for the subscription which is getting unsubscribed
   * @param {String} token - The Authorization token
   * @example
   *     InPlayer.Subscription
   *     .cancelSubscription('http://localhost/subscription/1','eyJ0eXAiOiJKPECENR5Y')
   *     .then(data => console.log(data));
   * @return {Object}
  */
  async cancelSubscription(unsubscribe_url, token){
    try{
      const response = await fetch(unsubscribe_url, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + token
        }
      });

      const data = response.json();

      return data;
    }catch(error){
      return false;
    }
  }

  /**
   * Subscribes to a given asset
   * @method assetSubscribe
   * @async
   * @param {String} token - The Authorization token
   * @param {Object} data - {}
   * @example
   *     InPlayer.Subscription
   *     .assetSubscribe('eyJ0eXAiOiJKPECENR5Y', {})
   *     .then(data => console.log(data));
   * @return {Object}
  */
  async assetSubscribe(token, data) {
    try{
      const response = await fetch(API.subscribe, {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + token
        },
        body: data
      });

      const data = await response.json();

      return data;
    }catch(error){
      return false;
    }
  }
}

export default Subscriptions;
