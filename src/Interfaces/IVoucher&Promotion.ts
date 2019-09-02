import { CommonResponse, AdvanceError } from './CommonInterfaces';

export interface VoucherData {
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

export interface CreateVoucherCode extends VoucherData { }

export interface CreateVoucherCodeError extends CommonResponse { }

export interface CreateVoucherCodeError422 extends AdvanceError { }

export interface GetVouchers {
    collection: VoucherData[];
    total: number;
    page: number;
    offset: number;
    limit: number;
}

export interface GetVouchersError extends CommonResponse { }

export interface GetVoucherDetails extends VoucherData { }

export interface GetVoucherDetailsError extends CommonResponse { }

export interface UpdateVoucher extends VoucherData { }

export interface UpdateVoucherError extends CommonResponse { }

export interface UpdateVoucherError422 extends AdvanceError { }

// TODO: No 200 response for DeleteVoucher

export interface DeleteVoucherError extends CommonResponse { }

export interface VoucherDiscountPrice {
    amount: number;
}

export interface VoucherDiscountPriceError extends CommonResponse { }

export interface VoucherDiscountPriceData {
    accessFeeId: number;
    voucherCode: string;
}

export interface DiscountData {
  voucherCode: string;
  accessFeeId: number;
}

export interface Voucher {
  getDiscount(data: DiscountData): object;
}
