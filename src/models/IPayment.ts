import { AxiosResponse } from 'axios';
import { CommonResponse, BaseExtend } from './CommonInterfaces';

export interface GeneratePayPalParameters {
  endpoint: string;
  business: string;
  item_name: string;
  currency_code: string;
  return: string;
  cancel_return: string;
}

export interface AssetValue {
  timestamp: number;
  value: number;
}

export interface Asset {
  item_id: number;
  values: AssetValue[];
  total: number;
}

export interface MerchantPaymentMethod {
  id: number;
  method_name: string;
  is_external: boolean;
}

// --------------------------------------V2--------------------------------------
export interface Card {
  number: number;
  card_name: string;
  exp_month: string;
  exp_year: string;
}

export interface GetDefaultCard {
  cards: Card[];
}

export interface SetDefaultCardPerCurrencyData {
  cardNumber: string;
  cardName: string;
  cvc: number;
  expMonth: number;
  expYear: number;
  currency: string;
}

export interface CreatePaymentData {
  number: number;
  cardName: string;
  expMonth: string;
  expYear: string;
  cvv: number;
  accessFee: number;
  paymentMethod: number;
  referrer: string;
  voucherCode: string;
  brandingId: number;
  returnUrl: string;
  receiverEmail?: string;
  isGift?: boolean;
}

export interface CreatePaymentRequestBody {
  number: number;
  card_name: string;
  exp_month: string;
  exp_year: string;
  cvv: number;
  access_fee: number;
  payment_method: number;
  referrer: string;
  voucher_code?: string;
  branding_id: number;
  return_url: string;
  receiver_email?: string;
  is_gift?: boolean;
}

export interface CreateDonationPaymentData {
  number: number;
  cardName: string;
  expMonth: string;
  expYear: string;
  cvv: number;
  paymentMethod: string;
  referrer: string;
  brandingId: number;
  returnUrl: string;
  amount: number;
  currency: string;
  assetId: number;
  donationId?: number;
}

export interface CreateDonationPaymentRequestBody {
  number: number;
  card_name: string;
  exp_month: string;
  exp_year: string;
  cvv: number;
  payment_method: string;
  referrer: string;
  branding_id: number;
  return_url: string;
  item_id: number;
  amount: number;
  donation_id?: number;
  currency_iso: string;
}

export interface ConfirmDonationPaymentData {
  paymentIntentId: string;
  brandingId: number;
  paymentMethod: string;
  donationId?: number;
}

export interface ConfirmDonationPaymentRequestBody {
  pi_id: string;
  branding_id: number;
  payment_method: string;
  donation_id?: number;
}

export interface CreateDirectDebitMandateData {
  name: string;
  iban: string;
}

export interface DirectDebitData {
  accessFeeId: number;
  assetId: number;
  voucherCode: string;
  brandingId?: number;
  referrer: string;
}

export interface PayPalParamsData {
  origin: string;
  accessFeeId: number;
  paymentMethod: number;
  voucherCode: string;
  brandingId?: number;
}

export interface DefaultCreditCardData {
  cardNumber: string;
  cardName: string;
  cvc: number;
  expMonth: number;
  expYear: number;
  currency: string;
}

export interface DirectDebitMandateResponse {
  is_approved: boolean;
  statement_descriptor: string;
  mandate: {
    bank_code: number;
    branch_code: number;
    country: string;
    fingerprint: string;
    last4: number;
    mandate_reference: string;
    mandate_url: string;
  };
}

export interface CreateDirectDebitResponse {
  id: string;
  currency: string;
  created: number;
  client_secret: string;
  owner: string;
  full_name: string;
  statement_descriptor: string;
  status: string;
  type_data: {
    bank_code: number;
    branch_code: number;
    country: string;
    fingerprint: string;
    last4: number;
    mandate_reference: string;
    mandate_url: string;
  };
}

export interface DirectDebitMandateData {
  name: string;
  iban: string;
}

export interface PurchaseDetails {
  consumer_email: string;
  created_at: number;
  customer_id: number;
  expires_at: number;
  is_trial: boolean;
  item_access_id: number;
  item_id: number;
  item_title: string;
  merchant_id: number;
  parent_resource_id: string;
  payment_method: string;
  payment_tool: string;
  purchase_access_fee_description: string;
  purchased_access_fee_id: number;
  purchased_access_fee_type: string;
  purchased_amount: number;
  purchased_currency: string;
  revoked: number;
  starts_at: number;
  type: string;
}

