import { AxiosResponse } from 'axios';

export enum Env {
  Development = 'development',
  Production = 'production',
  Daily = 'daily',
}

// Common response
export declare interface CommonResponse {
  code: number;
  message: string;
}

export interface CustomErrorResponse {
  status: number;
  data: CommonResponse;
}

export interface CredentialsConfig {
  token: string;
  refreshToken: string;
  expires: number;
}

export declare class Credentials {
  constructor(data: CredentialsConfig);

  isExpired(): boolean;
  toObject(): CredentialsConfig;
}

// Account
export interface SignUpData {
  fullName: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  type: 'consumer' | 'merchant';
  grantType?: 'password' | 'client_credentials' | 'refresh_token';
  clientId: string;
  referrer: string;
  metadata?: { [key: string]: string };
  brandingId?: number;
}

export interface SignUpDataV2 {
  fullName: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  type: 'consumer';
  clientId: string;
  referrer: string;
  metadata?: { [key: string]: string };
  brandingId?: number;
}

export declare interface AuthenticateData {
  email: string;
  grantType?: 'password' | 'client_credentials' | 'refresh_token';
  clientId: string;
  clientSecret?: string;
  refreshToken?: string;
  referrer?: string;
  username?: string;
  password?: string;
}

export interface AuthenticateDataV2 {
  email: string;
  clientId: string;
  referrer: string;
  password: string;
}

export interface SetNewPasswordData {
  password: string;
  passwordConfirmation: string;
  brandingId: number;
}

export interface ChangePasswordData
  extends Omit<SetNewPasswordData, 'brandingId'> {
  oldPassword: string;
  brandingId?: number;
}

export interface RequestNewPasswordData {
  email: string;
  merchantUuid: string;
  brandingId: number;
}

export interface UpdateAccountData {
  fullName: string;
  metadata?: { [key: string]: string };
  dateOfBirth?: string;
}

export interface AccountAuthData {
  password: string;
  brandingId: number;
}

// Response data
export declare interface AccountData {
  id: number;
  email: string;
  full_name: string;
  referrer: string;
  metadata: Record<string, unknown>;
  social_apps_metadata: Record<string, unknown>[];
  roles: string[];
  completed: boolean;
  created_at: number;
  updated_at: number;
  date_of_birth: number;
  uuid: string;
  merchant_uuid: string;
}

export declare interface CreateAccount {
  access_token: string;
  refresh_token: string;
  account: AccountData;
  expires: number;
}

export interface CreateAccountV2 {
  access_token: string;
  expires: number;
  account: AccountData;
}

export declare interface SocialURLs {
  facebook: string;
  twitter: string;
  google: string;
}

export declare interface ListSocialURLs {
  social_urls: SocialURLs[];
  code: number;
}

export declare interface GetRegisterFieldOption {
  [key: string]: string;
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

export interface RestrictionSettingsData {
  age_verification_type: string;
  age_verification_enabled: boolean;
  merchant_uuid: string;
  created_at: number;
  updated_at: number;
}

export declare interface ExternalAccount {
  id: number;
  account_id: number;
  token: string;
}

export interface WatchHistory {
  media_id: string;
  progress: number;
  created_at: number;
  updated_at: number;
}
export interface FavoritesData {
  media_id: string;
  created_at: number;
}

export interface CollectionWithCursor<T> {
  collection: T[];
  cursor?: string;
}
export interface CollectionWithCursorArgs {
  filter?: 'all' | 'watched' | 'currently_watching';
  cursor?: string;
}

export declare class Account {
  constructor(config: Record<string, unknown>);

  isAuthenticated<R = boolean>(): R | boolean;
  getToken<R = Credentials>(): R | Credentials;
  setToken<R = void>(
    token: string,
    refreshToken: string,
    expiresAt: number
  ): R | void;
  removeToken<R = void>(): R | void;

