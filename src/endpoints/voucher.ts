/**
 * @module Voucher
 */
import qs from 'qs';
import { AxiosResponse } from 'axios';
import { DiscountBodyData, VoucherDiscountPrice } from '../models/IVoucher&Promotion';
import { ApiConfig, Request } from '../models/Config';
import BaseExtend from '../extends/base';
import { API } from '../constants';
/**
 * Contains all Requests regarding vouchers.
 *
 * @class Voucher
 */
export class Voucher extends BaseExtend {
  constructor(config: ApiConfig, request: Request) {
    super(config, request);
  }

  /**
   * Gets a discount on the selected price for a given code.
   * @method getDiscount
   * @async
   * @param {string} voucherCode The voucher's promotional code.
   * Grants the customers the privilege of using a discount.
   * @param {number} accessFeeId The id of created access fee for given premium content.
   * @param {number} itemId The id of created premium content in InPlayer Dashboard (i.e asset id or package id).
   * @example
   *     InPlayer.Voucher
   *     .getDiscount({
   *        voucherCode: 'FOOrGmv60pT'
   *        accessFeeId: 134,
   *     })
   *     .then(data => console.log(data));
   * @returns {AxiosResponse<VoucherDiscountPrice>} Contains the data:
   * ```typescript
   * {
   *    amount: number;
   * }
   * ```
   */
  // object types must be anonymous(don't use interface or type alias)
  // in order to data params description to be shown in typedoc
  async getDiscount({
    voucherCode,
    accessFeeId,
    itemId,
  }: {
    voucherCode: string,
    accessFeeId?: number,
    itemId?: number
  }): Promise<AxiosResponse<VoucherDiscountPrice>> {
    const body: DiscountBodyData = {
      voucher_code: voucherCode,
    };

    if (accessFeeId) {
      body.access_fee_id = accessFeeId;
    }

    if (itemId) {
      body.item_id = itemId;
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
