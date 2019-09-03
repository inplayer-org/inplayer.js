import qs from 'qs';
import { AxiosResponse } from 'axios';
import { authenticatedApi, getToken } from '../Utils/http';
import {
  CreateSubscriptionData,
  CreateSubscriptionBody,
} from '../Interfaces/IPayment&Subscription';
import { ApiConfig } from '../Interfaces/CommonInterfaces';
import { Account } from '../Interfaces/IAccount&Authentication';

/**
 * Contains all Requests connected with subscriptions
 *
 * @class Subscription
 */
class Subscription {
  config: ApiConfig;
  Account: Account;
  constructor(config: ApiConfig, account: Account) {
    this.config = config;
    this.Account = account;
  }
  /**
   * Gets all subscriptions for a given user
   * @method getSubscriptions
   * @async
   * @param {number} page - The current page
   * @param {number} limit - The number of items per page
   * @example
   *     InPlayer.Subscription
   *     .getSubscriptions()
   *     .then(data => console.log(data));
   * @return {AxiosResponse<GetSubscription>}
   */
  async getSubscriptions(page = 0, limit = 15) {
    return authenticatedApi.get(this.config.API.getSubscriptions(limit, page), {
      headers: {
        Authorization: `Bearer ${getToken().token}`,
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
   * @return {AxiosResponse<SubscriptionDetails>}
   */
  async getSubscription(id: number) {
    return authenticatedApi.get(this.config.API.getSubscription(id), {
      headers: {
        Authorization: `Bearer ${getToken().token}`,
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
   * @return {AxiosResponse<CancelSubscription>}
   */
  async cancelSubscription(unsubscribeUrl: string) {
    return authenticatedApi.get(
      this.config.API.cancelSubscription(unsubscribeUrl),
      {
        headers: {
          Authorization: `Bearer ${getToken().token}`,
        },
      },
    );
  }

  /**
   * Subscribes to a given asset. Use this method ONLY if the accessFee.type === 'subscription'.
   * Otherwise please use InPlayer.Payment.payForAsset()
   * @method create
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
   * @return {AxiosResponse<CreateSubscription>}
   */
  async create(data: CreateSubscriptionData) {
    const body: CreateSubscriptionBody = {
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

    return authenticatedApi.post(
      this.config.API.subscribe,
      qs.stringify(body),
      {
        headers: {
          Authorization: `Bearer ${getToken().token}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );
  }
}

export default Subscription;
