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
  signIn: string;
  signInV2: string;
  signOut: string;
  signUp: string;
  signUpV2: string;
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
    startDate?: string,
    endDate?: string,
    type?: string,
  ) => string;
  deleteAccount: string;
  exportData: string;
  reportSSOtoken: (ssoDomain: string) => string;
  sendPinCode: string;
  validatePinCode: string;
  merchantRestrictionSettings: (merchantUuid: string) => string;
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
  getCloudfrontURL: (assetId: number, videoUrl: string) => string;
  // Payment
  getPaymentMethods: string;
  getPaymentTools: (paymentMethodId: number) => string;
  payForAsset: string;
  payForAssetV2: string;
  payForAssetDonation: string;
  confirmForAssetDonation: string;
  getPayPalParams: string;
  getDefaultCreditCard: string;
  setDefaultCreditCard: string;
  getDirectDebitMandate: string;
  createDirectDebitMandate: string;
  // Subscriptions
  getSubscriptions: (limit: number, page: number) => string;
  getSubscription: (id: number) => string;
  subscribe: string;
  subscribeV2: string;
  cancelSubscription: (url: string) => string;
  // Misc
  getDlcLinks: (id: number) => string;
  getDiscount: string;
  getBranding: (merchantUuid: string, brandingId: string | number) => string;
  downloadFile: (assetId: number, filename: string) => string;
  // Code only
  requestCodeAccess: string;
  requestAccessCodeSessions: (codeId: number) => string;
  terminateSession: (codeId: number, fingerprint: string) => string;
  // Donation
  getDonations: (assetId: number) => string;
}

export interface Request {
  getToken(): CredentialsConfig | Promise<CredentialsConfig>;
  setToken(
    token: string,
    refreshToken: string,
    expiresAt: number,
  ): void | Promise<void>;
  removeToken(): void | Promise<void>;
  isAuthenticated(): boolean | Promise<boolean>;
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
  setInstanceConfig(configEnv: Env): void;
}
