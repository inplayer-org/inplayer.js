import qs from 'qs';
import { AxiosResponse } from 'axios';
import {
  CancelSubscription,
  CreateSubscriptionRequestBody,
  GetSubscription,
  SubscriptionDetails,
  IdealPaymentRequestBody,
  GetDefaultCard,
  SetDefaultCard,
  ChangeSubscriptionPlanRequestBody,
} from '../models/ISubscription';
import { CommonResponse } from '../models/CommonInterfaces';
import { ApiConfig, Request } from '../models/Config';
import BaseExtend from '../extends/base';
import { API } from '../constants';
import { buildURLwithQueryParams } from '../helpers';

/**
 * Contains all Requests connected with subscriptions
 *
 * @class Subscription
 */
class Subscription extends BaseExtend {
  constructor(config: ApiConfig, request: Request) {
    super(config, request);
  }
  /**
   * Gets all subscriptions for a given user
   * @method getSubscriptions
   * @async
   * @param {number} page The current page number.
   * If it is not set the starting page will be returned.
   * @param {number} limit The number of items per page.
   * If it is not set the number of items per page will be 15.
   * @param {string} status The subscription status.
   * It it is not set the regular active subscriptions will be returned.

   * @example
   *     InPlayer.Subscription
   *     .getSubscriptions()
   *     .then(data => console.log(data));
   * @returns  {AxiosResponse<GetSubscription>} Contains the data:
   * ```typescript
   * {
   *    total: number;
   *    page: number;
   *    offset: number;
   *    limit: number;
   *    collection: [{
   *      cancel_token: string;
   *      status: string;
   *      description: string;
   *      asset_title: string;
   *      asset_id: number;
   *      formatted_amount: string;
   *      amount: number;
   *      currency: string;
   *      merchant_id: number;
   *      created_at: number;
   *      updated_at: number;
   *      next_billing_date: number;
   *      unsubscribe_url: string;
   *    }];
   * }
   * ```
   */
  async getSubscriptions(page = 0, limit = 15, status = ''): Promise<AxiosResponse<GetSubscription>> {
    const tokenObject = await this.request.getToken();

    return this.request.authenticatedGet(
      API.getSubscriptions(limit, page, status),
      {
        headers: {
          Authorization: `Bearer ${tokenObject.token}`,
        },
      },
    );
  }

  /**
   * Gets subscription details for a given user by id
   * @method getSubscription
   * @async
   *
   * @param {string} id The subscription id.
   * @example
   *     InPlayer.Subscription
   *     .getSubscription('abcdef')
   *     .then(data => console.log(data));
   * @returns  {AxiosResponse<SubscriptionDetails>} Contains the data:
   * ```typescript
   * {
   *    cancel_token: string;
   *    status: string;
   *    description: string;
   *    asset_title: string;
   *    asset_id: number;
   *    formatted_amount: string;
   *    amount: number;
   *    currency: string;
   *    merchant_id: number;
   *    created_at: number;
   *    updated_at: number;
   *    next_billing_date: number;
   *    unsubscribe_url: string;
   * }
   * ```
   */
  async getSubscription(id: string): Promise<AxiosResponse<SubscriptionDetails>> {
    const tokenObject = await this.request.getToken();

    return this.request.authenticatedGet(API.getSubscription(id), {
      headers: {
        Authorization: `Bearer ${tokenObject.token}`,
      },
    });
  }

  /**
   * Cancels the customer's subscription
   * @method cancelSubscription
   * @async
   * @param {string} unsubscribeUrl The unsubscribe url for the subscription to be canceled
   * @example
   *     InPlayer.Subscription
   *     .cancelSubscription('https://exampleurl/subscriptions/cancel/S-Lir3kiHc9-JD')
   *     .then(data => console.log(data));
   * @returns  {AxiosResponse<CancelSubscription>} Contains the data:
   * ```typescript
   * {
   *    code: number;
   *    subscription: string;
   *    operation: string = "unsubscribe";
   *    description: string;
   *    status: string = "pending";
   *    timestamp: number;
   * }
   * ```
   */
  async cancelSubscription(unsubscribeUrl: string): Promise<AxiosResponse<CancelSubscription>> {
    const tokenObject = await this.request.getToken();

    return this.request.authenticatedGet(
      API.cancelSubscription(unsubscribeUrl),
      {
        headers: {
          Authorization: `Bearer ${tokenObject.token}`,
        },
      },
    );
  }

