import { AxiosResponse } from 'axios';

/* eslint-disable camelcase */
export interface CredentialsConfig {
  token?: string;
  refreshToken?: string;
  expires?: number;
}

export declare class Credentials {
  constructor(data: CredentialsConfig);

  isExpired(): boolean;
  toObject(): CredentialsConfig;
}

export interface AuthData {
  email: string;
  password: string;
  clientId: string;
  referrer: string;
  refreshToken: string;
}

export interface SignUpData {
  fullName: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  clientId: string;
  type: string;
  referrer: string;
  brandingId?: number;
  metadata?: { [key: string]: string };
}

export interface RequestPasswordData {
  email: string;
  merchantUuid: string;
  brandingId: number;
}

export interface SetPasswordData {
  password: string;
  passwordConfirmation: string;
  brandingId: number;
}

export interface ChangePasswordData
  extends Omit<SetPasswordData, 'brandingId'> {
  oldPassword: string;
  brandingId?: number;
}

export interface DeleteAccountData
  extends Omit<SetPasswordData, 'passwordConfirmation' | 'brandingId'> {
  brandingId?: number;
}

export interface UpdateAccountData {
  fullName: string;
  metadata?: { [key: string]: string };
  dateOfBirth?: string;
}

export declare interface AuthenticateData {
  email: string;
  grantType: 'password' | 'client_credentials' | 'refresh_token';
  clientId: string;
  clientSecret?: string;
  refreshToken?: string;
  referrer?: string;
  username?: string;
  password?: string;
}

export declare interface AccountInformationReturn {
  id: number;
  email: string;
  full_name: string;
  referrer: string;
  metadata: object;
  social_apps_metadata: object[];
  roles: string[];
  completed: boolean;
  created_at: number;
  updated_at: number;
}

export declare interface CreateAccount {
  access_token: string;
  refresh_token: string;
  account: AccountInformationReturn;
}

export declare interface CommonResponse {
  code: number;
  message: string;
}

export declare interface SocialURLs {
  facebook: string;
  twitter: string;
  google: string;
}

export declare interface ListSocialURLs {
  social_urls: SocialURLs[];
}

export declare interface GetRegisterFieldOption {
  string: string;
}

export declare interface GetRegisterField {
  id: number;
  name: string;
  label: string;
  type: string;
  required: boolean;
  default_value: string;
  placeholder: string;
  options: GetRegisterFieldOption[];
}

export declare interface RestrictionSettingsData {
  age_verification_type: string;
  age_verification_enabled: boolean;
  merchant_uuid: string;
  created_at: number;
  updated_at: number;
}

export declare class Account {
  constructor(config: object);

  authenticate(data: AuthenticateData): Promise<AxiosResponse<CreateAccount>>;
  signUp(data: SignUpData): Promise<AxiosResponse<CreateAccount>>;
  signOut(): Promise<AxiosResponse<undefined>>;
  isAuthenticated(): boolean;
  getToken(): Credentials;
  setToken(token: string, refreshToken: string, expiresAt: number): void;
  refreshToken(clientId: number): Promise<AxiosResponse<CreateAccount>>;
  reportSSOtoken(
    ssoDomain: string,
    tokenData: Credentials,
    retire: boolean
  ): Promise<AxiosResponse<any>>;
  requestNewPassword(
    data: RequestPasswordData
  ): Promise<AxiosResponse<CommonResponse>>;
  setNewPassword(
    data: SetPasswordData,
    token?: string
  ): Promise<AxiosResponse<void>>;
  getAccount(): Promise<AxiosResponse<AccountInformationReturn>>;
  getSocialLoginUrls(state: string): Promise<AxiosResponse<ListSocialURLs>>;
  updateAccount(data: UpdateAccountData): Promise<AxiosResponse<void>>;
  changePassword(data: ChangePasswordData): Promise<AxiosResponse<void>>;
  getRegisterFields(
    merchantUuid: string
  ): Promise<AxiosResponse<GetRegisterField>>;
  deleteAccount(data: DeleteAccountData): Promise<AxiosResponse<void>>;
  exportData(data: DeleteAccountData): Promise<AxiosResponse<CommonResponse>>;
  sendPinCode(brandingId: number): Promise<AxiosResponse<CommonResponse>>;
  validatePinCode(pinCode: string): Promise<AxiosResponse<CommonResponse>>;
  loadMerchantRestrictionSettings(
    merchantUuid: string
  ): Promise<AxiosResponse<RestrictionSettingsData>>;
}

export interface CodeAccessData {
  assetId: number;
  code: string;
}

export declare interface AccessControlType {
  id: number;
  name: string;
  auth: boolean;
}

export declare interface ItemType {
  id: number;
  name: string;
  content_type: string;
  host: string;
  description: string;
}

