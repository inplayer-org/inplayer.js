import qs from 'qs';
import {
  CreateSubscriptionData,
  CreateSubscriptionRequestBody,
} from '../models/IPayment&Subscription';
import { ApiConfig, Request } from '../models/Config';
import BaseExtend from '../extends/base';
import { API } from '../constants';

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
   * @param {number} page - The current page
   * @param {number} limit - The number of items per page
   * @param {string} status - The subscription status

   * @example
   *     InPlayer.Subscription
   *     .getSubscriptions()
   *     .then(data => console.log(data));
   * @returns  {AxiosResponse<GetSubscription>}
   */
  async getSubscriptions(page = 0, limit = 15, status = '') {
    return this.request.authenticatedGet(API.getSubscriptions(limit, page, status), {
      headers: {
        Authorization: `Bearer ${this.request.getToken().token}`,
      },
    });
  }

  /**
   * Get subscription details for a given user by id
   *
   * @method getSubscription
   * @async
   *
   * @param {number} id - The subscription id
   * @example
   *     InPlayer.Subscription
   *     .getSubscription('abcdef')
   *     .then(data => console.log(data));
   * @returns  {AxiosResponse<SubscriptionDetails>}
   */
  async getSubscription(id: number) {
    return this.request.authenticatedGet(API.getSubscription(id), {
      headers: {
        Authorization: `Bearer ${this.request.getToken().token}`,
      },
    });
  }

  /**
   * Cancels a subscription
   * @method cancelSubscription
   * @async
   * @param {string} unsubscribeUrl - The url for the subscription which is getting unsubscribed
   * @example
   *     InPlayer.Subscription
   *     .cancelSubscription('abcdef')
   *     .then(data => console.log(data));
   * @returns  {AxiosResponse<CancelSubscription>}
   */
  async cancelSubscription(unsubscribeUrl: string) {
    return this.request.authenticatedGet(
      API.cancelSubscription(unsubscribeUrl),
      {
        headers: {
          Authorization: `Bearer ${this.request.getToken().token}`,
        },
      },
    );
  }

  /**
   * Subscribes to a given asset. Use this method ONLY if the accessFee.type === 'subscription'.
   * Otherwise please use InPlayer.Payment.createPayment()
   * @method createSubscription
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
   *  returnUrl?: string
   * }
   * @example
   *     InPlayer.Subscription
   *     .createSubscription({
   *          number: 1,
   *          cardName: 'Payoneer',
   *          expMonth: 11,
   *          expYear: 12,
   *          cvv: 546,
   *          accessFee: 13.4,
   *          paymentMethod: 'card',
   *          referrer: 'http://localhost:3000',
   *          voucherCode: '123123125914i2erjfg',
   *          brandingId?: 1234,
   *          returnUrl?: 'https://event.inplayer.com/staging',
   *        }
   *     )
   *     .then(data => console.log(data));
   * @returns  {AxiosResponse<CreateSubscription>}
   */
  async createSubscription(data: CreateSubscriptionData) {
    const body: CreateSubscriptionRequestBody = {
      number: data.number,
      card_name: data.cardName,
      exp_month: data.expMonth,
      exp_year: data.expYear,
      cvv: data.cvv,
      access_fee: data.accessFee,
      payment_method: data.paymentMethod,
      referrer: data.referrer,
      branding_id: data.brandingId,
      return_url: data.returnUrl,
    };

    if (data.voucherCode) {
      body.voucher_code = data.voucherCode;
    }

    if (data.isGift) {
      body.is_gift = data.isGift;
      body.receiver_email = data.receiverEmail;
    }

    return this.request.authenticatedPost(
      API.subscribe,
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

export default Subscription;
