import qs from 'qs';
import {
  CreatePaymentData,
  PaypalParamsData,
  SetDefaultCardPerCurrencyData,
  CreateDirectDebitMandateData,
  DirectDebitData,
  CreatePaymentRequestBody,
  IdealPaymentData,
  IdealPaymentRequestBody,
  IdealData,
} from '../models/IPayment&Subscription';
import { CustomErrorResponse } from '../models/CommonInterfaces';
import { ApiConfig, Request } from '../models/Config';
import { buildURLwithQueryParams } from '../helpers';
import BaseExtend from '../extends/base';
import { API } from '../constants';

/**
 * Contains all Requests connected with payments
 *
 * @class Payment
 */
class Payment extends BaseExtend {
  constructor(config: ApiConfig, request: Request) {
    super(config, request);
  }

  /**
   * Get all payment methods for a User
   * @method getPaymentMethods
   * @async
   * @example
   *     InPlayer.Payment
   *     .getPaymentMethods()
   *     .then(data => console.log(data));
   * @returns  {AxiosResponse<Array<MerchantPaymentMethod>>}
   */
  async getPaymentMethods() {
    return this.request.authenticatedGet(API.getPaymentMethods, {
      headers: {
        Authorization: `Bearer ${this.request.getToken().token}`,
      },
    });
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
   * @returns  {AxiosResponse<any>}
   */
  async getPaymentTools(paymentMethodId: number) {
    return this.request.authenticatedGet(
      API.getPaymentTools(paymentMethodId),
      {
        headers: {
          Authorization: `Bearer ${this.request.getToken().token}`,
        },
      },
    );
  }

  /**
   * Makes a Payment for a given Authorization token + asset/payment details.
   * Use this method ONLY if the assetFee.type is not 'subscription' or 'freemium'. Otherwise
   * please use InPlayer.Subscription.createPayment()
   * @method createPayment
   * @async
   * @param {Object} data - Payment data - {
   *  number: number || string,
   *  cardName: string,
   *  expMonth: number,
   *  expYear: number,
   *  cvv: number,
   *  accessFee: number,
   *  paymentMethod: string,
   *  referrer: string,
   *  voucherCode?: string,
   *  brandingId?: number,
   *  paymentIntentId?: string,
   * }
   * @example
   *     InPlayer.Payment
   *     .createPayment({
   *       number: 4111111111111111,
   *       cardName: 'PayPal',
   *       expMonth: 10,
   *       expYear: 2030,
   *       cvv: 656,
   *       accessFee: 2341,
   *       paymentMethod: 1,
   *       referrer: 'http://google.com',
   *       voucherCode: 'fgh1982gff-0f2grfds'
   *       brandingId: 1234,
   *       returnUrl: 'https://event.inplayer.com/staging',
   *      })
   *     .then(data => console.log(data));
   * @returns  {AxiosResponse<CreatePayment>}
   */
  async createPayment(data: CreatePaymentData) {
    const body: CreatePaymentRequestBody = {
      number: data.number,
      card_name: data.cardName,
      exp_month: data.expMonth,
      exp_year: data.expYear,
      cvv: data.cvv,
      access_fee: data.accessFee,
      payment_method: data.paymentMethod,
      referrer: data.referrer,
      branding_id: data.brandingId,
      return_url: buildURLwithQueryParams(data.returnUrl, { ippwat: 'ppv' }),
    };

    if (data.voucherCode) {
      body.voucher_code = data.voucherCode;
    }

    return this.request.authenticatedPost(
      API.payForAsset,
      qs.stringify(body),
      {
        headers: {
          Authorization: `Bearer ${this.request.getToken().token}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );
  }

  /**
   * As part of new bank regulations, we need to provide options for
   * additional authentication during the payment flow for customers
   * @method confirmPayment
   * @async
   * @param {string}
   * @example
   *     InPlayer.Payment
   *     .confirmPayment('332242')
   *     .then(data => console.log(data));
   * @returns  {AxiosResponse<CreatePayment>} Contains the data - {
   *       message: "Submitted for payment",
   *  }
   */
  async confirmPayment(paymentIntentId: string) {
    if (!paymentIntentId) {
      const response: CustomErrorResponse = {
        status: 400,
        data: {
          code: 400,
          message: 'Payment Intend Id is a required parameter!',
        },
      };

      throw { response };
    }

    const body = {
      pi_id: paymentIntentId,
    };

    return this.request.authenticatedPost(
      API.payForAsset,
      qs.stringify(body),
      {
        headers: {
          Authorization: `Bearer ${this.request.getToken().token}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );
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
   *      origin: location.href,
   *      accessFeeId: 34,
   *      paymentMethod: 2
   *      voucherCode: '1231231'
   *      branding_id: 1133,
   *     })
   *     .then(data => console.log(data));
   * @returns  {AxiosResponse<GeneratePayPalParameters>}
   */
  async getPayPalParams(data: PaypalParamsData) {
    const formData = new FormData();

    formData.append('origin', data.origin);
    formData.append('access_fee', String(data.accessFeeId));
    formData.append('payment_method', String(data.paymentMethod));
    formData.append('branding_id', String(data.brandingId));

    if (data.voucherCode) {
      formData.append('voucher_code', data.voucherCode);
    }

    return this.request.authenticatedPost(API.getPayPalParams, formData, {
      headers: {
        Authorization: `Bearer ${this.request.getToken().token}`,
      },
    });
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
   * @returns  {AxiosResponse<PurchaseHistoryCollection[]>}
   */
  async getPurchaseHistory(status = 'active', page: number, limit: number) {
    return this.request.authenticatedGet(
      API.getPurchaseHistory(status, page, limit),
      {
        headers: {
          Authorization: `Bearer ${this.request.getToken().token}`,
        },
      },
    );
  }

  /**
   * Gets the default credit card per currency used for subscription rebills
   * @method getDefaultCreditCard
   * @async
   * @example
   *     InPlayer.Payment
   *     .getDefaultCreditCard()
   *     .then(data => console.log(data));
   * @returns  {AxiosResponse<GetDefaultCard>}
   */
  async getDefaultCreditCard() {
    return this.request.authenticatedGet(API.getDefaultCreditCard, {
      headers: {
        Authorization: `Bearer ${this.request.getToken().token}`,
      },
    });
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
   * @returns  {<AxiosResponse<SetDefaultCard>}
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

    return this.request.authenticatedPut(
      API.setDefaultCreditCard,
      qs.stringify(body),
      {
        headers: {
          Authorization: `Bearer ${this.request.getToken().token}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );
  }

  /**
   * Checks for existing user direct debit mandate
   * @method getDirectDebitMandate
   * @async
   * @example
   *     InPlayer.Payment
   *     .getDirectDebitMandate()
   *     .then(data => console.log(data));
   * @returns  {AxiosResponse<DirectDebitMandateResponse>} Contains the data - {
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
    return this.request.authenticatedGet(API.getDirectDebitMandate, {
      headers: {
        Authorization: `Bearer ${this.request.getToken().token}`,
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
   * @returns  {AxiosResponse<CreateDirectDebitResponse>} Contains the data - {
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

    return this.request.authenticatedPost(
      API.createDirectDebitMandate,
      qs.stringify(body),
      {
        headers: {
          Authorization: `Bearer ${this.request.getToken().token}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );
  }

  /**
   * Process a request for direct debit SEPA charge
   * @method directDebitCharge
   * @async
   * @param {Object} data - Contains the data - {
   *  assetId: {string},
   *  accessFeeId: {string},
   *  voucherCode: {string},
   *  brandingId?: number
   * }
   * @example
   *     InPlayer.Payment
   *     .directDebitCharge({ assetId, accessFeeId, voucherCode, brandingId })
   *     .then(data => console.log(data));
   * @returns  {AxiosResponse<CommonResponse>} Contains the data - {
   *       code: '200',
   *       message: "Submitted for payment",
   *    }
   *
   */
  async directDebitCharge(data: DirectDebitData) {
    const body = {
      access_fee_id: data.accessFeeId,
      item_id: data.assetId,
      voucher_code: data.voucherCode,
      payment_method: 'Direct Debit',
      branding_id: data.brandingId,
    };

    return this.request.authenticatedPost(
      API.payForAssetV2,
      qs.stringify(body),
      {
        headers: {
          Authorization: `Bearer ${this.request.getToken().token}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );
  }

  /**
   * Process a request for direct debit subscribe
   * @method directDebitSubscribe
   * @async
   * @param {Object} data - Contains the data - {
   *  assetId: {string},
   *  accessFeeId: {string},
   *  voucherCode: {string},
   *  brandingId?: number
   * }
   * @example
   *     InPlayer.Payment
   *     .directDebitSubscribe({ assetId, accessFeeId, voucherCode, brandingId })
   *     .then(data => console.log(data));
   * @returns  {AxiosResponse<CommonResponse>} Contains the data - {
   *       code: '200',
   *       message: "Submitted for payment",
   *    }
   *  }
   */
  async directDebitSubscribe(data: DirectDebitData) {
    const body = {
      item_id: data.assetId,
      access_fee_id: data.accessFeeId,
      voucher_code: data.voucherCode,
      payment_method: 'Direct Debit',
      branding_id: data.brandingId,
    };

    return this.request.authenticatedPost(
      API.subscribeV2,
      qs.stringify(body),
      {
        headers: {
          Authorization: `Bearer ${this.request.getToken().token}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );
  }

  /**
   * Process a request for start ideal payment
   * @method idealPayment
   * @async
   * @param {Object} data - Contains the data - {
   *  paymentMethod: {string},
   *  accessFeeId: number,
   *  bank: {string},
   *  returnUrl: {string};
   *  referrer: string,
   *  brandingId?: number
   *  voucherCode?: {string},
   * }
   * @example
   *     InPlayer.Payment
   *     .idealPayment({ paymentMethod, accessFeeId, bank, returnUrl, referrer, brandingId, voucherCode })
   *     .then(data => console.log(data));
   * @returns  {AxiosResponse<CommonResponse>} Contains the data - {
   *    code: '200',
   *    message: "Submitted for payment",
   *  }
   */
  async idealPayment(data: IdealPaymentData) {
    const body: IdealPaymentRequestBody = {
      payment_method: data.paymentMethod,
      access_fee_id: data.accessFeeId,
      bank: data.bank,
      return_url: buildURLwithQueryParams(data.returnUrl, { ippwat: 'ppv' }),
      referrer: data.referrer,
    };

    if (data.brandingId) {
      body.branding_id = data.brandingId;
    }

    if (data.voucherCode) {
      body.voucher_code = data.voucherCode;
    }

    return this.request.authenticatedPost(
      API.payForAssetV2,
      qs.stringify(body),
      {
        headers: {
          Authorization: `Bearer ${this.request.getToken().token}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );
  }

  /**
   * Process a request for ideal payment confirmation
   * @method confirmIdealPayment
   * @async
   * @param {Object} data - Contains the data - {
   *  sourceId: {string},
   *  paymentMethod: {string},
   * }
   * @example
   *     InPlayer.Payment
   *     .confirmIdealPayment({ sourceId, paymentMethod })
   *     .then(data => console.log(data));
   * @returns  {AxiosResponse<CommonResponse>} Contains the data - {
   *       code: '200',
   *       message: "Submitted for payment",
   *    }
   *
   */
  async confirmIdealPayment(data: IdealData) {
    if (!data.sourceId) {
      const response: CustomErrorResponse = {
        status: 400,
        data: {
          code: 400,
          message: 'Source Id is a required parameter!',
        },
      };

      throw { response };
    }

    const body = {
      payment_method: data.paymentMethod,
      src_id: data.sourceId,
    };

    return this.request.authenticatedPost(
      API.payForAssetV2,
      qs.stringify(body),
      {
        headers: {
          Authorization: `Bearer ${this.request.getToken().token}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );
  }
}

export default Payment;
