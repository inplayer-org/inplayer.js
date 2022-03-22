import { AxiosResponse } from 'axios';
import { BaseExtend, CommonResponse } from './CommonInterfaces';

export interface CancelSubscription {
    code: number;
    subscription: string;
    operation: string;
    description: string;
    status: string;
    timestamp: number;
}

export interface SubscriptionDetails {
    cancel_token: string;
    status: string;
    description: string;
    asset_title: string;
    asset_id: number;
    formatted_amount: string;
    amount: number;
    currency: string;
    merchant_id: number;
    created_at: number;
    updated_at: number;
    next_billing_date: number;
    unsubscribe_url: string;
}

export interface GetSubscription {
    total: number;
    page: number;
    offset: number;
    limit: number;
    collection: SubscriptionDetails[];
}

// --------------------------------------V2--------------------------------------
export interface IdealPaymentData {
    accessFeeId: number;
    bank: string;
    returnUrl: string;
    referrer: string;
    brandingId?: number;
    voucherCode?: string;
}

export interface DirectDebitData {
    accessFeeId: number;
    assetId: number;
    voucherCode: string;
    brandingId?: number;
    referrer: string;
  }

export interface CreateSubscriptionData {
    number: number;
    cardName: string;
    expMonth: string;
    expYear: string;
    cvv: number;
    accessFee: number;
    paymentMethod: number;
    referrer: string;
    voucherCode?: string;
    brandingId?: number;
    returnUrl: string;
}

export interface CreateSubscriptionRequestBody {
    number: number;
    card_name: string;
    exp_month: string;
    exp_year: string;
    cvv: number;
    access_fee: number;
    payment_method: number;
    referrer: string;
    voucher_code?: string;
    branding_id?: number;
    return_url: string;
    receiver_email?: string;
    is_gift?: boolean;
}

export interface ChangeSubscriptionPlanRequestBody {
    access_fee_id: number;
    inplayer_token: string;
}

export interface IdealPaymentRequestBody {
    payment_method: 'ideal';
    access_fee_id: number;
    bank: string;
    return_url: string;
    referrer: string;
    branding_id?: number;
    voucher_code?: string;
}

export interface Card {
    number: number;
    card_name: string;
    exp_month: string;
    exp_year: string;
}

export interface GetDefaultCard {
    cards: Card[];
}

export interface SetDefaultCard {
    number: number;
    card_name: string;
    exp_month: string;
    exp_year: string;
}

export interface SetDefaultCardPerCurrencyData {
  cardNumber: string;
  cardName: string;
  cvc: number;
  expMonth: string;
  expYear: string;
  currency: string;
}

export interface ChangeSubscriptionPlanResponse {
  message: string;
}

export interface Subscription extends BaseExtend {
    getSubscriptions(
        page?: number,
        limit?: number
    ): Promise<AxiosResponse<GetSubscription>>;
    getSubscription(id: string): Promise<AxiosResponse<SubscriptionDetails>>;
    cancelSubscription(
        unsubscribeUrl: string
    ): Promise<AxiosResponse<CancelSubscription>>;
    createSubscription(
        data: CreateSubscriptionData
    ): Promise<AxiosResponse<CommonResponse>>;
    changeSubscriptionPlan(
        data: ChangeSubscriptionPlanRequestBody
    ): Promise<AxiosResponse<ChangeSubscriptionPlanResponse>>;
    directDebitSubscribe: (
        data: DirectDebitData
      ) => Promise<AxiosResponse<CommonResponse>>;
    idealSubscribe: (
        data: IdealPaymentData
      ) => Promise<AxiosResponse<CommonResponse>>;
}
