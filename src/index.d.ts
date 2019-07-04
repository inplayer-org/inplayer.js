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
  }: CredentialsConfig = {});

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
  requestNewPassword(data: RequestPasswordData = {}): object;
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
