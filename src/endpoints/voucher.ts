import qs from 'qs';
import { VoucherDiscountPriceData } from '../models/IVoucher&Promotion';
import { ApiConfig, Request } from '../models/CommonInterfaces';
import BaseExtend from '../extends/base';
import { API } from '../constants';

/**
 * Contains all Requests regarding vouchers.
 *
 * @class Voucher
 */
class Voucher extends BaseExtend {
  constructor(config: ApiConfig, request: Request) {
    super(config, request);
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
   * @returns {AxiosResponse<VoucherDiscountPrice>}
   */
  async getDiscount(data: VoucherDiscountPriceData) {
    const body = {
      access_fee_id: data.accessFeeId,
      voucher_code: data.voucherCode,
    };

    return this.request.authenticatedPost(API.getDiscount, qs.stringify(body), {
      headers: {
        Authorization: `Bearer ${this.request.getToken().token}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
  }
}

export default Voucher;
