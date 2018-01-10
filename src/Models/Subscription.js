import { API } from '../../constants/endpoints';

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
    async getSubscriptions(token) {
        const response = await fetch(API.getSubscriptions, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + token,
            },
        });

        const data = response.json();

        return data;
    }

    /**
     * Cancels a subscription
     * @method cancelSubscription
     * @async
     * @param {String} unsubscribeUrl - The url for the subscription which is getting unsubscribed
     * @param {String} token - The Authorization token
     * @example
     *     InPlayer.Subscription
     *     .cancelSubscription('http://localhost/subscription/1','eyJ0eXAiOiJKPECENR5Y')
     *     .then(data => console.log(data));
     * @return {Object}
     */
    async cancelSubscription(unsubscribeUrl, token) {
        const response = await fetch(unsubscribeUrl, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + token,
            },
        });

        const data = response.json();

        return data;
    }

    /**
     * Subscribes to a given asset
     * @method assetSubscribe
     * @async
     * @param {String} token - The Authorization token
     * @param {Object} data - {
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
     *     InPlayer.Subscription
     *     .assetSubscribe('eyJ0eXAiOiJKPECENR5Y', {
     *        number: 1,
     *        cardName: 'Payoneer',
     *        expMonth: 11,
     *        expYear: 12,
     *        cvv: 546,
     *        accessFee: 13.4,
     *        paymentMethod: 'card',
     *        referrer: 'http://localhost:3000',
     *        voucherCode: '123123125914i2erjfg'
     *        }
     *     )
     *     .then(data => console.log(data));
     * @return {Object}
     */
    async assetSubscribe(token = '', data = {}) {
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

        const response = await fetch(API.subscribe, {
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

export default Subscription;
