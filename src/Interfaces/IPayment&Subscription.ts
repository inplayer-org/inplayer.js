import { AxiosResponse } from 'axios';
import { CommonError, AdvanceError } from './CommonInterfaces';

export interface GeneratePayPalParameters {
  endpoint: string;
  business: string;
  item_name: string;
  currency_code: string;
  return: string;
  cancel_return: string;
}

export interface GeneratePayPalParametersError extends CommonError {}

export interface GeneratePayPalParametersError422 extends AdvanceError {}

export interface CancelPayPalSubscription {
  code: number;
  subscription_id: string;
  message: string;
}

export interface CancelPayPalSubscriptionError extends CommonError {}

export interface CreatePayment {
  message: string;
}

export interface CreatePaymentError extends CommonError {}

export interface CreatePaymentError422 extends AdvanceError {}

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
  extends CommonError {}

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

export interface MerchantActivePaymentMethodError extends CommonError {}

export interface MerchantPaymentMethod {
  id: number;
  method_name: string;
  is_external: boolean;
}

export interface MerchantPaymentMethodsError extends CommonError {}

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

export interface MerchantPaymentProvidersError extends CommonError {}

export interface CreateBankStatementDescriptor {
  id: number;
  message: string;
}

export interface CreateBankStatementDescriptorError extends CommonError {}

export interface DeleteBankStatementDescriptor {
  id: number;
  message: string;
}

export interface DeleteBankStatementDescriptorError extends CommonError {}

export interface DeleteBankStatementDescriptorError400 extends AdvanceError {}

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

export interface GetRevenuePerAssetPerCountryError extends CommonError {}

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

export interface GetRevenuePerAssetError extends CommonError {}

export interface StripeConnectRequest {
  code: number;
  message: string;
}

export interface StripeConnectRequestError extends CommonError {}

export interface StripeConnect {
  code: number;
}

export interface StripeConnectError extends CommonError {}

export interface StripeConnectError400 extends AdvanceError {}

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

export interface GetSubscriptionError extends AdvanceError {}

export interface CreateSubscription {
  message: string;
}

export interface CreateSubscriptionError extends CommonError {}

export interface CreateSubscriptionError422 extends AdvanceError {}

export interface CancelSubscription {
  code: number;
  subscription: string;
  operation: string;
  description: string;
  status: string;
  timestamp: number;
}

export interface CancelSubscriptionError extends CommonError {}

export interface CancelSubscriptionError400 extends AdvanceError {}

// --------------------------------------V2--------------------------------------
export interface ValidateAmazonReceipt {
  code: number;
  message: string;
}

export interface ValidateAmazonReceiptError extends CommonError {}

export interface ValidateAmazonReceiptError422 extends AdvanceError {}

export interface ValidateAppleReceipt {
  code: number;
  message: string;
}

export interface ValidateAppleReceiptError extends CommonError {}

export interface ValidateAppleReceiptError422 extends AdvanceError {}

export interface ValidateGooglePlayReceipt {
  code: number;
  message: string;
}

export interface ValidateGooglePlayReceiptError extends CommonError {}

export interface ValidateGooglePlayReceiptError422 extends AdvanceError {}

export interface CancelGooglePlaySubscription {
  code: number;
  message: string;
}

export interface CancelGooglePlaySubscriptionError extends CommonError {}

export interface ValidateRokuReceipt {
  code: number;
  message: string;
}

export interface ValidateRokuReceiptError extends CommonError {}

export interface ValidateRokuReceiptError422 extends AdvanceError {}

export interface CreateCharge {
  code: number;
  message: string;
}

export interface CreateChargeError extends CommonError {}

export interface Card {
  number: number;
  card_name: string;
  exp_month: number;
  exp_year: number;
}

export interface GetDefaultCard {
  cards: Card[];
}

export interface GetDefaultCardError extends CommonError {}

export interface SetDefaultCardPerCurrency {
  account: Card;
}

export interface SetDefaultCardPerCurrencyError extends CommonError {}

export interface SetDefaultCardPerCurrencyError400 extends AdvanceError {}

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

export interface GetMandateError extends CommonError {}

export interface CreateMandate extends Mandate {}

export interface CreateMandateError extends CommonError {}

export interface SetPaymentProviderMetadata {
  code: number;
  message: string;
  metadata: Record<string, string>[];
}

export interface SetPaymentProviderMetadataError extends CommonError {}

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

export interface GetPaymentProviderMetadataError extends CommonError {}

export interface CreateSubscriptionV2Error extends CommonError {}

export interface CreatePaymentData {
  number: number;
  cardName: string;
  expMonth: number;
  expYear: number;
  cvv: number;
  accessFee: number;
  paymentMethod: number;
  referrer: string;
  voucherCode: string;
  brandingId: number;
  returnUrl: string;
  paymentIntentId: string;
}

export interface PaypalParamsData {
  origin: string;
  accessFeeId: number;
  paymentMethod: number;
  voucherCode: string;
}

export interface CreateSubscriptionData {
  number: number;
  cardName: string;
  expMonth: number;
  expYear: number;
  cvv: number;
  accessFee: number;
  paymentMethod: string;
  referrer: string;
  voucherCode?: string;
  brandingId?: number;
}

export interface CreateSubscriptionBody {
  number: number;
  card_name: string;
  exp_month: number;
  exp_year: number;
  cvv: number;
  access_fee: number;
  payment_method: string;
  referrer: string;
  voucher_code?: string;
  branding_id?: number;
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
  paymentMethod: 'Direct Debit';
  brandingId?: number;
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

export interface DirectDebitChargeResponse {
  code: string;
  message: string;
}

export interface Payment {
  getPaymentMethods(): object;
  getPaymentTools(paymentMethodId: number): object;
  create(data: CreatePaymentData): object;
  getPayPalParams(data: PayPalParamsData): object;
  getPurchaseHistory(status: string, page: number, limit: number): object;
  getDefaultCreditCard(): object;
  setDefaultCreditCard(data: DefaultCreditCardData): object;
  getDirectDebitMandate: () => Promise<
    AxiosResponse<DirectDebitMandateResponse>
  >;
  createDirectDebitMandate: (
    data: DirectDebitMandateData
  ) => Promise<AxiosResponse<CreateDirectDebitResponse>>;
  directDebitCharge: (
    data: DirectDebitData
  ) => Promise<AxiosResponse<DirectDebitChargeResponse>>;
  directDebitSubscribe: (
    data: DirectDebitData
  ) => Promise<AxiosResponse<DirectDebitChargeResponse>>;
}

export interface Subscription {
  getSubscriptions(page?: number, limit?: number): object;
  getSubscription(id: string): object;
  cancelSubscription(unsubscribeUrl: string): object;
  create(data: CreateSubscriptionData): object;
}
