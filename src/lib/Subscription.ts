import qs from 'qs';
import { authenticatedApi } from '../Utils/http';
import {
  CreateSubscriptionData, CreateSubscriptionBody, CancelSubscriptionData, SubscriptionFromUserData,
} from '../Interfaces/IPaymant&Subscription';

const SUBSCRIPTIONS_PATH = '/subscriptions';
const SUBSCRIPTION_PATH = '/subscriptions/reporting/subscriptions/';


/**
 * Contains all Requests connected with subscriptions
 *
 * @class Subscription
 */
class Subscription {
  config: any;
  Account: any;
  constructor(config: any, Account: any) {
    this.config = config;
    this.Account = Account;
  }
  /**
   * Gets all subscriptions for a given user
   * @method getSubscriptions
   * @async
   * @example
   *     InPlayer.Subscription
   *     .getSubscriptions('/subscriptions?limit=15&page=0')
   *     .then(data => console.log(data));
   * @return {Object}
   */
  async getSubscriptions() {
    const body = {
      page: 0,
      limit: 15,
    };

    return authenticatedApi.get(`${SUBSCRIPTIONS_PATH}?limit=${body.limit}&page=${body.page}`,
      {
        headers: {
          Authorization: `Bearer ${this.Account.getToken().token}`,
        },
      });
  }

  /**
   * Get subscription details for a given user by id
   *
   * @method getSubscription
   * @async
   * @param {Object} data {
   *  userId: string
   * }
   * @example
   *     InPlayer.Subscription
   *     .getSubscription('abcdef')
   *     .then(data => console.log(data));
   * @return {Object}
   */
  async getSubscription(data: SubscriptionFromUserData) {
    const body = {
      id: data.userId,
    };

    return authenticatedApi.get(`${SUBSCRIPTION_PATH}/${body.id}`, {
      headers: {
        Authorization: `Bearer ${this.Account.getToken().token}`,
      },
    });
  }

  /**
   * Cancels a subscription
   * @method cancelSubscription
   * @async
   * @param {Object} data {
   *  unsubscribeUrl: string
   * }
   * @example
   *     InPlayer.Subscription
   *     .cancelSubscription('abcdef')
   *     .then(data => console.log(data));
   * @return {Object}
   */
  async cancelSubscription(data: CancelSubscriptionData) {
    const body = {
      unsubscribe_url: data.unsubscribeUrl,
    };

    return authenticatedApi.get(`${body.unsubscribe_url}`,
      {
        headers: {
          Authorization: `Bearer ${this.Account.getToken().token}`,
        },
      });
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
   * @return {Object}
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

    return authenticatedApi.post(SUBSCRIPTIONS_PATH, qs.stringify(body), {
      headers: {
        Authorization: `Bearer ${this.Account.getToken().token}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
  }
}

export default Subscription;
