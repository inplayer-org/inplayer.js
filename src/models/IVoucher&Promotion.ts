import { AxiosResponse } from 'axios';
import { BaseExtend } from './CommonInterfaces';

export interface DiscountData {
  voucherCode: string;
  accessFeeId?: number;
  itemId?: number;
}

export interface DiscountBodyData {
  voucher_code: string;
  access_fee_id?: number;
  item_id?: number;
}

export interface VoucherDiscountPrice {
  amount: number;
  discount_duration: number;
}

export interface Voucher extends BaseExtend {
  getDiscount({
    voucherCode,
    accessFeeId,
    itemId,
  }: DiscountData): Promise<AxiosResponse<VoucherDiscountPrice>>;
}
