import {
  API
} from '../../constants/endpoints';

/**
 * Contains all Requests connected with payments
 *
 * @class Payment
 */
class Payment {

  /**
   * Get all payment methods for a User
   * @method getPaymentMethods
   * @async
   * @param {String} token - The Autorization token
   * @example
   * InPlayer.Payment.getPaymentMethods('aehfawfeikuehdjkc482rijfg47idqwk3n4')
   * .then(data => console.log(data));
   * @return {Object}
  */
  async getPaymentMethods(token){
    try{
      const response = await fetch(API.getPaymentMethods,{
        headers: {
            'Authorization': 'Bearer ' + token
        }
      });

      const data = await response.json();

      return data;
    }catch(error){
      return false;
    }
  }

  /**
   * Get the payment tools for an aothorization token and payment method ID
   * @method getPaymentTools
   * @async
   * @param {String} token - The Authorization token
   * @param {Number} paymentMethodId - The Payment Method ID
   * @example
   * InPlayer.Payment.getPaymentTools('dajh8ao8djadd2o8jh2ofkhdhqkgog3oj', 2)
   * .then(data => console.log(data));
   * @return {Object}
  */
  async getPaymentTools(token, paymentMethodId){
    try{
      const response = await fetch(API.getPaymentTools(paymentMethodId), {
        headers: {
            'Authorization': 'Bearer ' + token
        }
      });

      const data = await response.json();

      return data;
    }catch(error){
      return false;
    }
  }

  /**
   * Makes a Payment for a given Authorization token + asset/payment details
   * @method payForAsset
   * @async
   * @param {String} token - The Authorization token
   * @param {Object} data - Payment data
   * @example
   * // data.payment_method = { id.... }
   * InPlayer.Payment.getPaymentTools('dajh8ao8djadd2o8jh2ofkhdhqkgog3oj', {
   *  number: 4111111111111111,
   *  card_name: 'PayPal',
   *  exp_month: 10,
   *  exp_year: 2030,
   *  cvv: 656,
   *  access_fee: 2341,
   *  payment_method: 1,
   *  referrer: 'http://google.com'
   * })
   * .then(data => console.log(data));
   * @return {Object}
  */
  async payForAsset(token, data) {
    try{
      const response = await fetch(API.payForAsset,{
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


  /**
   * Gets parameters for PayPal
   * @method getPayPalParams
   * @async
   * @param {String} token - The Authorization token
   * @param {Object} data - Contains details
   * @example
   * InPlayer.Payment.getPayPalParams('dajh8ao8djadd2o8jh2ofkhdhqkgog3oj', {})
   * .then(data => console.log(data));
   * @return {Object}
  */
  async getPayPalParams(token, data) {
    try{
      const response = await fetch(API.externalPayments,{
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

export default Payment;
