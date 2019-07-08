export interface CredentialsConfig {
  token: string;
  refreshToken: string;
  expires: number;
}

export declare class Credentials {
  constructor({
    token = "",
    refreshToken = "",
    expires = 0
  }: CredentialsConfig);

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
  extends Omit<SetPasswordData, "brandingId"> {
  oldPassword: string;
  brandingId?: number;
}

export interface DeleteAccountData
  extends Omit<SetPasswordData, "passwordConfirmation" | "brandingId"> {
  brandingId?: number;
}

export interface UpdateAccountData {
  fullName: string;
  metadata?: { [key: string]: string };
}

export declare class Account {
  constructor(config: object);

  authenticate(data: AuthData): object;
  signUp(data: SignUpData = {}): object;
  signOut(): object;
  isAuthenticated(): boolean;
  getToken(): Credentials;
  setToken(token: string, refreshToken: string, expiresAt: number): void;
  refreshToken(clientId: string): object;
  reportSSOtoken(ssoDomain: string, tokenData: string, retire: boolean): object;
  requestNewPassword(data: RequestPasswordData): object;
  setNewPassword(data: SetPasswordData, token: string = ""): object | void;
  getAccount(): object;
  getSocialLoginUrls(state: string): object;
  updateAccount(data: UpdateAccountData): object;
  changePassword(data: ChangePasswordData): object;
  getRegisterFields(merchantUuid: string): object;
  deleteAccount(data: DeleteAccountData): object;
  exportData(data: DeleteAccountData): object;
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
    size: number = 10,
    page: number = 0,
    startDate: string = null,
    endDate: string = null
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

export declare class Payment {
  constructor(config: object, Account: Account);

  getPaymentMethods(): object;
  getPaymentTools(paymentMethodId: number): object;
  create(data: CreatePaymentData): object;
  getPayPalParams(data: PayPalParamsData): object;
  getPurchaseHistory(
    status: string = "active",
    page: number,
    limit: number
  ): object;
  getDefaultCreditCard(): object;
  setDefaultCreditCard(data: DefaultCreditCardData): object;
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

  getSubscriptions(page: number = 0, limit: number = 15): object;
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
  getPurchaseHistory: (
    status: string,
    page: number = 0,
    size: number = 5
  ) => string;
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

export declare class InPlayer {
  constructor();

  subscribe(accountUuid: string, callbackParams: any): void;
  isSubscribed(): boolean;
  unsubscribe(): void;
  setConfig(): void;
}