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

export interface CancelPayPalSubscription {
  code: number;
  subscription_id: string;
  message: string;
}

export interface CreatePayment {
  message: string;
}

export interface Country {
  name: string;
  value: number;
}

export interface AssetCountry {
  item_id: number;
  countries: Country[];
  total: number;
}

export interface GetNumberOfPaymentPerAssetPerCountry {
  collection: AssetCountry[];
}

export interface GetNumberOfPaymentPerAssetPerCountryError
  extends CommonResponse {}

export interface AssetValue {
  timestamp: number;
  value: number;
}

export interface Asset {
  item_id: number;
  values: AssetValue[];
  total: number;
}

export interface GetNumberOfPaymentPerAsset {
  collection: Asset[];
}

export interface MerchantActivePaymentMethod {
  id: number;
  method_name: string;
  is_external: boolean;
  active: boolean;
  account_id: number;
  provider_name: string;
}

export interface MerchantPaymentMethod {
  id: number;
  method_name: string;
  is_external: boolean;
}

export interface PaymentMethod {
  id: number;
  name: string;
}

export interface Provider {
  id: number;
  name: string;
  payment_method: PaymentMethod;
  external: boolean;
  current: boolean;
  active: boolean;
}

export interface PaymentMethods {
  id: number;
  name: string;
  metadata: any[];
  providers: Provider;
}

export interface MerchantPaymentProviders {
  payment_methods: PaymentMethods;
  bank_statement: string;
  string_connect: boolean;
}

export interface CreateBankStatementDescriptor {
  id: number;
  message: string;
}

export interface DeleteBankStatementDescriptor {
  id: number;
  message: string;
}

export interface CountryValue {
  amount: number;
  currency_iso: string;
  formatted_amount: string;
}

export interface RevenueCountryDetails {
  name: string;
  value: CountryValue[];
}

export interface RevenuePerAssetPerCountry {
  item_id: number;
  countries: RevenueCountryDetails[];
}

export interface GetRevenuePerAssetPerCountry {
  collection: RevenuePerAssetPerCountry[];
}

export interface RevenueAssetDetails {
  timestamp: number;
  values: Country[];
}

export interface RevenuePerAsset {
  item_id: number;
  values: RevenueAssetDetails[];
}

export interface GetRevenuePerAsset {
  collection: RevenuePerAsset[];
}

export interface StripeConnectRequest {
  code: number;
  message: string;
}

export interface StripeConnect {
  code: number;
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

export interface CreateSubscription {
  message: string;
}

export interface CancelSubscription {
  code: number;
  subscription: string;
  operation: string;
  description: string;
  status: string;
  timestamp: number;
}

// --------------------------------------V2--------------------------------------

export interface ValidateAmazonReceipt {
  code: number;
  message: string;
}

export interface ValidateAppleReceipt {
  code: number;
  message: string;
}

export interface ValidateGooglePlayReceipt {
  code: number;
  message: string;
}

export interface CancelGooglePlaySubscription {
  code: number;
  message: string;
}

export interface ValidateRokuReceipt {
  code: number;
  message: string;
}

export interface CreateCharge {
  code: number;
  message: string;
}

export interface Card {
  number: number;
  card_name: string;
  exp_month: number;
  exp_year: number;
}

export interface GetDefaultCard {
  cards: Card[];
}

export interface SetDefaultCardPerCurrency {
  account: Card;
}

export interface TypeData {
  bank_code: number;
  branch_code: number;
  country: string;
  fingerprint: string;
  last4: number;
  mandate_reference: string;
  mandate_url: string;
}

export interface Mandate {
  id: string;
  currency: string;
  created: number;
  client_secret: string;
  owner: string;
  full_nme: string;
  statement_descriptor: string;
  status: string;
  type_data: TypeData;
}

export interface GetMandate {
  is_approved: boolean;
  statement_descriptor: string;
  mandate: Mandate;
}

export interface SetPaymentProviderMetadata {
  code: number;
  message: string;
  metadata: Record<string, string>[];
}

export interface Metadata {
  id: number;
  name: string;
  value: string;
}

export interface GetPaymentProviderMetadata {
  code: number;
  message: string;
  metadata: Metadata;
}

export interface CreatePaymentData {
  number: number;
  cardName: string;
  expMonth: string;
  expYear: number;
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
  exp_year: number;
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
  expYear: number;
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
  exp_year: number;
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

export interface PaypalParamsData {
  origin: string;
  accessFeeId: number;
  paymentMethod: number;
  voucherCode: string;
  brandingId?: number;
}

export interface CreateSubscriptionData {
  number: number;
  cardName: string;
  expMonth: string;
  expYear: string;
  cvv: number;
  accessFee: number;
  paymentMethod: string;
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
  payment_method: string;
  referrer: string;
  voucher_code?: string;
  branding_id?: number;
  return_url: string;
  receiver_email?: string;
  is_gift?: boolean;
}

export interface SetDefaultCardPerCurrencyData {
  cardNumber: string;
  cardName: string;
  cvc: number;
  expMonth: number;
  expYear: number;
  currency: string;
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
  exp_month: number;
  exp_year: number;
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

interface AmazonPlatformData {
  platform: ReceiptValidationPlatform.AMAZON;
  amazonUserId: string;
}

interface NonAmazonPlatformData {
  platform: Exclude<ReceiptValidationPlatform, ReceiptValidationPlatform.AMAZON>;
  amazonUserId?: never;
}

type CommonPlatformData = AmazonPlatformData | NonAmazonPlatformData;

interface ReceiptDataWithProductName {
  receipt: string;
  productName: string;
  itemId?: never;
  accessFeeId?: never;
}

interface ReceiptDataWithItemIdAndAccessFeeId {
  receipt: string;
  itemId: number;
  accessFeeId: number;
  productName?: never;
}

type ReceiptData =
  | ReceiptDataWithProductName
  | ReceiptDataWithItemIdAndAccessFeeId;

export type ValidateReceiptData = CommonPlatformData & ReceiptData;

export interface Payment extends BaseExtend {
  getPaymentMethods(): Promise<AxiosResponse<MerchantPaymentMethod[]>>;
  getPaymentTools(paymentMethodId: number): Promise<AxiosResponse<any>>;
  createPayment(data: CreatePaymentData): Promise<AxiosResponse<CreatePayment>>;
  confirmPayment(
    paymentIntentId: string
  ): Promise<AxiosResponse<CreatePayment>>;
  confirmDonationPayment(
    data: ConfirmDonationPaymentData
  ): Promise<AxiosResponse<CreatePayment>>;
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

export interface Subscription extends BaseExtend {
  getSubscriptions(
    page?: number,
    limit?: number
  ): Promise<AxiosResponse<GetSubscription>>;
  getSubscription(id: number): Promise<AxiosResponse<SubscriptionDetails>>;
  cancelSubscription(
    unsubscribeUrl: string
  ): Promise<AxiosResponse<CancelSubscription>>;
  createSubscription(
    data: CreateSubscriptionData
  ): Promise<AxiosResponse<CreateSubscription>>;
}