export interface PurchaseHistoryCollection {
  purchaseDetails: PurchaseDetails;
  total: number;
}

export interface SetDefaultCard {
  number: number;
  card_name: string;
  exp_month: string;
  exp_year: string;
}

export interface IdealPaymentData {
  accessFeeId: number;
  bank: string;
  returnUrl: string;
  referrer: string;
  brandingId?: number;
  voucherCode?: string;
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

export enum StripePaymentMethods {
  APPLE_PAY_ON_WEB = 'apple pay on web',
  GOOGLE_PAY_ON_WEB = 'google pay on web',
}

export interface GoogleOrApplePaymentData {
  accessFeeId: number;
  referrer: string;
  brandingId: number;
  voucherCode?: string;
}

export interface GoogleOrApplePaymentRequestBody<T extends StripePaymentMethods> {
  payment_method: T;
  access_fee_id: number;
  voucher_code?: string;
  branding_id: number;
  referrer: string;
}

export enum ReceiptValidationPlatform {
  AMAZON = 'amazon',
  APPLE = 'apple',
  GOOGLE_PLAY = 'google-play',
  ROKU = 'roku',
}

export interface AmazonPlatformData {
  platform: ReceiptValidationPlatform.AMAZON;
  amazonUserId: string;
}

export interface NonAmazonPlatformData {
  platform: Exclude<ReceiptValidationPlatform, ReceiptValidationPlatform.AMAZON>;
  amazonUserId?: never;
}

export type CommonPlatformData = AmazonPlatformData | NonAmazonPlatformData;

export interface ReceiptDataWithProductName {
  receipt: string;
  productName: string;
  itemId?: never;
  accessFeeId?: never;
}

export interface ReceiptDataWithItemIdAndAccessFeeId {
  receipt: string;
  itemId: number;
  accessFeeId: number;
  productName?: never;
}

export type ReceiptData =
  | ReceiptDataWithProductName
  | ReceiptDataWithItemIdAndAccessFeeId;

export type ValidateReceiptData = CommonPlatformData & ReceiptData;

export interface Payment extends BaseExtend {
  getPaymentMethods(): Promise<AxiosResponse<MerchantPaymentMethod[]>>;
  createPayment(data: CreatePaymentData): Promise<AxiosResponse<CommonResponse>>;
  confirmPayment(
    paymentIntentId: string
  ): Promise<AxiosResponse<CommonResponse>>;
  confirmDonationPayment(
    data: ConfirmDonationPaymentData
  ): Promise<AxiosResponse<CommonResponse>>;
  getPayPalParams(
    data: PayPalParamsData
  ): Promise<AxiosResponse<GeneratePayPalParameters>>;
  getPurchaseHistory(
    status: string,
    page: number,
    limit: number
  ): Promise<AxiosResponse<PurchaseHistoryCollection[]>>;
  getDefaultCreditCard(): Promise<AxiosResponse<GetDefaultCard>>;
  setDefaultCreditCard(
    data: DefaultCreditCardData
  ): Promise<AxiosResponse<SetDefaultCard>>;
  getDirectDebitMandate: () => Promise<
    AxiosResponse<DirectDebitMandateResponse>
  >;
  createDirectDebitMandate: (
    data: DirectDebitMandateData
  ) => Promise<AxiosResponse<CreateDirectDebitResponse>>;
  directDebitCharge: (
    data: DirectDebitData
  ) => Promise<AxiosResponse<CommonResponse>>;
  directDebitSubscribe: (
    data: DirectDebitData
  ) => Promise<AxiosResponse<CommonResponse>>;
  idealPayment: (
    data: IdealPaymentData
  ) => Promise<AxiosResponse<CommonResponse>>;
  idealSubscribe: (
    data: IdealPaymentData
  ) => Promise<AxiosResponse<CommonResponse>>;
  validateReceipt: (
    data: ValidateReceiptData
  ) => Promise<AxiosResponse<CommonResponse>>;
}
