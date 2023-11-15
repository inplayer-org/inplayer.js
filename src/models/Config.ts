import { AxiosRequestConfig } from 'axios';
import { CredentialsConfig, Env } from './CommonInterfaces';

export interface ApiConfig {
  BASE_URL: string;
  AWS_IOT_URL: string;
  IOT_NOTIF_URL: string;
  INPLAYER_TOKEN_KEY: string;
  INPLAYER_IOT_KEY: string;
  INPLAYER_ACCESS_CODE_NAME: (assetId: number) => string;
}

export interface ApiEndpoints {
  // Account
  signIn: string;
  signInV2: string;
  signOut: string;
  signUp: string;
  signUpV2: string;
  changePassword: string;
  requestNewPassword: string;
  setNewPassword: (token: string) => string;
  getAccountInfo: string;
  updateAccount: string;
  exportData: string;
  deleteAccount: string;
  getSocialLoginUrls: (state: string) => string;
  getRegisterFields: (merchantUuid: string) => string;
  reportSSOtoken: (ssoDomain: string) => string;
  sendPinCode: string;
  validatePinCode: string;
  requestDataCaptureNoAuthAccess: string;
  // Items
  getAsset: (assetId: number, merchantUuid: string) => string;
  getExternalAsset: (
    assetType: string,
    externalId: string,
    merchantUuid?: string
  ) => string;
  checkAccessForAsset: (id: number) => string;
  checkFreeTrial: (id: number) => string;
  getPackage: (id: number) => string;
  getAssetsInPackage: (id: number) => string;
  getAssetAccessFees: (id: number) => string;
  getCloudfrontURL: (assetId: number, videoUrl: string) => string;
  getPurchaseHistory: (status: string, page?: number, size?: number) => string;
  getPaymentHistory: string;
  getBillingReceipt: (trxToken: string) => string;
  getSignedMediaToken: (appConfigId: string, mediaId: string) => string;
  // code only
  requestCodeAccess: string;
  requestAccessCodeSessions: (codeId: number) => string;
  terminateSession: (codeId: number, fingerprint: string) => string;
  // donation
  getDonations: (assetId: number) => string;
  // Payment
  getPaymentMethods: string;
  payForAsset: string;
  payForAssetV2: string;
  getDefaultCreditCard: string;
  setDefaultCreditCard: string;
  getPayPalParams: string;
  getDirectDebitMandate: string;
  createDirectDebitMandate: string;
  payForAssetDonation: string;
  confirmForAssetDonation: string;
  validateReceipt: (platform: string) => string;
  getAssetsHistory: (
    size: number,
    page: number,
    startDate?: string,
    endDate?: string,
    type?: string
  ) => string;
  // Subscriptions
  getSubscriptions: (limit: number, page: number) => string;
  getSubscription: (id: string) => string;
  cancelSubscription: (url: string) => string;
  subscribe: string;
  subscribeV2: string;
  changeSubscriptionPlan: (
    access_fee_id: number,
    inplayer_token: string
  ) => string;
  // Voucher
  getDiscount: string;
  // Restrictions
  merchantRestrictionSettings: (merchantUuid: string) => string;
  // Branding
  getBranding: (clientId: string, brandingId: string | number) => string;
}

export interface Request {
  isAuthenticated(): boolean | Promise<boolean>;
  getToken(): CredentialsConfig | Promise<CredentialsConfig>;
  setToken(
    token: string,
    refreshToken: string,
    expiresAt: number
  ): void | Promise<void>;
  removeToken(): void | Promise<void>;
  get(
    path: string,
    headers?: Record<string, Record<string, unknown> | string | boolean>
  ): any;
  post(
    path: string,
    data: any,
    headers?: Record<string, Record<string, unknown> | string | boolean>
  ): any;
  put(
    path: string,
    data: any,
    headers?: Record<string, Record<string, unknown> | string | boolean>
  ): any;
  patch(
    path: string,
    data: any,
    headers?: Record<string, Record<string, unknown> | string | boolean>
  ): any;
  delete(
    path: string,
    headers?: Record<
      string,
      Record<string, unknown> | FormData | string | boolean
    >
  ): any;
  authenticatedGet(
    path: string,
    headers?: Record<string, Record<string, unknown> | string | boolean>
  ): any;
  authenticatedPatch(
    path: string,
    data: any,
    headers?: Record<string, Record<string, unknown> | string | boolean>
  ): any;
  authenticatedPost(
    path: string,
    data: any,
    headers?: Record<string, Record<string, unknown> | string | boolean>
  ): any;
  authenticatedPut(
    path: string,
    data: any,
    headers?: Record<string, Record<string, unknown> | string | boolean>
  ): any;
  authenticatedDelete(
    path: string,
    headers?: Record<string, Record<string, unknown> | string | boolean>
  ): any;
  setInstanceConfig(configEnv: Env, axiosConfig?: AxiosRequestConfig): void;
}
