import qs from 'qs';
import { errorResponse, checkStatus, params } from '../Utils';
import { authenticatedApi } from '../Utils/http';
import {
  SetDefaultCardPerCurrencyData, CreateDirectDebitMandateData, DirectDebitChargeData, DirectDebitSubscribeData,
} from '../Interfaces/IPaymant&Subscription';

const DIRECT_DEBIT_MANDATE_V2_PATH = '/v2/payments/direct-debit/mandate';
const DIRECT_DEBIT_CHARGE_V2_PATH = '/v2/payments';
const DIRECT_DEBIT_SUBSCRIBE_V2_PATH = '/v2/subscriptions';

/**
 * Contains all Requests connected with payments
 *
 * @class Payment
 */
class Payment {
  config: any;
  Account: any;
  constructor(config: any, Account: any) {
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

    const response = await fetch(this.config.API.getPaymentMethods, {
      headers: {
        Authorization: `Bearer ${this.Account.getToken().token}`,
      },
    });

    await await checkStatus(response);

    return response.json();
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
  async getPaymentTools(paymentMethodId: any) {
    if (!this.Account.isAuthenticated()) {
      errorResponse(401, {
        code: 401,
        message: 'User is not authenticated',
      });
    }

    const response = await fetch(
      this.config.API.getPaymentTools(paymentMethodId),
      {
        headers: {
          Authorization: `Bearer ${this.Account.getToken().token}`,
        },
      },
    );

    await checkStatus(response);

    return response.json();
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
  async create(data: any) {
    if (!this.Account.isAuthenticated()) {
      errorResponse(401, {
        code: 401,
        message: 'User is not authenticated',
      });
    }

    const body: any = {
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

    await checkStatus(response);

    return response.json();
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
  async getPayPalParams(data: any) {
    if (!this.Account.isAuthenticated()) {
      errorResponse(401, {
        code: 401,
        message: 'User is not authenticated',
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

    await checkStatus(response);

    return response.json();
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
  async getPurchaseHistory(status = 'active', page: any, limit: any) {
    if (!this.Account.isAuthenticated()) {
      errorResponse(401, {
        code: 401,
        message: 'User is not authenticated',
      });
    }

    const response = await fetch(
      this.config.API.getPurchaseHistory(status, page, limit),
      {
        headers: {
          Authorization: `Bearer ${this.Account.getToken().token}`,
        },
      },
    );

    await checkStatus(response);

    return response.json();
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
        message: 'User is not authenticated',
      });
    }

    const response = await fetch(this.config.API.getDefaultCreditCard, {
      headers: {
        Authorization: `Bearer ${this.Account.getToken().token}`,
      },
    });

    await checkStatus(response);

    return response.json();
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
  async setDefaultCreditCard(data: SetDefaultCardPerCurrencyData) {
    const body = {
      number: data.cardNumber,
      card_name: data.cardName,
      cvv: data.cvc,
      exp_month: data.expMonth,
      exp_year: data.expYear,
      currency_iso: data.currency,
    };

    return authenticatedApi.put(this.config.API.setDefaultCreditCard, qs.stringify(body), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
  }

  // TODO: RESUME!!!!!!

  /**
   * Checks for existing user direct debit mandate
   * @method getDirectDebitMandate
   * @async
   * @example
   *     InPlayer.Payment
   *     .getDirectDebitMandate('/v2/payments/direct-debit/mandate')
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
    return authenticatedApi.get(DIRECT_DEBIT_MANDATE_V2_PATH, {
      headers: {
        Authorization: `Bearer ${this.Account.getToken().token}`,
      },
    });
  }

  /**
   * Create direct debit mandate for customer
   * @method createDirectDebitMandate
   * @async
   * @param {Object} data - Contains the data - {
   *  name: string,
   *  iban: string
   * }
   * @example
   *     InPlayer.Payment
   *     .createDirectDebitMandate('/v2/payments/direct-debit/mandate', body)
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
  async createDirectDebitMandate(data: CreateDirectDebitMandateData) {
    const body = {
      name: data.name,
      iban: data.iban,
    };

    return authenticatedApi.post(DIRECT_DEBIT_MANDATE_V2_PATH, body, {
      headers: {
        Authorization: `Bearer ${this.Account.getToken().token}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
  }

  /**
   * Process a request for direct debit SEPA charge
   * @method directDebitCharge
   * @async
   * @param {Object} data - Contains the data - {
   *  accessFeeId: number,
   *  assetId: number,
   *  voucherCode: string,
   *  paymentMethod: 'Direct Debit'
   * }
   * @example
   *     InPlayer.Payment
   *     .directDebitCharge('/v2/payments', body)
   *     .then(data => console.log(data));
   * @return {Object} Contains the data - {
   *       code: '200',
   *       message: "Submitted for payment",
   *    }
   *
   */
  async directDebitCharge(data: DirectDebitChargeData) {
    const body = {
      access_fee_id: data.accessFeeId,
      item_id: data.assetId,
      voucher_code: data.voucherCode,
      payment_method: data.paymentMethod,
    };

    return authenticatedApi.post(DIRECT_DEBIT_CHARGE_V2_PATH, body, {
      headers: {
        Authorization: `Bearer ${this.Account.getToken().token}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
  }

  /**
   * Process a request for direct debit subscribe
   * @method directDebitSubscribe
   * @async
   * @param {Object} data - Contains the data - {
   *  assetId: number,
   *  accessFeeId: number,
   *  voucherCode: string,
   *  paymentMethod: 'Direct Debit'
   * }
   * @example
   *     InPlayer.Payment
   *     .directDebitSubscribe('/v2/subscriptions', body)
   *     .then(data => console.log(data));
   * @return {Object} Contains the data - {
   *       code: '200',
   *       message: "Submitted for payment",
   *    }
   *  }
   */

  async directDebitSubscribe(data: DirectDebitSubscribeData) {
    const body = {
      item_id: data.assetId,
      access_fee_id: data.accessFeeId,
      voucher_code: data.voucherCode,
      payment_method: data.paymentMethod,
    };

    return authenticatedApi.post(DIRECT_DEBIT_SUBSCRIBE_V2_PATH, body, {
      headers: {
        Authorization: `Bearer ${this.Account.getToken().token}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
  }
}

export default Payment;
