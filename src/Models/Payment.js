import Subscription from './Subscription';

/**
 * Contains all Requests connected with payments
 *
 * @class Payment
 */
class Payment {
    constructor(config) {
        this.config = config;
    }
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
        const response = await fetch(this.config.API.getPaymentMethods, {
            headers: {
                Authorization: 'Bearer ' + token,
            },
        });

        return await response.json();
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
        const response = await fetch(
            this.config.API.getPaymentTools(paymentMethodId),
            {
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            }
        );

        return await response.json();
    }

    /**
     * Makes a Payment for a given Authorization token + asset/payment details.
     * Use this method ONLY if the assetFee.type is not 'subscription' or 'freemium'. Otherwise
     * please use InPlayer.Subscription.assetSubscribe()
     * @method payForAsset
     * @async
     * @param {String} token - The Authorization token
     * @param {Object} data - Payment data - {
     *  number: Number || String,
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

        const response = await fetch(this.config.API.payForAsset, {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + token,
            },
            body: fd,
        });

        return await response.json();
    }

    /**
     * Makes a payment with a given access fee object, for both subscription and PPV
     * @method purchaseAsset
     * @async
     * @param {String} token - The Authorization token
     * @param {Object} accessFee - The access fee object
     * @param {Object} data - Payment data - {
     *  number: Number || String,
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
     *     InPlayer.Payment
     *     .purchaseAsset('dajh8ao8djadd2o8jh2ofkhdhqkgog3oj',
     *      {
     *        access_fee: {
     *          id: 10,
     *          name: 'subscription',
     *          quantity: 10,
     *        },
     *        amount: 6.99,
     *        id: 2221
     *      },
     *      {
     *       number: 4111111111111111,
     *       cardName: 'PayPal',
     *       expMonth: 10,
     *       expYear: 2030,
     *       cvv: 656,
     *       paymentMethod: 1,
     *       referrer: 'http://google.com',
     *       voucherCode: 'fgh1982gff-0f2grfds'
     *      })
     *     .then(data => console.log(data));
     * @return {Object}
     */
    async purchaseAsset(token = '', accessFee = {}, data = {}) {
        let response;
        data.accessFee = accessFee.id;

        if (accessFee.access_type.name === 'subscription') {
            data.accessFee = accessFee.id;
            let subscription = new Subscription(this.config);
            response = await subscription.assetSubscribe(token, data);
        } else {
            response = await this.payForAsset(token, data);
        }

        return response;
    }

    /**
     * Gets parameters for PayPal
     * @method getPayPalParams
     * @async
     * @param {String} token - The Authorization token
     * @param {Object} data - Contains details - {
     *  origin: {String},
     *  accessFeeId: {Number},
     *  paymentMethod: {Number}
     * }
     * @example
     *     InPlayer.Payment
     *     .getPayPalParams('dajh8ao8djadd2o8jh2ofkhdhqkgog3oj', {
     *     origin: location.href,
     *     accessFeeId: 34,
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
        if (data.voucherCode) {
            fd.append('voucher_code', data.voucherCode);
        }

        const response = await fetch(this.config.API.externalPayments, {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + token,
            },
            body: fd,
        });

        return await response.json();
    }
}

export default Payment;