export declare interface ItemDetailsV1 {
  id: number;
  merchant_id: number;
  merchant_uuid: string;
  is_active: boolean;
  title: string;
  access_control_type: AccessControlType;
  item_type: ItemType;
  age_restriction: Record<string, number>;
  metadata: Record<string, string>[];
  created_at: number;
  updated_at: number;
}

export declare interface Item {
  id: number;
  merchant_id: number;
  merchant_uuid: string;
  is_active: boolean;
  title: string;
  access_control_type: AccessControlType;
  item_type: ItemType;
  age_restriction: Record<string, number>;
  metadata: Record<string, string>;
  created_at: number;
  update_at: number;
}

export declare interface AccessType {
  id: number;
  name: string;
  quantity: number;
  period: string;
}

export declare interface TrialPeriod {
  quantity: number;
  period: string;
  description: string;
}

export declare interface SetupFee {
  fee_amount: number;
  description: string;
}

export declare interface GeoRestriction {
  id: number;
  country_iso: string;
  country_set_id: number;
  type: string;
}

export declare interface GetAccessFee {
  id: number;
  merchant_id: number;
  amount: number;
  currency: string;
  description: string;
  item: Item;
  access_type: AccessType;
  trial_period: TrialPeriod;
  setup_fee: SetupFee;
  geo_restriction: GeoRestriction;
  expires_at: number;
}

export declare interface ExternalItemDetails extends ItemDetailsV1 {
  access_fees: GetAccessFee[];
  metahash: Record<string, string>;
}

export declare interface PackageDetails {
  id: number;
  merchant_id: number;
  is_active: boolean;
  title: string;
  content: string;
  item_type: ItemType;
  metadata: Record<string, string>;
  items: number;
}

export declare interface GetMerchantPackage {
  total: number;
  page: number;
  offset: number;
  limit: number;
  collection: PackageDetails;
}

export declare interface CloudfrontUrl {
  video_url: string;
}

export declare class Asset {
  constructor(config: object, Account: Account);

  checkAccessForAsset(id: number): object;
  isFreeTrialUsed(id: number): object;
  getAsset(
    assetId: number,
    merchantUuid: string
  ): Promise<AxiosResponse<ItemDetailsV1>>;
  getExternalAsset(
    assetType: string,
    externalId: string,
    merchantUuid: string
  ): Promise<AxiosResponse<ExternalItemDetails>>;
  getPackage(id: number): Promise<AxiosResponse<GetMerchantPackage>>;
  getAssetAccessFees(id: number): Promise<AxiosResponse<GetAccessFee>>;
  getAssetsHistory(
    size?: number,
    page?: number,
    startDate?: string,
    endDate?: string
  ): object[];
  requestCodeAccess(data: CodeAccessData): object;
  getAccessCode(assetId: number): object | null;
  releaseAccessCode(assetId: number): object;
  getCloudfrontURL(
    assetId: number,
    videoUrl: string
  ): Promise<AxiosResponse<CloudfrontUrl>>;
}

export interface Brand {
  id: number;
  exists: boolean;
  brand_name: string;
  paywall_cover_photo: string;
  paywall_brand_logo: string;
  paywall_primary_color: string;
  paywall_secondary_color: string;
  paywall_buttons_bg_color: string;
  paywall_buttons_text_color: string;
  preview_top_border: boolean;
  inplayer_protected_label: boolean;
  paywall_footer: string;
  default: boolean;
}

export declare class Branding {
  constructor(config: object);

  getBranding(
    clientId: string,
    brandingId: string | number
  ): Promise<AxiosResponse<Brand>>;
}

export declare class DLC {
  constructor(config: object, Account: Account);

  getDlcLinks(assetId: number): object;
}

export interface CreatePaymentData {
  number?: number | string;
  cardName?: string;
  expMonth?: number;
  expYear?: number;
  cvv?: number;
  accessFee?: number;
  paymentMethod?: string;
  referrer?: string;
  voucherCode?: string;
  brandingId?: number;
  returnUrl?: string;
  paymentIntentId?: string;
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

export interface DirectDebitMandateData {
  name: string;
  iban: string;
}

export interface DirectDebitChargeData {
  assetId: string;
  accessFeeId: string;
  voucherCode: string;
  brandingId?: number;
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

export declare class Payment {
  constructor(config: object, Account: Account);

  getPaymentMethods(): object;
  getPaymentTools(paymentMethodId: number): object;
  create(data: CreatePaymentData): object;
  getPayPalParams(data: PayPalParamsData): object;
  getPurchaseHistory(status: string, page: number, limit: number): object;
  getDefaultCreditCard(): object;
  setDefaultCreditCard(data: DefaultCreditCardData): object;
  getDirectDebitMandate: () => DirectDebitMandateResponse;
  createDirectDebitMandate: (
    data: DirectDebitMandateData
  ) => CreateDirectDebitResponse;
  directDebitCharge: (data: DirectDebitChargeData) => CommonResponse;
  directDebitSubscribe: (data: DirectDebitChargeData) => CommonResponse;
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

export declare interface SubscriptionDetails {
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

export declare interface GetSubscription {
  total: number;
  page: number;
  offset: number;
  limit: number;
  collection: SubscriptionDetails[];
}

export declare interface CancelSubscription {
  code: number;
  subscription: string;
  operation: string;
  description: string;
  status: string;
  timestamp: number;
}

export declare interface CreateSubscription {
  message: string;
}

export declare class Subscription {
  constructor(config: object, Account: Account);

