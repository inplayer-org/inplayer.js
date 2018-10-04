import { checkStatus, errorResponse, params } from '../Utils';

/**
 * Contains all Requests connected with subscriptions
 *
 * @class Subscription
 */
class Subscription {
    constructor(config, Account) {
        this.config = config;
        this.Account = Account;
    }
    /**
     * Gets all subscriptions for a given user
     * @method getSubscriptions
     * @async
     * @example
     *     InPlayer.Subscription
     *     .getSubscriptions()
     *     .then(data => console.log(data));
     * @return {Object}
     */
    async getSubscriptions(page = 0, limit = 15) {
        if (!this.Account.isAuthenticated()) {
            errorResponse(401, {
                code: 401,
                message: 'User is not authenticated',
            });
        }
        const t = this.Account.getToken();

        const response = await fetch(
            this.config.API.getSubscriptions(limit, page),
            {
                headers: {
                    Authorization: 'Bearer ' + t.token,
                },
            }
        );

        checkStatus(response);

        return await response.json();
    }

    /**
     * Get subscription details for a given user by id
     *
     * @method getSubscription
     * @async
     *
     * @param {String} id - The subscription id
     * @example
     *     InPlayer.Subscription
     *     .getSubscription('abcdef')
     *     .then(data => console.log(data));
     * @return {Object}
     */
    async getSubscription(id) {
        if (!this.Account.isAuthenticated()) {
            errorResponse(401, {
                code: 401,
                message: 'User is not authenticated',
            });
        }
        const t = this.Account.getToken();

        const response = await fetch(this.config.API.getSubscription(id), {
            headers: {
                Authorization: 'Bearer ' + t.token,
            },
        });

        checkStatus(response);

        return await response.json();
    }

    /**
     * Cancels a subscription
     * @method cancelSubscription
     * @async
     * @param {String} unsubscribeUrl - The url for the subscription which is getting unsubscribed
     * @example
     *     InPlayer.Subscription
     *     .cancelSubscription('abcdef')
     *     .then(data => console.log(data));
     * @return {Object}
     */
    async cancelSubscription(unsubscribeUrl) {
        if (!this.Account.isAuthenticated()) {
            errorResponse(401, {
                code: 401,
                message: 'User is not authenticated',
            });
        }
        const t = this.Account.getToken();

        const response = await fetch(
            this.config.API.cancelTokenSubscribe(unsubscribeUrl),
            {
                headers: {
                    Authorization: 'Bearer ' + t.token,
                },
            }
        );

        checkStatus(response);

        return await response.json();
    }

    /**
     * Subscribes to a given asset. Use this method ONLY if the accessFee.type === 'subscription'.
     * Otherwise please use InPlayer.Payment.payForAsset()
     * @method assetSubscribe
     * @async
     * @param {Object} data - {
     *  number: number,
     *  cardName: string,
     *  expMonth: number,
     *  expYear: number,
     *  cvv: number,
     *  accessFee: number,
     *  paymentMethod: string,
     *  referrer: string
     *  voucherCode?: string
     *  brandingId?: number
     * }
     * @example
     *     InPlayer.Subscription
     *     .create({
     *        number: 1,
     *        cardName: 'Payoneer',
     *        expMonth: 11,
     *        expYear: 12,
     *        cvv: 546,
     *        accessFee: 13.4,
     *        paymentMethod: 'card',
     *        referrer: 'http://localhost:3000',
     *        voucherCode: '123123125914i2erjfg'
     *        brandingId?: 1234
     *        }
     *     )
     *     .then(data => console.log(data));
     * @return {Object}
     */
    async create(data = {}) {
        if (!this.Account.isAuthenticated()) {
            errorResponse(401, {
                code: 401,
                message: 'User is not authenticated',
            });
        }

        const t = this.Account.getToken();

        let body = {
            number: data.number,
            card_name: data.cardName,
            exp_month: data.expMonth,
            exp_year: data.expYear,
            cvv: data.cvv,
            access_fee: data.accessFee,
            payment_method: data.paymentMethod,
            referrer: data.referrer,
            branding_id: data.brandingId,
        };

        if (data.voucherCode) {
            body.voucher_code = data.voucherCode;
        }

        const response = await fetch(this.config.API.subscribe, {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + t.token,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: params(body),
        });

        checkStatus(response);

        return await response.json();
    }
}

export default Subscription;
