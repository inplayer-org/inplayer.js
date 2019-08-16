import qs from 'qs';
import { authenticatedApi } from '../Utils/http';
import { VoucherDiscountPrice, VoucherDiscountPriceData } from '../Interfaces/IVoucher&Promotion';

const VOUCHER_DISCOUNT_PATH = '/vouchers/discount';

/**
 * Contains all Requests regarding vouchers.
 *
 * @class Voucher
 */
class Voucher {
  config: any;
  Account: any;
  constructor(config: any, Account: any) {
    this.config = config;
    this.Account = Account;
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

    return authenticatedApi.post(`${VOUCHER_DISCOUNT_PATH}`, qs.stringify(body), {
      headers: {
        Authorization: `Bearer ${this.Account.getToken().token}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
  }
}

export default Voucher;
