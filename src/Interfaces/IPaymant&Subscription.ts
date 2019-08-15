import { CommonError, AdvanceError } from './CommonInterfaces';

export interface GeneratePayPalParameters {
    endpoint: string;
    business: string;
    item_name: string;
    currency_code: string;
    return: string;
    cancel_return: string;
}

export interface GeneratePayPalParametersError extends CommonError { }

export interface GeneratePayPalParametersError422 extends AdvanceError { }

export interface CancelPayPalSubscription {
    code: number;
    subscription_id: string;
    message: string;
}

export interface CancelPayPalSubscriptionError extends CommonError { }

export interface CreatePayment {
    message: string;
}

export interface CreatePaymentError extends CommonError { }

export interface CreatePaymentError422 extends AdvanceError { }

export interface Country {
    name: string;
    value: number;
}

export interface AssetCountry {
    item_id: number;
    countries: Array<Country>;
    total: number;
}

export interface GetNumberOfPaymentPerAssetPerCountry {
    collection: Array<AssetCountry>
}

export interface GetNumberOfPaymentPerAssetPerCountryError extends CommonError { }

export interface AssetValue {
    timestamp: number;
    value: number;
}

export interface Asset {
    item_id: number;
    values: Array<AssetValue>;
    total: number;
}

export interface GetNumberOfPaymentPerAsset {
    collection: Array<Asset>
}


export interface MerchantActivePaymentMethod {
    id: number;
    method_name: string;
    is_external: boolean;
    active: boolean;
    account_id: number;
    provider_name: string;
}

export interface MerchantActivePaymentMethodError extends CommonError { }

export interface MerchantPaymentMethod {
    id: number;
    method_name: string;
    is_external: boolean;
}

export interface MerchantPaymentMethods {
    collection: Array<MerchantPaymentMethod>
}

export interface MerchantPaymentMethodsError extends CommonError { }

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
    metadata: Array<any>;
    providers: Provider;
}

export interface MerchantPaymentProviders {
    payment_methods: PaymentMethods;
    bank_statement: string;
    string_connect: boolean;
}

export interface MerchantPaymentProvidersError extends CommonError { }

export interface CreateBankStatementDescriptor {
    id: number;
    message: string;
}

export interface CreateBankStatementDescriptorError extends CommonError { }

export interface DeleteBankStatementDescriptor {
    id: number;
    message: string;
}

export interface DeleteBankStatementDescriptorError extends CommonError { }

export interface DeleteBankStatementDescriptorError400 extends AdvanceError { }

export interface CountryValue {
    amount: number;
    currency_iso: string;
    formatted_amount: string;
}

export interface RevenueCountryDetails {
    name: string;
    value: Array<CountryValue>;
}

export interface RevenuePerAssetPerCountry {
    item_id: number;
    countries: Array<RevenueCountryDetails>
}

export interface GetRevenuePerAssetPerCountry {
    collection: Array<RevenuePerAssetPerCountry>;
}

export interface GetRevenuePerAssetPerCountryError extends CommonError { }

export interface RevenueAssetDetails {
    timestamp: number;
    values: Array<Country>;
}

export interface RevenuePerAsset {
    item_id: number;
    values: Array<RevenueAssetDetails>
}

export interface GetRevenuePerAsset {
    collection: Array<RevenuePerAsset>
}

export interface GetRevenuePerAssetError extends CommonError { }

export interface StripeConnectRequest {
    code: number;
    message: string;
}

export interface StripeConnectRequestError extends CommonError { }

export interface StripeConnect {
    code: number;
}

export interface StripeConnectError extends CommonError { }

export interface StripeConnectError400 extends AdvanceError { }

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
    collection: Array<SubscriptionDetails>;
}

export interface GetSubscriptionError extends AdvanceError { }

export interface CreateSubscription {
    message: string;
}

export interface CreateSubscriptionError extends CommonError { }

export interface CreateSubscriptionError422 extends AdvanceError { }

export interface CancelSubscription {
    code: number;
    subscription: string;
    operation: string;
    description: string;
    status: string;
    timestamp: number;
}

export interface CancelSubscriptionError extends CommonError { }

export interface CancelSubscriptionError400 extends AdvanceError { }

// --------------------------------------V2--------------------------------------

export interface ValidateAmazonReceipt {
    code: number;
    message: string;
}

export interface ValidateAmazonReceiptError extends CommonError { }

export interface ValidateAmazonReceiptError422 extends AdvanceError { }

export interface ValidateAppleReceipt {
    code: number;
    message: string;
}

export interface ValidateAppleReceiptError extends CommonError { }

export interface ValidateAppleReceiptError422 extends AdvanceError { }

export interface ValidateGooglePlayReceipt {
    code: number;
    message: string;
}

export interface ValidateGooglePlayReceiptError extends CommonError { }

export interface ValidateGooglePlayReceiptError422 extends AdvanceError { }

export interface CancelGooglePlaySubscription {
    code: number;
    message: string;
}

export interface CancelGooglePlaySubscriptionError extends CommonError { }

export interface ValidateRokuReceipt {
    code: number;
    message: string;
}

export interface ValidateRokuReceiptError extends CommonError { }

export interface ValidateRokuReceiptError422 extends AdvanceError { }

export interface CreateCharge {
    code: number;
    message: string;
}

export interface CreateCharge extends CommonError { }

export interface Card {
    number: number;
    card_name: string;
    exp_month: number;
    exp_year: number;
}

export interface GetDefaultCard {
    cards: Array<Card>
}

export interface GetDefaultCard extends CommonError { }

export interface SetDefaultCardPerCurrency {
    account: Card;
}

export interface SetDefaultCardPerCurrencyError extends CommonError { }

export interface SetDefaultCardPerCurrencyError400 extends AdvanceError { }

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

export interface GetMandateError extends CommonError { }

export interface CreateMandate extends Mandate { }

export interface CreateMandateError extends CommonError { }

export interface SetPaymentProviderMetadata {
    code: number;
    message: string;
    metadata: Array<Record<string, string>>
}

export interface SetPaymentProviderMetadataError extends CommonError { }

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

export interface GetPaymentProviderMetadataError extends CommonError { }

export interface CreateSubscriptionV2Error extends CommonError { }