  signUp(data: SignUpData): Promise<AxiosResponse<CreateAccount>>;
  signUpV2(data: SignUpDataV2): Promise<AxiosResponse<CreateAccount>>;
  signIn(data: AuthenticateData): Promise<AxiosResponse<CreateAccount>>;
  signInV2(data: AuthenticateDataV2): Promise<AxiosResponse<CreateAccountV2>>;
  signOut(): Promise<AxiosResponse<undefined>>;
  refreshToken(clientId: string): Promise<AxiosResponse<CreateAccount>>;
  changePassword(data: ChangePasswordData): Promise<AxiosResponse<void>>;
  requestNewPassword(
    data: RequestNewPasswordData
  ): Promise<AxiosResponse<CommonResponse>>;
  setNewPassword(
    data: SetNewPasswordData,
    token?: string
  ): Promise<AxiosResponse<void>>;
  getAccountInfo(): Promise<AxiosResponse<AccountData>>;
  updateAccount(data: UpdateAccountData): Promise<AxiosResponse<AccountData>>;
  exportData(data: AccountAuthData): Promise<AxiosResponse<CommonResponse>>;
  deleteAccount(data: AccountAuthData): Promise<AxiosResponse<CommonResponse>>;
  getSocialLoginUrls(state: string): Promise<AxiosResponse<ListSocialURLs>>;
  getRegisterFields(
    merchantUuid: string
  ): Promise<AxiosResponse<GetRegisterField>>;
  reportSSOtoken(
    ssoDomain: string,
    token: string,
    retire: boolean
  ): Promise<AxiosResponse<any>>;
  sendPinCode(brandingId: number): Promise<AxiosResponse<CommonResponse>>;
  validatePinCode(pinCode: string): Promise<AxiosResponse<CommonResponse>>;
  loadMerchantRestrictionSettings(
    merchantUuid: string
  ): Promise<AxiosResponse<RestrictionSettingsData>>;
  syncWithExternalAccount(
    integration: string,
    itemId: number
  ): Promise<AxiosResponse<ExternalAccount>>;
  updateExternalAccount(
    integration: string,
    body: Record<string, string | number>
  ): Promise<AxiosResponse<CommonResponse>>;
  getFavorites(): Promise<AxiosResponse<CollectionWithCursor<FavoritesData>>>;
  getFavorite(mediaId: string): Promise<AxiosResponse<FavoritesData>>;
  addToFavorites(mediaId: string): Promise<AxiosResponse<FavoritesData>>;
  deleteFromFavorites(mediaId: string): Promise<AxiosResponse<CommonResponse>>;
  getWatchHistory(
    args: CollectionWithCursorArgs
  ): Promise<AxiosResponse<CollectionWithCursor<WatchHistory>>>;
  getWatchHistoryForItem(mediaId: string): Promise<AxiosResponse<WatchHistory>>;
  updateWatchHistory(
    mediaId: string,
    progress: number
  ): Promise<AxiosResponse<WatchHistory>>;
  deleteWatchHistoryForItem(
    mediaId: string
  ): Promise<AxiosResponse<CommonResponse>>;
}

// Items
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

interface ItemDetailsAccess extends ItemDetailsV1 {
  content: string;
}

export declare interface GetItemAccessV1 {
  id: number;
  account_id: number;
  customer_id: number;
  customer_uuid: string;
  ip_address: string;
  country_code: string;
  created_at: number;
  expires_at: number;
  item: ItemDetailsAccess;
  starts_at: number;
}

export declare interface AgeRestriction {
  min_age: number;
}

export declare interface Item {
  id: number;
  merchant_id: number;
  merchant_uuid: string;
  active: boolean;
  title: string;
  access_control_type: AccessControlType;
  item_type: ItemType;
  age_restriction: AgeRestriction | null;
  metadata?: Array<Record<string, string>>;
  metahash?: Record<string, string>;
  content?: string;
  template_id: number | null;
  created_at: number;
  update_at: number;
}

export declare interface AccessType {
  id: number;
  account_id: number;
  name: string;
  quantity: number;
  period: string;
  updated_at: number;
  created_at: number;
}
export interface DonationOption {
  id: number;
  item_id: number;
  amount: number;
  currency: string;
  description?: string;
}

export interface CustomDonationOption {
  id: number;
  item_id: number;
  custom_price_enabled: boolean;
}

export interface DonationDetails {
  donations: Array<DonationOption> | null;
  donation_options: CustomDonationOption;
}

export declare interface TrialPeriod {
  quantity: number;
  period: string;
  description: string;
}

export declare interface SetupFee {
  id: number;
  fee_amount: number;
  description: string;
}

export declare interface SeasonalFee {
  id: number;
  access_fee_id: number;
  merchant_id: number;
  current_price_amount: number;
  off_season_access: boolean;
  anchor_date: number;
  created_at: number;
  updated_at: number;
}

export declare interface ExternalFee {
  id: number;
  payment_provider_id: number;
  access_fee_id: number;
  external_id: string;
  merchant_id: number;
}

export declare interface GeoRestriction {
  id: number;
  country_iso: string;
  country_set_id: number;
  type: string;
}

export declare interface CurrentPhase {
  access_fee_id: number;
  anchor_date: number;
  created_at: number;
  currency: string;
  current_price: number;
  expires_at: number;
  id: number;
  season_price: number;
  starts_at: number;
  status: string;
  updated_at: number;
}

export declare interface GetAccessFee {
  id: number;
  merchant_id: number;
  amount: number;
  currency: string;
  description: string;
  expires_at: number;
  starts_at: number;
  updated_at: number;
  created_at: number;
  access_type: AccessType;
  item: Item;
  trial_period: TrialPeriod;
  setup_fee: SetupFee | null;
  seasonal_fee: SeasonalFee | null;
  external_fees: Array<ExternalFee> | null;
  geo_restriction: GeoRestriction | null;
  current_phase: CurrentPhase | null;
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

export declare interface GetAssetsInPackage {
  total: number;
  page: number;
  offset: number;
  limit: number;
  collection: ItemDetailsV1[];
}

export declare interface CloudfrontUrl {
  video_url: string;
}

export interface RequestCodeAccessData {
  item_id: number;
  code: string;
}

export interface CodeAccessData {
  item_id: number;
  content: string;
  in_use: boolean;
  browser_fingerprint: string;
  code: string;
  type: string;
  code_id: number;
}

export interface CodeAccessSessionsData {
  id: number;
  code: string;
  browser_fingerprint: string;
  agent_info: string;
  last_used: number;
}

export interface RequestDataCaptureAccessData {
  email: string;
  full_name: string;
  company: string;
  merchant_uuid: string;
}

export declare class Asset {
  constructor(config: Record<string, unknown>, Account: Account);

