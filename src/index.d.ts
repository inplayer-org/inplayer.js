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
  dateOfBirth?: string;
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

export declare class Account {
  constructor(config: object);

  authenticate(data: AuthData): object;
  signUp(data: SignUpData): object;
  signOut(): object;
  isAuthenticated(): boolean;
  getToken(): Credentials;
  setToken(token: string, refreshToken: string, expiresAt: number): void;
  refreshToken(clientId: string): object;
  reportSSOtoken(ssoDomain: string, tokenData: string, retire: boolean): object;
  requestNewPassword(data: RequestPasswordData): object;
  setNewPassword(data: SetPasswordData, token?: string): object | void;
  getAccount(): object;
  getSocialLoginUrls(state: string): object;
  updateAccount(data: UpdateAccountData): object;
  changePassword(data: ChangePasswordData): object;
  getRegisterFields(merchantUuid: string): object;
  deleteAccount(data: DeleteAccountData): object;
  exportData(data: DeleteAccountData): object;
  sendPinCode(brandingId?: number): object;
  validatePinCode(pinCode: string): object;
  loadMerchantRestrictionSettings(merchantUuid: string): object;
}

export interface CodeAccessData {
  assetId: number;
  code: string;
}

export declare class Asset {
  constructor(config: object, Account: Account);

  checkAccessForAsset(id: number): object;
  isFreeTrialUsed(id: number): object;
  getAsset(assetId: number, merchantUuid: string): object;
  getExternalAsset(
    assetType: string,
    externalId: string,
    merchantUuid: string
  ): object;
  getPackage(id: number): object;
  getAssetAccessFees(id: number): object;
  getAssetsHistory(
    size?: number,
    page?: number,
    startDate?: string,
    endDate?: string
  ): object;
  getFreemiumAsset(accessFeeId: number): object;
  requestCodeAccess(data: CodeAccessData): object;
  getAccessCode(assetId: number): object;
  releaseAccessCode(assetId: number): object;
  getCloudfrontURL(assetId: number, videoUrl: string): object;
}

export declare class Branding {
  constructor(config: object);

  getBranding(clientId: string, brandingId: string): object;
}

export declare class DLC {
  constructor(config: object, Account: Account);

  getDlcLinks(assetId: number): object;
}

export interface CreatePaymentData {
  number: number | string;
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
}

export interface DirectDebitChargeResponse {
  code: string;
  message: string;
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
  directDebitCharge: (data: DirectDebitChargeData) => DirectDebitChargeResponse;
  directDebitSubscribe: (
    data: DirectDebitChargeData
  ) => DirectDebitChargeResponse;
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

export declare class Subscription {
  constructor(config: object, Account: Account);

  getSubscriptions(page?: number, limit?: number): object;
  getSubscription(id: string): object;
  cancelSubscription(unsubscribeUrl: string): object;
  create(data: CreateSubscriptionData): object;
}

export interface DiscountData {
  voucherCode: string;
  accessFeeId: number;
}

export declare class Voucher {
  constructor(config: object, Account: Account);

  getDiscount(data: DiscountData): object;
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
