import { AxiosResponse } from 'axios';

export interface CommonResponse {
  code: number;
  message: string;
}

export interface AdvanceError extends CommonResponse {
  errors?: Record<string, string>;
}

export interface CustomErrorResponse {
  status: number;
  data: CommonResponse;
}

export interface ApiEndpoints {
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
    startDate?: string,
    endDate?: string
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
  requestCodeAccess: string;
  releaseAccessCode: (code: number) => string;
}

export interface ApiConfig {
  BASE_URL: string;
  AWS_IOT_URL: string;
  IOT_NOTIF_URL: string;
  INPLAYER_TOKEN_KEY: string;
  INPLAYER_IOT_KEY: string;
  INPLAYER_ACCESS_CODE_NAME: (assetId: number) => string;
  API: ApiEndpoints;
}

export interface CredentialsConfig {
  token: string;
  refreshToken: string;
  expires: number;
}

export interface Credentials {
  token: string;
  refreshToken: string;
  expires: string;
  isExpired(): boolean;
  toObject(): CredentialsConfig;
}

interface DlcLink {
  token: string;
  filesize: string;
  thumbnail: string;
  title: string;
  file_description: string;
}


export interface DLC {
  getDlcLinks(assetId: number): Promise<AxiosResponse<DlcLink>>;
}

export interface Notifications {
  getIotToken(): object;
  subscribe(accountUuid: string, callbackParams: any): Promise<boolean>;
  handleSubscribe(data: object, callbackParams: any, uuid: string): void;
  setClient(client: any): void;
  isSubscribed(): boolean;
  unsubscribe(): void;
}