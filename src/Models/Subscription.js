/**
 * Contains all Requests connected with subscriptions
 *
 * @class Subscription
 */
class Subscription {
    constructor(config) {
        this.config = config;
    }
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
    async getSubscriptions(token, limit, page) {
        const response = await fetch(
            this.config.API.getSubscriptions(limit, page),
            {
                method: 'GET',
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            }
        );

        return response.json();
    }

    /**
     * Get subscription details for a given user by id
     *
     * @method getSubscription
     * @async
     *
     * @param {String} id - The subscription id
     * @param {String} token - The Authorization token
     * @example
     *     InPlayer.Subscription
     *     .getSubscription('abcdef', 'eyJ0eXAiOiJKPECENR5Y')
     *     .then(data => console.log(data));
     * @return {Object}
     */
    async getSubscription(id, token) {
        const response = await fetch(this.config.API.getSubscription(id), {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + token,
            },
        });

        return response.json();
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

        return response.json();
    }

    /**
     * Subscribes to a given asset. Use this method ONLY if the accessFee.type === 'subscription'.
     * Otherwise please use InPlayer.Payment.payForAsset()
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

        const response = await fetch(this.config.API.subscribe, {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + token,
            },
            body: fd,
        });

        return await response.json();
    }

    /**
     * Cancels a subscription with a provided transaction and authorization token
     * Will receive
     *  -external.subscribe.cancel.success notification for Paypal transaction
     *  -subscribe.cancel.success notification for other types of transactions
     * @method cancelTokenSubscription
     * @async
     * @param {String} authorizationToken - The Authorization token
     * @param {String} transactionToken - The transaction token
     * @example
     *     InPlayer.Subscription
     *     .cancelTokenSubscription('eyJ0eXAiOiJKPECENR5Y', 'dgh19t1-f1g1ug1f')
     *     .then(data => console.log(data));
     * @return {Object}
     */
    async cancelTokenSubscription(authorizationToken, transactionToken) {
        const response = await fetch(
            this.config.API.cancelTokenSubscribe(transactionToken),
            {
                method: 'GET',
                headers: {
                    Authorization: 'Bearer ' + authorizationToken,
                },
            }
        );

        return await response.json();
    }
}

export default Subscription;