  checkAccessForAsset(id: number): Promise<AxiosResponse<GetItemAccessV1>>;
  isFreeTrialUsed(id: number): Promise<AxiosResponse<boolean>>;
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
  getAssetsInPackage(id: number): Promise<AxiosResponse<GetAssetsInPackage>>;
  getAssetAccessFees(id: number): Promise<AxiosResponse<GetAccessFee>>;
  getDonationOptions(assetId: number): Promise<AxiosResponse<DonationDetails>>;
  getAssetsHistory(
    size?: number,
    page?: number,
    startDate?: string,
    endDate?: string,
    type?: string
  ): Promise<AxiosResponse<Record<string, unknown>[]>>;
  getAccessCode(assetId: number | string): CodeAccessData;
  requestCodeAccess(
    data: RequestCodeAccessData
  ): Promise<AxiosResponse<CodeAccessData>>;
  getAccesCodeSessions(
    codeId: number
  ): Promise<AxiosResponse<Array<CodeAccessSessionsData>>>;
  terminateSession(
    assetId: number
  ): Promise<AxiosResponse<CommonResponse> | null>;
  getCloudfrontURL(
    assetId: number,
    videoUrl: string
  ): Promise<AxiosResponse<CloudfrontUrl>>;
  requestDataCaptureNoAuthAccess(
    accessData: RequestDataCaptureAccessData
  ): Promise<AxiosResponse<CommonResponse>>;
}

export interface BrandingDetails {
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
  template_id: number;
  terms_url: string;
}

export declare class Branding {
  constructor(config: Record<string, unknown>);

  getBranding(
    clientId: string,
    brandingId?: string | number
  ): Promise<AxiosResponse<BrandingDetails>>;
}

export interface CreatePaymentData {
  number: number | string;
  cardName: string;
  expMonth: string;
  expYear: string;
  cvv: number;
  accessFee: number;
  paymentMethod: string;
  referrer: string;
  returnUrl: string;
  voucherCode?: string;
  brandingId?: number;
  receiverEmail?: string;
  isGift?: boolean;
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

export interface ConfirmDonationPaymentData {
  paymentIntentId: string;
  brandingId: number;
  paymentMethod: string;
  donationId?: number;
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
  address?: string;
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

export interface MerchantPaymentMethod {
  id: number;
  method_name: string;
  is_external: boolean;
}

export interface GeneratePayPalParameters {
  endpoint: string;
  business: string;
  item_name: string;
  currency_code: string;
  return: string;
  cancel_return: string;
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

export declare interface DirectDebitData {
  accessFeeId: number;
  assetId: number;
  voucherCode: string;
  brandingId?: number;
  referrer: string;
}

export declare interface IdealPaymentData {
  accessFeeId: number;
  bank: string;
  returnUrl: string;
  referrer: string;
  brandingId: number;
  voucherCode?: string;
}

export declare interface GoogleOrApplePaymentData {
  accessFeeId: number;
  referrer: string;
  brandingId: number;
  voucherCode?: string;
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
  platform: Exclude<
    ReceiptValidationPlatform,
    ReceiptValidationPlatform.AMAZON
  >;
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

export declare class Payment {
  constructor(config: Record<string, unknown>, Account: Account);

