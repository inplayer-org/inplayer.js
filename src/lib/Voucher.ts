import qs from 'qs';
import { authenticatedApi, getToken } from '../Utils/http';
import { VoucherDiscountPriceData } from '../Interfaces/IVoucher&Promotion';
import { Account } from '../Interfaces/IAccount&Authentication';
import { ApiConfig } from '../Interfaces/CommonInterfaces';

/**
 * Contains all Requests regarding vouchers.
 *
 * @class Voucher
 */
class Voucher {
  config: ApiConfig;
  Account: Account;
  constructor(config: ApiConfig, account: Account) {
    this.config = config;
    this.Account = account;
  }

  /**
   * Gets the discount for a given code.
   * @method getDiscount
   * @async
   * @param {Object} data - {
   *   accessFeeId: number,
   *   voucherCode: string
   * }
   * @example
   *     InPlayer.Voucher
   *     .getDiscount('/vouchers/discount', {
   *        accessFeeId: 134,
   *        voucherCode: 'FOOrGmv60pT'
   *     })
   *     .then(data => console.log(data));
   * @return {VoucherDiscountPrice}
   */
  async getDiscount(data: VoucherDiscountPriceData) {
    const body = {
      access_fee_id: data.accessFeeId,
      voucher_code: data.voucherCode,
    };

    return authenticatedApi.post(this.config.API.getDiscount, qs.stringify(body), {
      headers: {
        Authorization: `Bearer ${getToken().token}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
  }
}

export default Voucher;
