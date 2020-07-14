import { AxiosResponse } from 'axios';
import { BaseExtend } from './CommonInterfaces';

export interface VoucherInfo {
  id: number;
  name: string;
  discount: number;
  start_date: string;
  end_date: string;
  code: string;
  length: number;
  prefix: string;
  suffix: string;
  usage_limit: number;
  discount_period: string;
  discount_duration: number;
}

export interface GetVouchers {
  collection: VoucherInfo[];
  total: number;
  page: number;
  offset: number;
  limit: number;
}

export interface VoucherDiscountPrice {
  amount: number;
}

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

export interface Voucher extends BaseExtend {
  getDiscount(data: DiscountData): Promise<AxiosResponse<VoucherDiscountPrice>>;
}
