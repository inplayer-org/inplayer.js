import { checkStatus, errorResponse, params } from '../Utils';

/**
 * Contains all Requests connected with payments
 *
 * @class Payment
 */
class Payment {
    constructor(config, Account) {
        this.config = config;
        this.Account = Account;
    }
    /**
     * Get all payment methods for a User
     * @method getPaymentMethods
     * @async
     * @example
     *     InPlayer.Payment
     *     .getPaymentMethods()
     *     .then(data => console.log(data));
     * @return {Object}
     */
    async getPaymentMethods() {
        if (!this.Account.isAuthenticated()) {
            errorResponse(401, {
                code: 401,
                message: 'User is not authenticated',
            });
        }
        const t = this.Account.getToken();

        const response = await fetch(this.config.API.getPaymentMethods, {
            headers: {
                Authorization: 'Bearer ' + t.token,
            },
        });

        checkStatus(response);

        return await response.json();
    }

    /**
     * Get the payment tools for an aothorization token and payment method ID
     * @method getPaymentTools
     * @async
     * @param {number} paymentMethodId - The Payment Method ID
     * @example
     *     InPlayer.Payment
     *     .getPaymentTools(2)
     *     .then(data => console.log(data));
     * @return {Object}
     */
    async getPaymentTools(paymentMethodId) {
        if (!this.Account.isAuthenticated()) {
            errorResponse(401, {
                code: 401,
                message: 'User is not authenticated',
            });
        }
        const t = this.Account.getToken();

        const response = await fetch(
            this.config.API.getPaymentTools(paymentMethodId),
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
     * Makes a Payment for a given Authorization token + asset/payment details.
     * Use this method ONLY if the assetFee.type is not 'subscription' or 'freemium'. Otherwise
     * please use InPlayer.Subscription.create()
     * @method create
     * @async
     * @param {Object} data - Payment data - {
     *  number: number || string,
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
     *     InPlayer.Payment
     *     .create({
     *       number: 4111111111111111,
     *       cardName: 'PayPal',
     *       expMonth: 10,
     *       expYear: 2030,
     *       cvv: 656,
     *       accessFee: 2341,
     *       paymentMethod: 1,
     *       referrer: 'http://google.com',
     *       voucherCode: 'fgh1982gff-0f2grfds'
     *       brandingId: 1234
     *      })
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

        const response = await fetch(this.config.API.payForAsset, {
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

    /**
     * Gets parameters for PayPal
     * @method getPayPalParams
     * @async
     * @param {Object} data - Contains details - {
     *  origin: {string},
     *  accessFeeId: {number},
     *  paymentMethod: {number}
     * }
     * @example
     *     InPlayer.Payment
     *     .getPayPalParams({
     *     origin: location.href,
     *     accessFeeId: 34,
     *     paymentMethod: 2
     *     voucherCode: '1231231'
     *     })
     *     .then(data => console.log(data));
     * @return {Object}
     */
    async getPayPalParams(data = {}) {
        if (!this.Account.isAuthenticated()) {
            errorResponse(401, {
                code: 401,
                message: 'User is not authenticated',
            });
        }
        const t = this.Account.getToken();

        const formData = new FormData();

        formData.append('origin', data.origin);
        formData.append('access_fee', data.accessFeeId);
        formData.append('payment_method', data.paymentMethod);
        if (data.voucherCode) {
            formData.append('voucher_code', data.voucherCode);
        }

        const response = await fetch(this.config.API.getPayPalParams, {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + t.token,
            },
            body: formData,
        });

        checkStatus(response);

        return await response.json();
    }

    /**
     * Gets the purchase history
     * @method getPurchaseHistory
     * @async
     * @param {string} status - The status of the purchase - active/inactive
     * @param {number} page - The current page
     * @param {number} limit - The number of items per page
     * @example
     *     InPlayer.Payment
     *     .getPurchaseHistory('active', 0, 5)
     *     .then(data => console.log(data));
     * @return {Object}
     */
    async getPurchaseHistory(status = 'active', page, limit) {
        if (!this.Account.isAuthenticated()) {
            errorResponse(401, {
                code: 401,
                message: 'User is not authenticated',
            });
        }
        const t = this.Account.getToken();

        const response = await fetch(
            this.config.API.getPurchaseHistory(status, page, limit),
            {
                headers: {
                    Authorization: 'Bearer ' + t.token,
                },
            }
        );

        return await response.json();
    }

    /**
     * Gets the default credit card per currency used for subscription rebills
     * @method getDefaultCard
     * @async
     * @example
     *     InPlayer.Payment
     *     .getDefaultCard()
     *     .then(data => console.log(data));
     * @return {Object}
     */
    async getDefaultCard() {
        if (!this.Account.isAuthenticated()) {
            errorResponse(401, {
                code: 401,
                message: 'User is not authenticated',
            });
        }
        const t = this.Account.getToken();

        const response = await fetch(
            this.config.API.getDefaultCard,
            {
                headers: {
                    Authorization: 'Bearer ' + t.token,
                },
            }
        );

        return await response.json();
    }

    /**
     * Sets card per currency as default card that is to be used for further subscription rebills
     * @method setDefaultCard
     * @async
     * @param {Object} data - Contains the data - {
     *  cardNumber: {string},
     *  cardName: {string},
     *  cvc: {number},
     *  expMonth: {number},
     *  expYear: {number},
     *  currency: {string}
     * }
     * @example
     *     InPlayer.Payment
     *     .setDefaultCard({
     *          cardNumber: 4242424242424242,
     *          cardName: 'John Doe',
     *          cvc: 123,
     *          expMonth: 1,
     *          expYear: 2020,
     *          currency: 'EUR'
     *      })
     *     .then(data => console.log(data));
     * @return {Object}
     */
    async setDefaultCard(data = {}) {
        if (!this.Account.isAuthenticated()) {
            errorResponse(401, {
                code: 401,
                message: 'User is not authenticated',
            });
        }
        const t = this.Account.getToken();

        const body = {
            number: data.cardNumber,
            card_name: data.cardName,
            cvv: data.cvc,
            exp_month: data.expMonth,
            exp_year: data.expYear,
            currency_iso: data.currency,
        };

        const response = await fetch(
            this.config.API.setefaultCard,
            {
                method: 'PUT',
                headers: {
                    Authorization: 'Bearer ' + t.token,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: params(body),
            }
        );

        return await response.json();
    }
}

export default Payment;
