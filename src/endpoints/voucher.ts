import qs from 'qs';
import { DiscountData, DiscountBodyData } from '../models/IVoucher&Promotion';
import { ApiConfig, Request } from '../models/Config';
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
   *   voucherCode: string
   *   accessFeeId?: number,
   *   itemId?: number,
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
  async getDiscount(data: DiscountData) {
    const body: DiscountBodyData = {
      voucher_code: data.voucherCode,
    };

    if (data.accessFeeId) {
      body.access_fee_id = data.accessFeeId;
    }

    if (data.itemId) {
      body.item_id = data.itemId;
    }

    const tokenObject = await this.request.getToken();

    return this.request.authenticatedPost(API.getDiscount, qs.stringify(body), {
      headers: {
        Authorization: `Bearer ${tokenObject.token}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
  }
}

export default Voucher;
