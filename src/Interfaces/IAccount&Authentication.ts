import { AxiosResponse } from 'axios';
import { CommonResponse, AdvanceError } from './CommonInterfaces';

export interface CredentialsConfig {
  token?: string;
  refreshToken?: string;
  expires?: number;
}

export declare class Credentials {
  isExpired(): boolean;
  toObject(): CredentialsConfig;
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

export interface Account {
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
  deleteAccount(data: AccountAuthData): Promise<AxiosResponse<void>>;
  exportData(
    data: AccountAuthData
  ): Promise<AxiosResponse<CommonResponse>>;
  sendPinCode(brandingId?: number): Promise<AxiosResponse<CommonResponse>>;
  validatePinCode(pinCode: string): Promise<AxiosResponse<CommonResponse>>;
  loadMerchantRestrictionSettings(
    merchantUuid: string
  ): Promise<AxiosResponse<RestrictionSettingsData>>;
}

export interface AccountInformationReturn {
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

export interface CreateAccount {
  access_token: string;
  refresh_token: string;
  account: AccountInformationReturn;
}

// TODO: One follower

export interface Follower {
  id: number;
  email: string;
  full_name: string;
  referrer: string;
  country: string;
  active: boolean;
  merchant_id: number;
  is_master: boolean;
  scopes: string[];
  created_at: number;
}

export interface GetRegisterFieldOption {
  [key: string]: string;
}

export interface GetRegisterField {
  id: number;
  name: string;
  label: string;
  type: string;
  required: boolean;
  default_value: string;
  placeholder: string;
  options: GetRegisterFieldOption[];
}

export interface SocialURLs {
  facebook: string;
  twitter: string;
  google: string;
}

export interface ListSocialURLs {
  social_urls: SocialURLs[];
}

//  ---------------------------V2---------------------------

export interface AccountData {
  id: number;
  email: string;
  created_at: number;
  updated_at: number;
}

export interface CreateAccountV2 {
  access_token: string;
  expires: number;
  account: AccountData;
}

export interface ImpersonateV2 {
  access_token: string;
  expires: number;
  account: AccountInformationReturn;
}

export interface AuthenticateData {
  email: string;
  grantType: 'password' | 'client_credentials' | 'refresh_token';
  clientId: string;
  clientSecret?: string;
  refreshToken?: string;
  referrer?: string;
  username?: string;
  password?: string;
}

export interface SignUpData {
  fullName: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  type: 'consumer' | 'merchant';
  grantType: 'password' | 'client_credentials' | 'refresh_token';
  clientId: string;
  referrer: string;
  metadata: object[];
  brandingId: number;
}

export interface RequestNewPasswordData {
  merchantUuid: string;
  email: string;
  brandingId: number;
}

export interface SetNewPasswordData {
  password: string;
  passwordConfirmation: string;
  brandingId: number;
}

export interface UpdateAccountData {
  fullName: string;
  metadata: object[];
  dateOfBirth: string;
}

export interface ChangePasswordData {
  oldPassword: string;
  password: string;
  passwordConfirmation: string;
  brandingId: number;
}

export interface AccountAuthData {
  password: string;
  brandingId: number;
}

export interface RestrictionSettingsData {
  age_verification_type: string;
  age_verification_enabled: boolean;
  merchant_uuid: string;
  created_at: number;
  updated_at: number;
}