  getSubscriptions(
    page?: number,
    limit?: number
  ): Promise<AxiosResponse<GetSubscription>>;
  getSubscription(id: number): Promise<AxiosResponse<SubscriptionDetails>>;
  cancelSubscription(
    unsubscribeUrl: string
  ): Promise<AxiosResponse<CancelSubscription>>;
  create(
    data: CreateSubscriptionData
  ): Promise<AxiosResponse<CreateSubscription>>;
}

export interface DiscountData {
  voucherCode: string;
  accessFeeId: number;
}

export interface VoucherDiscountPrice {
  amount: number;
}

export declare class Voucher {
  constructor(config: object, Account: Account);

  getDiscount(data: DiscountData): Promise<AxiosResponse<VoucherDiscountPrice>>;
}

export interface ApiEndpoints {
  authenticate: string;
  signIn: string;
  signOut: string;
  signUp: string;
  requestNewPassword: string;
  setNewPassword: (token: string) => string;
  getAccountInfo: string;
  getSocialLoginUrls: (state: string) => string;
  updateAccount: string;
  changePassword: string;
  getRegisterFields: (merchantUuid: string) => string;
  getPurchaseHistory: (status: string, page?: number, size?: number) => string;
  getAssetsHistory: (
    size: number,
    page: number,
    startDate: string,
    endDate: string
  ) => string;
  deleteAccount: string;
  exportData: string;
  reportSSOtoken: (ssoDomain: string) => string;
  // Asset
  checkAccessForAsset: (id: number) => string;
  checkFreeTrial: (id: number) => string;
  getAsset: (assetId: number, merchantUuid: string) => string;
  getExternalAsset: (
    assetType: string,
    externalId: string,
    merchantUuid?: string
  ) => string;
  getPackage: (id: number) => string;
  getAssetAccessFees: (id: number) => string;
  getFreemiumAsset: string;
  getCloudfrontURL: (assetId: number, videoUrl: string) => string;
  // Payment
  getPaymentMethods: string;
  getPaymentTools: (paymentMethodId: number) => string;
  payForAsset: string;
  getPayPalParams: string;
  getDefaultCreditCard: string;
  setDefaultCreditCard: string;
  getDirectDebitMandate: string;
  createDirectDebitMandate: string;
  // Subscriptions
  getSubscriptions: (limit: number, page: number) => string;
  getSubscription: (id: number) => string;
  subscribe: string;
  cancelSubscription: (url: string) => string;
  // Misc
  getDlcLinks: (id: number) => string;
  getDiscount: string;
  getBranding: (merchantUuid: string, brandingId: string) => string;
  downloadFile: (assetId: number, filename: string) => string;
  requestCodeAccess: string;
  releaseAccessCode: (code: number) => string;
}

export interface ApiConfig {
  BASE_URL: string;
  AWS_IOT_URL: string;
  IOT_NOTIF_URL: string;
  INPLAYER_TOKEN_NAME: string;
  INPLAYER_IOT_NAME: string;
  INPLAYER_ACCESS_CODE_NAME: (assetId: any) => string;
}

export declare const API: (config: ApiConfig) => ApiEndpoints;

export declare class Notifications {
  constructor(config: object, Account: Account);

  getIotToken(): object;
  subscribe(accountUuid?: string, callbackParams?: any): boolean;
  handleSubscribe(data: object, callbackParams: any, uuid: string): void;
  setClient(client: any): void;
  isSubscribed(): boolean;
  unsubscribe(): void;
}

export interface Config {
  BASE_URL: string;
  AWS_IOT_URL: string;
  IOT_NOTIF_URL: string;
  INPLAYER_TOKEN_NAME: string;
  INPLAYER_IOT_NAME: string;
  INPLAYER_ACCESS_CODE_NAME: (assetId: number) => string;
  API: ApiEndpoints;
}

export declare class InPlayer {
  constructor();

  config: Config;
  Account: Account;
  Asset: Asset;
  Payment: Payment;
  Subscription: Subscription;
  Voucher: Voucher;
  DLC: DLC;
  Branding: Branding;
  Notifications: Notifications;

  subscribe(accountUuid: string, callbackParams: any): void;
  isSubscribed(): boolean;
  unsubscribe(): void;
  setConfig(config: string): void;
}

// const InPlayer: InPlayer;

export default InPlayer;
