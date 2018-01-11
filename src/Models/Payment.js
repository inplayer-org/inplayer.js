import { API } from '../../constants/endpoints';

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
     *     InPlayer.Payment
     *     .getPaymentMethods('aehfawfeikuehdjkc482rijfg47idqwk3n4')
     *     .then(data => console.log(data));
     * @return {Object}
     */
    async getPaymentMethods(token) {
        const response = await fetch(API.getPaymentMethods, {
            headers: {
                Authorization: 'Bearer ' + token,
            },
        });

        const data = await response.json();

        return data;
    }

    /**
     * Get the payment tools for an aothorization token and payment method ID
     * @method getPaymentTools
     * @async
     * @param {String} token - The Authorization token
     * @param {Number} paymentMethodId - The Payment Method ID
     * @example
     *     InPlayer.Payment
     *     .getPaymentTools('dajh8ao8djadd2o8jh2ofkhdhqkgog3oj', 2)
     *     .then(data => console.log(data));
     * @return {Object}
     */
    async getPaymentTools(token, paymentMethodId) {
        const response = await fetch(API.getPaymentTools(paymentMethodId), {
            headers: {
                Authorization: 'Bearer ' + token,
            },
        });

        const data = await response.json();

        return data;
    }

    /**
     * Makes a Payment for a given Authorization token + asset/payment details
     * @method payForAsset
     * @async
     * @param {String} token - The Authorization token
     * @param {Object} data - Payment data - {
     *  number: Number,
     *  cardName: String,
     *  expMonth: Number,
     *  expYear: Number,
     *  cvv: Number,
     *  accessFee: Number,
     *  paymentMethod: String,
     *  referrer: String
     *  voucherCode?: String
     * }
     * @example
     *     // data.payment_method = { id.... }
     *     InPlayer.Payment
     *     .payForAsset('dajh8ao8djadd2o8jh2ofkhdhqkgog3oj',
     *      {
     *       number: 4111111111111111,
     *       cardName: 'PayPal',
     *       expMonth: 10,
     *       expYear: 2030,
     *       cvv: 656,
     *       accessFee: 2341,
     *       paymentMethod: 1,
     *       referrer: 'http://google.com',
     *       voucherCode: 'fgh1982gff-0f2grfds'
     *      })
     *     .then(data => console.log(data));
     * @return {Object}
     */
    async payForAsset(token = '', data = {}) {
        const fd = new FormData();
        fd.append('number', data.number);
        fd.append('card_name', data.cardName);
        fd.append('exp_month', data.expMonth);
        fd.append('exp_year', data.expYear);
        fd.append('cvv', data.cvv);
        fd.append('access_fee', data.accessFee);
        fd.append('payment_method', data.paymentMethod);
        fd.append('referrer', data.referrer);

        if (data.voucherCode) {
            fd.append('voucher_code', data.voucherCode);
        }

        const response = await fetch(API.payForAsset, {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + token,
            },
            body: fd,
        });

        const responseData = await response.json();

        return responseData;
    }

    /**
     * Gets parameters for PayPal
     * @method getPayPalParams
     * @async
     * @param {String} token - The Authorization token
     * @param {Object} data - Contains details - {
     *  origin: {String},
     *  accessFee: {Number},
     *  paymentMethod: {Number}
     * }
     * @example
     *     InPlayer.Payment
     *     .getPayPalParams('dajh8ao8djadd2o8jh2ofkhdhqkgog3oj', {
     *     origin: location.href,
     *     accessFee: 34,
     *     paymentMethod: 2
     *     voucherCode: '1231231'
     *     })
     *     .then(data => console.log(data));
     * @return {Object}
     */
    async getPayPalParams(token = '', data = {}) {
        const fd = new FormData();
        fd.append('origin', data.origin);
        fd.append('access_fee', data.accessFeeId);
        fd.append('payment_method', data.paymentMethod);
        fd.append('voucher_code', data.voucherCode);

        const response = await fetch(API.externalPayments, {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + token,
            },
            body: fd,
        });

        const responseData = await response.json();

        return responseData;
    }
}

export default Payment;
