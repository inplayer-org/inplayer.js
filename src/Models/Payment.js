import { errorResponse, checkStatus, params } from '../Utils';

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
                message: 'User is not authenticated'
            });
        }

        const response = await fetch(this.config.API.getPaymentMethods, {
            headers: {
                Authorization: `Bearer ${this.Account.getToken().token}`,
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
                message: 'User is not authenticated'
            });
        }

        const response = await fetch(
            this.config.API.getPaymentTools(paymentMethodId),
            {
                headers: {
                    Authorization: `Bearer ${this.Account.getToken().token}`,
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
                message: 'User is not authenticated'
            });
        }

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
                Authorization: `Bearer ${this.Account.getToken().token}`,
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
                message: 'User is not authenticated'
            });
        }

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
                Authorization: `Bearer ${this.Account.getToken().token}`,
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
                message: 'User is not authenticated'
            });
        }

        const response = await fetch(
            this.config.API.getPurchaseHistory(status, page, limit),
            {
                headers: {
                    Authorization: `Bearer ${this.Account.getToken().token}`,
                },
            }
        );

        return await response.json();
    }

    /**
     * Gets the default credit card per currency used for subscription rebills
     * @method getDefaultCreditCard
     * @async
     * @example
     *     InPlayer.Payment
     *     .getDefaultCreditCard()
     *     .then(data => console.log(data));
     * @return {Object}
     */
    async getDefaultCreditCard() {
        if (!this.Account.isAuthenticated()) {
            errorResponse(401, {
                code: 401,
                message: 'User is not authenticated'
            });
        }

        const response = await fetch(
            this.config.API.getDefaultCreditCard,
            {
                headers: {
                    Authorization: `Bearer ${this.Account.getToken().token}`,
                },
            }
        );

        checkStatus(response);

        return await response.json();
    }

    /**
     * Sets card per currency as default card that is to be used for further subscription rebills
     * @method setDefaultCreditCard
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
     *     .setDefaultCreditCard({
     *          cardNumber: '4242424242424242',
     *          cardName: 'John Doe',
     *          cvc: 123,
     *          expMonth: 1,
     *          expYear: 2020,
     *          currency: 'EUR'
     *      })
     *     .then(data => console.log(data));
     * @return {Object}
     */
    async setDefaultCreditCard(data = {}) {
        if (!this.Account.isAuthenticated()) {
            errorResponse(401, {
                code: 401,
                message: 'User is not authenticated'
            });
        }

        const body = {
            number: data.cardNumber,
            card_name: data.cardName,
            cvv: data.cvc,
            exp_month: data.expMonth,
            exp_year: data.expYear,
            currency_iso: data.currency,
        };

        const response = await fetch(
            this.config.API.setDefaultCreditCard,
            {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${this.Account.getToken().token}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: params(body),
            }
        );

        checkStatus(response);

        return await response.json();
    }

    /**
     * Checks for existing user direct debit mandate
     * @method getDirectDebitMandate
     * @async
     * @example
     *     InPlayer.Payment
     *     .getDirectDebitMandate()
     *     .then(data => console.log(data));
     * @return {Object} Contains the data - {
     *  is_approved: {boolean},
     *  statement_descriptor: {string},
     *  mandate: {
     *    "bank_code": 37040044,
     *    "branch_code": 111000000,
     *    "country": "DE",
     *    "fingerprint": "wGjUgpjH1Rj4NtBf",
     *    "last4": 3000,
     *    "mandate_reference": "8OC5CIAXSF2UKON4",
     *    "mandate_url": "https://hooks.stripe.com/adapter/sepa_debit/file/src_1F2Jqmvwo8DwAwwqraJnRVkgYS"
     *    }
     * }
   */
    async getDirectDebitMandate() {
        if (!this.Account.isAuthenticated()) {
            errorResponse(401, {
                code: 401,
                message: 'User is not authenticated'
            });
        }

        console.error('Yolooooooo!!!!');

        const response = await fetch(
            this.config.API.getDirectDebitMandate,
            {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${this.Account.getToken().token}`,
                },
            }
        );

        checkStatus(response);

        console.error(response);

        return await response.json();
    }

    /**
  * Create direct debit mandate for customer
  * @method createDirectDebitMandate
  * @async
  * @param {Object} data - Contains the data - {
     *  name: {string},
     *  iban: {string},
  * }
  * @example
  *     InPlayer.Payment
  *     .createDirectDebitMandate({name, iban})
  *     .then(data => console.log(data));
  * @return {Object} Contains the data - {
   *   "id": "src_1F2GzxJqmvwo8uTaJnRVkgYS",
   *   "currency": "eur",
   *   "created": 1564576421,
   *   "client_secret": "src_client_secret_FXLhLpWGLiupZtUlPStd3jLo",
   *   "owner": "John",
   *   "full_name": "Bret Johannes",
   *   "statement_descriptor": "InPlayer",
   *   "status": "chargeable",
   *   type_data: {
   *    "bank_code": 37040044,
   *    "branch_code": 111000000,
   *    "country": "DE",
   *    "fingerprint": "wGjUgpjH1Rj4NtBf",
   *    "last4": 3000,
   *    "mandate_reference": "8OC5CIAXSF2UKON4",
   *    "mandate_url": "https://hooks.stripe.com/adapter/sepa_debit/file/src_1F2Jqmvwo8DwAwwqraJnRVkgYS"
   *    }
   *  }
*/
    async createDirectDebitMandate(data = {}) {
        if (!this.Account.isAuthenticated()) {
            errorResponse(401, {
                code: 401,
                message: 'User is not authenticated'
            });
        }

        const formData = new FormData();

        formData.append('name', data.name);
        formData.append('iban', data.iban);

        const response = await fetch(
            this.config.API.createDirectDebitMandate,
            {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${this.Account.getToken().token}`,
                },
                body: formData,
            }
        );

        checkStatus(response);

        return await response.json();
    }

    /**
* Process a request for direct debit SEPA charge
* @method directDebitCharge
* @async
* @param {Object} data - Contains the data - {
*  name: {string},
*  iban: {string},
* }
* @example
*     InPlayer.Payment
*     .directDebitCharge({name, iban})
*     .then(data => console.log(data));
* @return {Object} Contains the data - {
*       accessFeeId: "1F2GzxJqmvwo8uTaJnRVkgYS",
*       voucherCode?: 12,
*    }
*  }
*/
    async directDebitCharge({ accessFeeId, voucherCode = '' }) {
        if (!this.Account.isAuthenticated()) {
            errorResponse(401, {
                code: 401,
                message: 'User is not authenticated'
            });
        }

        const body = {
            access_fee_id: accessFeeId,
            voucher_code: voucherCode,
        };

        const response = await fetch(
            this.config.API.directDebitCharge,
            {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${this.Account.getToken().token}`,
                },
                body: params(body),
            }
        );

        checkStatus(response);

        return await response.json();
    }
}

export default Payment;
