import qs from 'qs';
import { AxiosResponse } from 'axios';
import {
  CreatePaymentRequestBody,
  IdealPaymentRequestBody,
  GoogleOrApplePaymentRequestBody,
  ReceiptValidationPlatform,
  CreateDonationPaymentData,
  CreateDonationPaymentRequestBody,
  ConfirmDonationPaymentRequestBody,
  StripePaymentMethods,
  MerchantPaymentMethod,
  GeneratePayPalParameters,
  PurchaseHistoryCollection,
  GetDefaultCard,
  SetDefaultCard,
  DirectDebitMandateResponse,
  CreateDirectDebitResponse,
} from '../models/IPayment';
import { CommonResponse, CustomErrorResponse } from '../models/CommonInterfaces';
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
   * Gets all payment methods for a given user
   * @method getPaymentMethods
   * @async
   * @example
   *     InPlayer.Payment
   *     .getPaymentMethods()
   *     .then(data => console.log(data));
   * @returns  {AxiosResponse<Array<MerchantPaymentMethod>>} Contains the data:
   * ```typescript
   * [
   *    {
   *      id: number;
   *      method_name: string;
   *      is_external: boolean;
   *    }
   * ]
   * ```
   */
  async getPaymentMethods(): Promise<AxiosResponse<Array<MerchantPaymentMethod>>> {
    const tokenObject = await this.request.getToken();

    return this.request.authenticatedGet(API.getPaymentMethods, {
      headers: {
        Authorization: `Bearer ${tokenObject.token}`,
      },
    });
  }

  /**
   * Makes a Payment for a given Authorization token + asset/payment details.
   * Use this method ONLY if the assetFee.type is not 'subscription' or 'freemium'. Otherwise
   * please use InPlayer.Subscription.createPayment()
   * @method createPayment
   * @async
   * @param {string} number The card number.
   * @param {string} cardName The cardholder's name.
   * @param {string} expMonth The card expiration month [1...12].
   * @param {string} expYear The card expiration year.
   * @param {number} cvv The card CVV number.
   * @param {number} accessFee The id of created access fee for given premium content.
   * @param {string} paymentMethod Payment method id.
   * @param {string} referrer The URL from which the request has been invoked or the location
   * where the account has been created.
   * @param {string} voucherCode The voucher's promotional code.
   * Grants the customers the privilege of using a discount.
   * @param {number} brandingId The id of created branding theme in InPlayer Dashboard.
   * If it is not set the default branding details will be returned.
   * @param {string} returnUrl The url of payment page.
   * @param {boolean} isGift The boolean flag if premium content is being bought as a gift.
   * @param {string} receiverEmail The email of the gift receiver.
   * @example
   *     InPlayer.Payment
   *     .createPayment({
   *       number: 4111111111111111,
   *       cardName: 'PayPal',
   *       expMonth: '10',
   *       expYear: '2030',
   *       cvv: 656,
   *       accessFee: 2341,
   *       paymentMethod: 1,
   *       referrer: 'http://google.com',
   *       voucherCode: 'fgh1982gff-0f2grfds'
   *       brandingId: 1234,
   *       returnUrl: 'https://event.inplayer.com/staging',
   *       isGift,
   *       receiverEmail: 'mail@gmail.com'
   *      })
   *     .then(data => console.log(data));
   * @returns  {AxiosResponse<CommonResponse>} Containes the data:
   * ```typescript
   * {
   *    code: 200,
   *    message: "Submittet for payment"
   * }
   * ```
   */
  // object types must be anonymous(don't use interface or type alias)
  // in order to data params description to be shown in typedoc
  async createPayment({
    number,
    cardName,
    expMonth,
    expYear,
    cvv,
    accessFee,
    paymentMethod,
    referrer,
    voucherCode,
    brandingId,
    returnUrl,
    receiverEmail,
    isGift,
  }: {
    number: number;
    cardName: string;
    expMonth: string;
    expYear: string;
    cvv: number;
    accessFee: number;
    paymentMethod: number;
    referrer: string;
    voucherCode: string;
    brandingId: number;
    returnUrl: string;
    receiverEmail?: string;
    isGift?: boolean;
  }): Promise<AxiosResponse<CommonResponse>> {
    const body: CreatePaymentRequestBody = {
      number,
      card_name: cardName,
      exp_month: expMonth,
      exp_year: expYear,
      cvv,
      access_fee: accessFee,
      payment_method: paymentMethod,
      referrer,
      branding_id: brandingId,
      return_url: buildURLwithQueryParams(returnUrl, { ippwat: 'ppv' }),
    };

    if (voucherCode) {
      body.voucher_code = voucherCode;
    }

    if (isGift) {
      body.is_gift = isGift;
      body.receiver_email = receiverEmail;
    }

    const tokenObject = await this.request.getToken();

    return this.request.authenticatedPost(API.payForAsset, qs.stringify(body), {
      headers: {
        Authorization: `Bearer ${tokenObject.token}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
  }

  /**
   * Makes a Donation Payment for a given Authorization token + asset/payment details.
   * @method createDonationPayment
   * @async
   * @param {string} number The card number.
   * @param {string} cardName The cardholder's name.
   * @param {string} expMonth The card expiration month [1...12].
   * @param {string} expYear The card expiration year.
   * @param {number} cvv The card CVV number.
   * @param {number} assetId The id of created premium content in InPlayer Dashboard (i.e asset id or package id).
   * @param {number} paymentMethod Payment method id.
   * @param {string} referrer The URL from which the request has been invoked or the location
   * where the account has been created.
   * @param {number} brandingId The id of created branding theme in InPlayer Dashboard.
   * If it is not set the default branding details will be returned.
   * @param {string} returnUrl The url of payment page.
   * @param {number} amount The amount which user wants to donate.
   * @param {string} currency The currency in which user wants to donate.
   * @param {number} donationId The donation id.
   * @example
   *     InPlayer.Payment
   *     .createPayment({
   *       number: 4111111111111111,
   *       cardName: 'Test',
   *       expMonth: 10,
   *       expYear: 2030,
   *       cvv: 656,
   *       assetId: 2341,
   *       paymentMethod: 'Card',
   *       referrer: 'http://google.com',
   *       voucherCode: 'fgh1982gff-0f2grfds'
   *       brandingId: 1234,
   *       returnUrl: 'https://event.inplayer.com/staging',
   *       amount: 1234,
   *       currency: EUR,
   *       donationId: 4567,
   *      })
   *     .then(data => console.log(data));
   * @returns  {AxiosResponse<CommonResponse>} Contains the data:
   * ```typescript
   * {
   *    code: 200,
   *    message: "Submitted for payment"
   * }
   * ```
   */
  async createDonationPayment(data: CreateDonationPaymentData): Promise<AxiosResponse<CreateDonationPaymentData>> {
    const body: CreateDonationPaymentRequestBody = {
      number: data.number,
      card_name: data.cardName,
      exp_month: data.expMonth,
      exp_year: data.expYear,
      cvv: data.cvv,
      payment_method: data.paymentMethod,
      referrer: data.referrer,
      branding_id: data.brandingId,
      currency_iso: data.currency,
      amount: data.amount,
      item_id: data.assetId,
      donation_id: data.donationId,
      return_url: buildURLwithQueryParams(data.returnUrl, { ippwat: 'ppv' }),
    };

    const tokenObject = await this.request.getToken();

    return this.request.authenticatedPost(
      API.payForAssetDonation,
      qs.stringify(body),
      {
        headers: {
          Authorization: `Bearer ${tokenObject.token}`,
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
   * @param {string} paymentIntentId The id of the payment.
   * Part of the return url (`payment_intent` query parameter)
   * after successful authetication in SCA process.
   * @throws Will throw an HTTP 400 error if the payment intent id is not sent.
   * @example
   *     InPlayer.Payment
   *     .confirmPayment('332242')
   *     .then(data => console.log(data));
   * @returns  {AxiosResponse<CommonResponse>} Contains the data:
   * ```typescript
   * {
   *    code: 200,
   *    message: "Submitted for payment",
   * }
   * ```
   */
  async confirmPayment(paymentIntentId: string): Promise<AxiosResponse<CommonResponse>> {
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

    const tokenObject = await this.request.getToken();

    return this.request.authenticatedPost(API.payForAsset, qs.stringify(body), {
      headers: {
        Authorization: `Bearer ${tokenObject.token}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
  }

  /**
   * As part of new bank regulations, we need to provide options for
   * additional authentication during the payment flow for customers
   * @method confirmDonationPayment
   * @async
   * @param {string} paymentIntentId The id of the payment.
   * Part of the return url (`payment_intent` query parameter)
   * after successful authetication in SCA process.
   * @param {number} brandingId The id of created branding theme in InPlayer Dashboard.
   * If it is not set the default branding details will be returned.
   * @param {number} paymentMethod Payment method id.
   * @param {number} donationId The donation id.
   * @throws Will throw an HTTP 400 error if the payment intent id is not sent.
   * @example
   *     InPlayer.Payment
   *     .confirmDonationPayment('332242', 1, 'Card')
   *     .then(data => console.log(data));
   * @returns  {AxiosResponse<CommonResponse>} Contains the data:
   * ```typescript
   * {
   *    code: 200,
   *    message: "Submitted for payment",
   * }
   * ```
   */
  // object types must be anonymous(don't use interface or type alias)
  // in order to data params description to be shown in typedoc
  async confirmDonationPayment({
    paymentIntentId,
    brandingId,
    paymentMethod,
    donationId,
  }: {
    paymentIntentId: string;
    brandingId: number;
    paymentMethod: string;
    donationId?: number;
  }): Promise<AxiosResponse<CommonResponse>> {
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

    const body: ConfirmDonationPaymentRequestBody = {
      pi_id: paymentIntentId,
      branding_id: brandingId,
      payment_method: paymentMethod,
      donation_id: donationId,
    };

    const tokenObject = await this.request.getToken();

    return this.request.authenticatedPost(
      API.confirmForAssetDonation,
      qs.stringify(body),
      {
        headers: {
          Authorization: `Bearer ${tokenObject.token}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );
  }

  /**
   * Gets parameters for PayPal
   * @method getPayPalParams
   * @async
   * @param {string} origin The url of the current page.
   * @param {number} accessFeeId The id of created access fee for given premium content.
   * @param {number} paymentMethod Payment method id.
   * @param {string} voucherCode The voucher's promotional code.
   * Grants the customers the privilege of using a discount.
   * @param {number} brandingId The id of created branding theme in InPlayer Dashboard.
   * If it is not set the default branding details will be returned.
   * @example
   *     InPlayer.Payment
   *     .getPayPalParams({
   *      origin: window.location.href,
   *      accessFeeId: 34,
   *      paymentMethod: 2
   *      voucherCode: '1231231'
   *      branding_id: 1133,
   *     })
   *     .then(data => console.log(data));
   * @returns  {AxiosResponse<GeneratePayPalParameters>} Contains the data:
   * {
   *    endpoint: string;
   *    business: string;
   *    item_name: string;
   *    currency_code: string;
   *    return: string;
   *    cancel_return: string;
   * }
   */
  // object types must be anonymous(don't use interface or type alias)
  // in order to data params description to be shown in typedoc
  async getPayPalParams({
    origin,
    accessFeeId,
    paymentMethod,
    voucherCode,
    brandingId,
  }: {
    origin: string;
    accessFeeId: number;
    paymentMethod: number;
    voucherCode: string;
    brandingId?: number;
  }): Promise<AxiosResponse<GeneratePayPalParameters>> {
    const formData = new FormData();

    formData.append('origin', origin);
    formData.append('access_fee', String(accessFeeId));
    formData.append('payment_method', String(paymentMethod));
    formData.append('branding_id', String(brandingId));

    if (voucherCode) {
      formData.append('voucher_code', voucherCode);
    }

    const tokenObject = await this.request.getToken();

    return this.request.authenticatedPost(API.getPayPalParams, formData, {
      headers: {
        Authorization: `Bearer ${tokenObject.token}`,
      },
    });
  }

  /**
   * Gets the purchase history
   * @method getPurchaseHistory
   * @async
   * @param {string} status - The purchase status (active/inactive).
   * It it is not set the active purchases will be returned.
   * @param {number} page The current page number.
   * If it is not set the starting page will be returned.
   * @param {number} limit The number of items per page.
   * If it is not set the number of items per page will be 15.
   * @example
   *     InPlayer.Payment
   *     .getPurchaseHistory('active', 0, 5)
   *     .then(data => console.log(data));
   * @returns  {AxiosResponse<PurchaseHistoryCollection[]>} Contains the data:
   * {
   *    total: number;
   *    page: number;
   *    offset: number;
   *    limit: number;
   *    collection: [{
   *      consumer_email: string;
   *      created_at: number;
   *      customer_id: number;
   *      expires_at: number;
   *      is_trial: boolean;
   *      item_access_id: number;
   *      item_id: number;
   *      item_title: string;
   *      merchant_id: number;
   *      parent_resource_id: string;
   *      payment_method: string;
   *      payment_tool: string;
   *      purchase_access_fee_description: string;
   *      purchased_access_fee_id: number;
   *      purchased_access_fee_type: string;
   *      purchased_amount: number;
   *      purchased_currency: string;
   *      revoked: number;
   *      starts_at: number;
   *      type: string;
   *    }];
   * }
   */
  async getPurchaseHistory(
    status = 'active',
    page = 0,
    limit = 5,
  ): Promise<AxiosResponse<PurchaseHistoryCollection[]>> {
    const tokenObject = await this.request.getToken();

    return this.request.authenticatedGet(
      API.getPurchaseHistory(status, page, limit),
      {
        headers: {
          Authorization: `Bearer ${tokenObject.token}`,
        },
      },
    );
  }

  /**
   * Gets the default credit card per currency used for subscription rebills
   * @deprecated
   * Please use the one from Subscription module i.e
   * InPlayer.Subscription.getDefaultCreditCard()
   * @method getDefaultCreditCard
   * @async
   * @example
   *     InPlayer.Payment
   *     .getDefaultCreditCard()
   *     .then(data => console.log(data));
   * @returns  {AxiosResponse<GetDefaultCard>}
   */
  async getDefaultCreditCard(): Promise<AxiosResponse<GetDefaultCard>> {
    const tokenObject = await this.request.getToken();

    return this.request.authenticatedGet(API.getDefaultCreditCard, {
      headers: {
        Authorization: `Bearer ${tokenObject.token}`,
      },
    });
  }

  /**
   * Sets card per currency as default card that is to be used for further subscription rebills
   * @deprecated
   * Please use the one from Subscription module i.e
   * InPlayer.Subscription.setDefaultCreditCard()
   * @method setDefaultCreditCard
   * @async
   * @param {string} cardNumber The card number.
   * @param {string} cardName The cardholder's name.
   * @param {number} cvc The card CVV number.
   * @param {number} expMonth The card expiration month [1...12].
   * @param {number} expYear The card expiration year.
   * @param {string} currency The currency in which the subscription transactions are conducted.
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
   * @returns  {<AxiosResponse<SetDefaultCard>} Contains the data:
   * ```typescript
   * {
   *    number: number;
   *    card_name: string;
   *    exp_month: number;
   *    exp_year: number;
   * }
   * ```
   */
  // object types must be anonymous(don't use interface or type alias)
  // in order to data params description to be shown in typedoc
  async setDefaultCreditCard({
    cardNumber,
    cardName,
    cvc,
    expMonth,
    expYear,
    currency,
  }: {
    cardNumber: string,
    cardName: string,
    cvc: number,
    expMonth: number,
    expYear: number,
    currency: string,
  }): Promise<AxiosResponse<SetDefaultCard>> {
    const body = {
      number: cardNumber,
      card_name: cardName,
      cvv: cvc,
      exp_month: expMonth,
      exp_year: expYear,
      currency_iso: currency,
    };

    const tokenObject = await this.request.getToken();

    return this.request.authenticatedPut(
      API.setDefaultCreditCard,
      qs.stringify(body),
      {
        headers: {
          Authorization: `Bearer ${tokenObject.token}`,
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
   * @returns  {AxiosResponse<DirectDebitMandateResponse>} Contains the data:
   * ```typescript
   * {
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
   * ```
   */
  async getDirectDebitMandate(): Promise<AxiosResponse<DirectDebitMandateResponse>> {
    const tokenObject = await this.request.getToken();

    return this.request.authenticatedGet(API.getDirectDebitMandate, {
      headers: {
        Authorization: `Bearer ${tokenObject.token}`,
      },
    });
  }

  /**
   * Creates direct debit mandate for user
   * @method createDirectDebitMandate
   * @async
   * @param {string} name The customer's bank full name
   * @param {string} iban The customer's bank IBAN number
   * @example
   *     InPlayer.Payment
   *     .createDirectDebitMandate({
   *        name: 'Name Surname',
   *        iban: '123Nk362'
   *      })
   *     .then(data => console.log(data));
   * @returns  {AxiosResponse<CreateDirectDebitResponse>} Contains the data:
   * ```typescript
   * {
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
   *   }
   * }
   * ```
   */
  // object types must be anonymous(don't use interface or type alias)
  // in order to data params description to be shown in typedoc
  async createDirectDebitMandate({
    name,
    iban,
  }: {
    name: string;
    iban: string;
  }): Promise<AxiosResponse<CreateDirectDebitResponse>> {
    const body = {
      name,
      iban,
    };

    const tokenObject = await this.request.getToken();

    return this.request.authenticatedPost(
      API.createDirectDebitMandate,
      qs.stringify(body),
      {
        headers: {
          Authorization: `Bearer ${tokenObject.token}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );
  }

  /**
   * Process a request for direct debit SEPA charge
   * @method directDebitCharge
   * @async
   * @param {string} assetId The id of created premium content in InPlayer Dashboard (i.e asset id or package id).
   * @param {string} accessFeeId The id of created access fee for given premium content.
   * @param {string} voucherCode The voucher's promotional code.
   * Grants the customers the privilege of using a discount.
   * @param {number} brandingId The id of created branding theme in InPlayer Dashboard.
   * If it is not set the default branding details will be returned.
   * @param {string} referrer The URL from which the request has been invoked or the location
   * where the account has been created.
   * @example
   *     InPlayer.Payment
   *     .directDebitCharge({ assetId, accessFeeId, voucherCode, brandingId })
   *     .then(data => console.log(data));
   * @returns  {AxiosResponse<CommonResponse>} Contains the data:
   * ```typescript
   * {
   *    code: '200',
   *    message: "Submitted for payment",
   * }
   * ```
   */
  // object types must be anonymous(don't use interface or type alias)
  // in order to data params description to be shown in typedoc
  async directDebitCharge({
    accessFeeId,
    assetId,
    voucherCode,
    brandingId,
    referrer,
  }: {
    accessFeeId: number;
    assetId: number;
    voucherCode: string;
    brandingId?: number;
    referrer: string;
  }): Promise<AxiosResponse<CommonResponse>> {
    const body = {
      access_fee_id: accessFeeId,
      item_id: assetId,
      voucher_code: voucherCode,
      payment_method: 'Direct Debit',
      branding_id: brandingId,
      referrer,
    };

    const tokenObject = await this.request.getToken();

    return this.request.authenticatedPost(
      API.payForAssetV2,
      qs.stringify(body),
      {
        headers: {
          Authorization: `Bearer ${tokenObject.token}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );
  }

  /**
   * Process a request for direct debit subscribe
   * @deprecated
   * Please use the one from Subscription module i.e
   * InPlayer.Subscription.directDebitSubscribe()
   * @method directDebitSubscribe
   * @async
   * @param {string} assetId The id of created premium content in InPlayer Dashboard (i.e asset id or package id).
   * @param {string} accessFeeId The id of created access fee for given premium content.
   * @param {string} voucherCode The voucher's promotional code.
   * Grants the customers the privilege of using a discount.
   * @param {number} brandingId The id of created branding theme in InPlayer Dashboard.
   * If it is not set the default branding details will be returned.
   * @param {string} referrer The URL from which the request has been invoked or the location
   * where the account has been created.
   * @example
   *     InPlayer.Payment
   *     .directDebitSubscribe({ assetId, accessFeeId, voucherCode, brandingId })
   *     .then(data => console.log(data));
   * @returns  {AxiosResponse<CommonResponse>} Contains the data
   * ```typescript
   * {
   *    code: 200,
   *    message: "Submitted for payment"
   * }
   * ```
   */
  // object types must be anonymous(don't use interface or type alias)
  // in order to data params description to be shown in typedoc
  async directDebitSubscribe({
    accessFeeId,
    assetId,
    voucherCode,
    brandingId,
    referrer,
  }:{
    accessFeeId: number;
    assetId: number;
    voucherCode: string;
    brandingId?: number;
    referrer: string;
  }): Promise<AxiosResponse<CommonResponse>> {
    const body = {
      item_id: assetId,
      access_fee_id: accessFeeId,
      voucher_code: voucherCode,
      payment_method: 'Direct Debit',
      branding_id: brandingId,
      referrer,
    };

    const tokenObject = await this.request.getToken();

    return this.request.authenticatedPost(API.subscribeV2, qs.stringify(body), {
      headers: {
        Authorization: `Bearer ${tokenObject.token}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
  }

  /**
   * Process a request for start ideal payment
   * @method idealPayment
   * @async
   * @param {number} accessFeeId The id of created access fee for given premium content.
   * @param {string} bank The supported value for
   * {@link https://stripe.com/docs/sources/ideal#specifying-customer-bank | ideal bank}.
   * @param {string} returnUrl The url of payment page.
   * @param {string} referrer The URL from which the request has been invoked or the location
   * where the account has been created.
   * @param {number} brandingId The id of created branding theme in InPlayer Dashboard.
   * If it is not set the default branding details will be returned.
   * @param {string} voucherCode The voucher's promotional code.
   * Grants the customers the privilege of using a discount.
   * @example
   *     InPlayer.Payment
   *     .idealPayment({
   *        1243,
   *        'handelsbanken',
   *        'https://event.inplayer.com/staging',
   *        'http://google.com',
   *        143,
   *        '123qwerty987' })
   *     .then(data => console.log(data));
   * @returns  {AxiosResponse<CommonResponse>} Contains the data:
   * ```typescript
   * {
   *    code: 200,
   *    message: "Submitted for payment"
   * }
   * ```
   */
  // object types must be anonymous(don't use interface or type alias)
  // in order to data params description to be shown in typedoc
  async idealPayment({
    accessFeeId,
    bank,
    returnUrl,
    referrer,
    brandingId,
    voucherCode,
  }: {
    accessFeeId: number;
    bank: string;
    returnUrl: string;
    referrer: string;
    brandingId?: number;
    voucherCode?: string;
  }): Promise<AxiosResponse<CommonResponse>> {
    const body: IdealPaymentRequestBody = {
      payment_method: 'ideal',
      access_fee_id: accessFeeId,
      bank,
      return_url: buildURLwithQueryParams(returnUrl, { ippwat: 'ppv' }),
      referrer,
    };

    if (brandingId) {
      body.branding_id = brandingId;
    }

    if (voucherCode) {
      body.voucher_code = voucherCode;
    }

    const tokenObject = await this.request.getToken();

    return this.request.authenticatedPost(
      API.payForAssetV2,
      qs.stringify(body),
      {
        headers: {
          Authorization: `Bearer ${tokenObject.token}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );
  }

  /**
   * Process a request for start ideal subscribe
   * @deprecated
   * Please use the one from Subscription module i.e
   * InPlayer.Subscription.idealSubscribe()
   * @method idealSubscribe
   * @async
   * @param {number} accessFeeId The id of created access fee for given premium content.
   * @param {string} bank The supported value for
   * {@link https://stripe.com/docs/sources/ideal#specifying-customer-bank | ideal bank}.
   * @param {string} returnUrl The url of payment page.
   * @param {string} referrer The URL from which the request has been invoked or the location
   * where the account has been created.
   * @param {number} brandingId The id of created branding theme in InPlayer Dashboard.
   * If it is not set the default branding details will be returned.
   * @param {string} voucherCode The voucher's promotional code.
   * Grants the customers the privilege of using a discount.
   * @example
   *     InPlayer.Payment
   *     .idealSubscribe({
   *        1243,
   *        'handelsbanken',
   *        'https://event.inplayer.com/staging',
   *        'http://google.com',
   *        143,
   *        '123qwerty987'
   *     .then(data => console.log(data));
   * @returns {AxiosResponse<CommonResponse>} Contains the data:
   * ```typescript
   * {
   *    code: 200,
   *    message: "Submitted for payment"
   * }
   * ```
   */
  // object types must be anonymous(don't use interface or type alias)
  // in order to data params description to be shown in typedoc
  async idealSubscribe({
    accessFeeId,
    bank,
    returnUrl,
    referrer,
    brandingId,
    voucherCode,
  }: {
    accessFeeId: number;
    bank: string;
    returnUrl: string;
    referrer: string;
    brandingId?: number;
    voucherCode?: string;
  }): Promise<AxiosResponse<CommonResponse>> {
    const body: IdealPaymentRequestBody = {
      payment_method: 'ideal',
      access_fee_id: accessFeeId,
      bank,
      return_url: buildURLwithQueryParams(returnUrl, { ippwat: 'subscription' }),
      referrer,
    };

    if (brandingId) {
      body.branding_id = brandingId;
    }

    if (voucherCode) {
      body.voucher_code = voucherCode;
    }

    const tokenObject = await this.request.getToken();

    return this.request.authenticatedPost(API.subscribeV2, qs.stringify(body), {
      headers: {
        Authorization: `Bearer ${tokenObject.token}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
  }

  /**
   * Process a request for start google payment
   * @method googlePayPayment
   * @async
   * @param {number} accessFeeId The id of created access fee for given premium content.
   * @param {string} referrer The URL from which the request has been invoked or the location
   * where the account has been created.
   * @param {number} brandingId The id of created branding theme in InPlayer Dashboard.
   * If it is not set the default branding details will be returned.
   * @param {string} voucherCode The voucher's promotional code.
   * Grants the customers the privilege of using a discount.
   * @example
   *     InPlayer.Payment
   *     .googlePayPayment({
   *        1243,
   *        'http://google.com',
   *        143,
   *        '123qwerty987'
   *     }).then((data) => console.log(data));
   * @returns  {AxiosResponse<CommonResponse>} Contains the data:
   * ```typescript
   * {
   *    code: 200,
   *    message: "Submitted for payment"
   * }
   * ```
   */
  // object types must be anonymous(don't use interface or type alias)
  // in order to data params description to be shown in typedoc
  async googlePayPayment({
    accessFeeId,
    referrer,
    brandingId,
    voucherCode,
  }: {
    accessFeeId: number;
    referrer: string;
    brandingId: number;
    voucherCode?: string;
  }): Promise<AxiosResponse<CommonResponse>> {
    const body: GoogleOrApplePaymentRequestBody<StripePaymentMethods.GOOGLE_PAY_ON_WEB> = {
      payment_method: StripePaymentMethods.GOOGLE_PAY_ON_WEB,
      access_fee_id: accessFeeId,
      voucher_code: voucherCode,
      branding_id: brandingId,
      referrer,
    };

    const tokenObject = await this.request.getToken();

    return this.request.authenticatedPost(
      API.payForAssetV2,
      qs.stringify(body),
      {
        headers: {
          Authorization: `Bearer ${tokenObject.token}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );
  }

  /**
   * Process a request for start apple payment
   * @method applePayPayment
   * @async
   * @param {number} accessFeeId The id of created access fee for given premium content.
   * @param {string} referrer The URL from which the request has been invoked or the location
   * where the account has been created.
   * @param {number} brandingId The id of created branding theme in InPlayer Dashboard.
   * If it is not set the default branding details will be returned.
   * @param {string} voucherCode The voucher's promotional code.
   * Grants the customers the privilege of using a discount.
   * @example
   *     InPlayer.Payment
   *     .applePayPayment({
   *        1243,
   *        'http://google.com',
   *        143,
   *        '123qwerty987'
   *      }).then((data) => console.log(data));
   * @returns  {AxiosResponse<CommonResponse>} Contains the data:
   * ```typescript
   * {
   *    code: 200,
   *    message: "Submitted for payment"
   * }
   * ```
   */
  // object types must be anonymous(don't use interface or type alias)
  // in order to data params description to be shown in typedoc
  async applePayPayment({
    accessFeeId,
    referrer,
    brandingId,
    voucherCode,
  }: {
    accessFeeId: number;
    referrer: string;
    brandingId: number;
    voucherCode?: string;
  }): Promise<AxiosResponse<CommonResponse>> {
    const body: GoogleOrApplePaymentRequestBody<StripePaymentMethods.APPLE_PAY_ON_WEB> = {
      payment_method: StripePaymentMethods.APPLE_PAY_ON_WEB,
      access_fee_id: accessFeeId,
      voucher_code: voucherCode,
      branding_id: brandingId,
      referrer,
    };

    const tokenObject = await this.request.getToken();

    return this.request.authenticatedPost(
      API.payForAssetV2,
      qs.stringify(body),
      {
        headers: {
          Authorization: `Bearer ${tokenObject.token}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );
  }

  /**
   * Validates an In App purchase from Amazon, Apple, GooglePlay or Roku services
   * @method validateReceipt
   * @async
   * @param {string} platform The TV platform.
   * Currently supported tv platforms: amazon, apple, google-play, roku.
   * @param {number} itemId The id of created premium content in InPlayer Dashboard (i.e asset id or package id).
   * @param {number} accessFeeId The id of created access fee for given premium content.
   * @param {string} receipt The receipt generated by the native Apple system when in-app payment process ends.
   * @param {string} amazonUserId The AWS unique identifier of the customer.
   * @example
   *      InPlayer.Payment
   *      .validateReceipt({
   *        platform: 'roku'
   *        itemId: 123,
   *        accessFeeId: 19,
   *        receipt: '123abc'
   *     })
   *     .then(data => console.log(data));
   * @returns {AxiosResponse<CommonResponse>} Contains the data
   * ```typescript
   * {
   *    code: 200,
   *    message: "Submitted for payment"
   * }
   * ```
   */
  // object types must be anonymous(don't use interface or type alias)
  // in order to data params description to be shown in typedoc
  async validateReceipt({
    platform,
    receipt,
    productName: product_name,
    itemId: item_id,
    accessFeeId: access_fee_id,
    amazonUserId: amazon_user_id,
  }: {
    platform: ReceiptValidationPlatform;
    receipt: string;
    productName?: string;
    itemId?: number;
    accessFeeId?: number;
    amazonUserId?: string;
  }): Promise<AxiosResponse<CommonResponse>> {
    const body = {
      receipt,
      ...(product_name ? { product_name } : { item_id, access_fee_id }),
      ...(platform === ReceiptValidationPlatform.AMAZON
        ? { amazon_user_id }
        : {}),
    };

    const tokenObject = await this.request.getToken();

    return this.request.authenticatedPost(
      API.validateReceipt(String(platform)),
      qs.stringify(body),
      {
        headers: {
          Authorization: `Bearer ${tokenObject.token}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );
  }
}

export default Payment;