  getPaymentMethods(): Promise<AxiosResponse<MerchantPaymentMethod[]>>;
  createPayment(
    data: CreatePaymentData
  ): Promise<AxiosResponse<CommonResponse>>;
  createDonationPayment(
    data: CreateDonationPaymentData
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
  confirmPayment(
    paymentIntentId: string
  ): Promise<AxiosResponse<CommonResponse>>;
  confirmDonationPayment(
    data: ConfirmDonationPaymentData
  ): Promise<AxiosResponse<CommonResponse>>;
  idealPayment: (
    data: IdealPaymentData
  ) => Promise<AxiosResponse<CommonResponse>>;
  googlePayPayment: (
    data: GoogleOrApplePaymentData
  ) => Promise<AxiosResponse<CommonResponse>>;
  applePayPayment: (
    data: GoogleOrApplePaymentData
  ) => Promise<AxiosResponse<CommonResponse>>;
  confirmIdealPayment: (
    sourceId: string
  ) => Promise<AxiosResponse<CommonResponse>>;
  idealSubscribe: (
    data: IdealPaymentData
  ) => Promise<AxiosResponse<CommonResponse>>;
  confirmIdealSubscribe: (
    sourceId: string
  ) => Promise<AxiosResponse<CommonResponse>>;
  validateReceipt: (
    data: ValidateReceiptData
  ) => Promise<AxiosResponse<CommonResponse>>;
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
  status?: string;
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

export interface ChangeSubscriptionPlanRequestBody {
  access_fee_id: number;
  inplayer_token: string;
}

export interface ChangeSubscriptionPlanResponse {
  message: string;
}
export declare class Subscription {
  constructor(config: Record<string, unknown>, Account: Account);

  getSubscriptions(
    page?: number,
    limit?: number,
    status?: string
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
}

export interface DiscountData {
  voucherCode: string;
  accessFeeId?: number;
  itemId?: number;
}

export interface VoucherDiscountPrice {
  amount: number;
}

export declare class Voucher {
  constructor(config: Record<string, unknown>, Account: Account);

  getDiscount(data: DiscountData): Promise<AxiosResponse<VoucherDiscountPrice>>;
}

type FiatCurrency = string;

export enum CryptoCurrency {
  ETH = 'ETH',
  MATIC = 'MATIC',
  USDC = 'USDC',
}

export interface GetMerchantMarketplaceResponse {
  id: number;
  merchant_uuid: string;
  name: string;
  logo_url: string;
  banner_url: string;
  created_at: number;
  updated_at: number;
  engagement_mode: boolean;
  url: string;
  currency: FiatCurrency;
}

export interface CryptoPrice {
  amount: number;
  currency: CryptoCurrency;
}

export enum Prices {
  CRYPTO = 'crypto',
  FIAT = 'fiat',
}

export interface GetMerchantNFTResponse {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  token_uri: string;
  merchant_uuid: string;
  prices: Partial<{
    [Prices.CRYPTO]: CryptoPrice;
    [Prices.FIAT]: GetAccessFee;
  }>;
  published: boolean;
  supply: number;
  created_at: number;
  updated_at: number;
}

export interface GetMerchantNFTListResponse {
  collection: GetMerchantNFTResponse[] | null;
  page: number;
  size: number;
  total: number;
}

interface ExchangeRate {
  asset_id_quote: CryptoCurrency;
  rate: number;
}

export interface GetExchangeRatesResponse {
  asset_id_base: FiatCurrency;
  rates: ExchangeRate[];
}

export type GetUserBoughtNFTsResponse = GetMerchantNFTListResponse;

export interface MakeReservationResponse {
  created_at: number;
  updated_at: number;
  description: string;
  id: number;
  merchant_uuid: string;
  prices: Record<string, unknown>;
  published: boolean;
  reservation_expires_at: number;
  reservation_id: number;
  reservation_owner_id: number;
  supply: number;
  thumbnail: string;
  title: string;
  token_id: number;
  token_uri: string;
}

export declare class NFTs {
  constructor(config: Record<string, unknown>, Account: Account);

  getMerchantMarketplace(
    merchantUuid: string
  ): Promise<AxiosResponse<GetMerchantMarketplaceResponse>>;
  getMerchantNFTList(
    merchantUuid: string,
    page?: number,
    size?: number,
    filter?: string
  ): Promise<AxiosResponse<GetMerchantNFTListResponse>>;
  getMerchantNFT(
    merchantUuid: string,
    nftId: number
  ): Promise<AxiosResponse<GetMerchantNFTResponse>>;
  getExchangeRates(
    fiat: string,
    invert?: boolean
  ): Promise<AxiosResponse<GetExchangeRatesResponse>>;
  getUserBoughtNFTs(
    page?: number,
    size?: number
  ): Promise<AxiosResponse<GetUserBoughtNFTsResponse>>;
  makeReservation(
    merchantUuid: string,
    nftId: number
  ): Promise<AxiosResponse<MakeReservationResponse>>;
}

export interface ApiEndpoints {
  // Account
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
    endDate: string,
    type?: string
  ) => string;
  deleteAccount: string;
  exportData: string;
  reportSSOtoken: (ssoDomain: string) => string;
  externalAccount: (integration: string) => string;
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
  requestCodeAccess: string;
  releaseAccessCode: (code: number) => string;
  requestDataCaptureNoAuthAccess: string;
  // Payment
  getPaymentMethods: string;
  payForAsset: string;
  getPayPalParams: string;
  getDefaultCreditCard: string;
  setDefaultCreditCard: string;
  getDirectDebitMandate: string;
  createDirectDebitMandate: string;
  validateReceipt: (platform: string) => string;
  // Subscription
  getSubscriptions: (limit: number, page: number) => string;
  getSubscription: (id: string) => string;
  subscribe: string;
  cancelSubscription: (url: string) => string;
  changeSubscriptionPlan: (
    accessFeeId: number,
    inplayerToken: string
  ) => string;
  // Voucher
  getDiscount: string;
  // Branding
  getBranding: (clientId: string, brandingId: string) => string;
  // NFTs
  getMerchantMarketplace: (merchantUuid: string) => string;
  getMerchantNFTList: (
    merchantUuid: string,
    page: number,
    size: number,
    filter: string
  ) => string;
  getMerchantNFT: (merchantUuid: string, nftId: number) => string;
  getExchangeRates: (fiat: string, invert: boolean) => string;
  getUserBoughtNFTs: (page: number, size: number) => string;
  makeReservation: (merchantUuid: string, nftId: number) => string;
}

export interface ApiConfig {
  BASE_URL: string;
  AWS_IOT_URL: string;
  IOT_NOTIF_URL: string;
  INPLAYER_TOKEN_KEY: string;
  INPLAYER_IOT_KEY: string;
  INPLAYER_ACCESS_CODE_NAME: (assetId: number) => string;
}

export declare const API: ApiEndpoints;

export declare class Notifications {
  constructor(config: Record<string, unknown>, Account: Account);

  getIotToken(): Promise<Record<string, unknown>>;
  subscribe(accountUuid?: string, callbackParams?: any): Promise<boolean>;
  handleSubscribe(
    data: Record<string, unknown>,
    callbackParams: any,
    uuid: string
  ): void;
  setClient(client: any): void;
  isSubscribed(): boolean;
  unsubscribe(): void;
}

export interface LocalStorageMethods {
  setItem: <R = void>(key: string, value: string) => R | void;
  getItem: <R = string | null>(key: string) => R | (string | null);
  removeItem: <R = void>(key: string) => R | void;
}

export type TokenStorageType = LocalStorageMethods & {
  overrides: LocalStorageMethods;
};

declare const InPlayer: {
  config: ApiConfig;
  Account: Account;
  Asset: Asset;
  Payment: Payment;
  Subscription: Subscription;
  Voucher: Voucher;
  Branding: Branding;
  NFTs: NFTs;
  Notifications: Notifications;
  tokenStorage: TokenStorageType;

  subscribe(
    accountUuid: string,
    callbackParams: Record<string, (...params: any) => void>
  ): void;
  isSubscribed(): boolean;
  unsubscribe(): void;
  setConfig(env: Env): void;
};

export default InPlayer;