  /**
   * Subscribes to a given asset. Use this method ONLY if the accessFee.type === 'subscription'.
   * Otherwise please use InPlayer.Payment.createPayment()
   * @method createSubscription
   * @async
   * @param {number} number The card number.
   * @param {string} cardName The cardholder's name.
   * @param {string} expMonth The card expiration month [1...12].
   * @param {string} expYear The card expiration year.
   * @param {number} cvv The card CVV number.
   * @param {number} accessFee The id of created access fee for given premium content.
   * @param {number} paymentMethod Payment method id.
   * @param {string} referrer The URL from which the request has been invoked or the location
   * where the account has been created.
   * @param {string} voucherCode The voucher's promotional code.
   * Grants the customers the privilege of using a discount.
   * @param {number} brandingId The id of created branding theme in InPlayer Dashboard.
   * If it is not set the default branding details will be returned.
   * @param {string} returnUrl The url of payment page.
   * @example
   *     InPlayer.Subscription
   *     .createSubscription({
   *          number: 1,
   *          cardName: 'Payoneer',
   *          expMonth: 11,
   *          expYear: 12,
   *          cvv: 546,
   *          accessFee: 13.4,
   *          paymentMethod: 1,
   *          referrer: 'http://localhost:3000',
   *          voucherCode: '123123125914i2erjfg',
   *          brandingId?: 1234,
   *          returnUrl?: 'https://event.inplayer.com/staging',
   *        }
   *     )
   *     .then(data => console.log(data));
   * @returns  {AxiosResponse<CommonResponse>} Contains the data:
   * ```typescript
   * {
   *    code: 202,
   *    message: "Submitted for payment"
   * }
   * ```
   */
  // object types must be anonymous(don't use interface or type alias)
  // in order to data params description to be shown in typedoc
  async createSubscription({
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
  }: {
    number: number;
    cardName: string;
    expMonth: string;
    expYear: string;
    cvv: number;
    accessFee: number;
    paymentMethod: number;
    referrer: string;
    voucherCode?: string;
    brandingId?: number;
    returnUrl: string;
  }): Promise<AxiosResponse<CommonResponse>> {
    const body: CreateSubscriptionRequestBody = {
      number,
      card_name: cardName,
      exp_month: expMonth,
      exp_year: expYear,
      cvv,
      access_fee: accessFee,
      payment_method: paymentMethod,
      referrer,
      branding_id: brandingId,
      return_url: returnUrl,
    };

    if (voucherCode) {
      body.voucher_code = voucherCode;
    }

    const tokenObject = await this.request.getToken();

    return this.request.authenticatedPost(API.subscribe, qs.stringify(body), {
      headers: {
        Authorization: `Bearer ${tokenObject.token}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
  }

  /**
   * Changes the subscription plan for a given asset.
   * @method post
   * @async
   * @param {Object} data - {
   *  access_fee_id: number,
   *  inplayer_token: number
   * }
   * @example
   *     InPlayer.Subscription
   *     .changeSubscriptionPlan({
   *          access_fee_id: 1,
   *          inplayer_token: S-xxxxx-ST
   *        }
   *     )
   *     .then(data => console.log(data));
   * @return {Object}
   */
  async changeSubscriptionPlan({
    access_fee_id,
    inplayer_token,
  }: {
    access_fee_id: number,
    inplayer_token: string,
   }): Promise<AxiosResponse<CommonResponse>> {
    const body: ChangeSubscriptionPlanRequestBody = {
      access_fee_id,
      inplayer_token,
    };

    const tokenObject = await this.request.getToken();

    return this.request.authenticatedPost(API.subscriptionPlanChange, qs.stringify(body), {
      headers: {
        Authorization: `Bearer ${tokenObject.token}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
  }

  /**
   * Process a request for direct debit subscribe
   * @method directDebitSubscribe
   * @async
   * @param {string} assetId The id of created premium content in InPlayer Dashboard (i.e asset id or package id).
   * @param {string} accessFeeId The id of created access fee for the premium content.
   * @param {string} voucherCode The voucher's promotional code.
   * Grants the customers the privilege of using a discount.
   * @param {number} brandingId The id of created branding theme in InPlayer Dashboard.
   * If it is not set the default branding details will be returned.
   * @param {string} referrer The URL from which the request has been invoked or the location
   * where the account has been created.
   * @example
   *     InPlayer.Subscription
   *     .directDebitSubscribe({ assetId, accessFeeId, voucherCode, brandingId })
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
   * Process a request for start ideal subscribe
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
   *     InPlayer.Subscription
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
   * Gets the default credit card per currency used for subscription rebills
   * @method getDefaultCreditCard
   * @async
   * @example
   *     InPlayer.Payment
   *     .getDefaultCreditCard()
   *     .then(data => console.log(data));
   * @returns  {AxiosResponse<GetDefaultCard>} Contains the data:
   * ```typescript
   * {
   *    cards: [{
   *      number: number;
   *      card_name: string;
   *      exp_month: string;
   *      exp_year: string;
   *    }];
   * }
   * ```
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
}

export default Subscription;
