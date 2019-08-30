import { CommonError, AdvanceError } from './CommonInterfaces';

export interface CredentialsConfig {
  token?: string;
  refreshToken?: string;
  expires?: number;
}

export declare class Credentials {
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
  authenticate(data: AuthenticateData): object;
  signUp(data: SignUpData): object;
  signOut(): object;
  isAuthenticated(): boolean;
  getToken(): Credentials;
  setToken(token: string, refreshToken: string, expiresAt: number): void;
  refreshToken(clientId: number): object;
  reportSSOtoken(ssoDomain: string, tokenData: Credentials, retire: boolean): object;
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

export interface AccountInformationReturnError extends CommonError {}

export interface CreateAccount {
  access_token: string;
  refresh_token: string;
  account: AccountInformationReturn;
}

export interface CreateAccountError extends CommonError {}

export interface CreateAccountError422 extends AdvanceError {}

// TODO: No 200 response for deactivate account

export interface DeactivateAccountError extends CommonError {}

export interface DeactivateAccountError400 extends AdvanceError {}

// TODO: No 200 response for update account

export interface UpdateAccountError extends CommonError {}

export interface UpdateAccountError422 extends AdvanceError {}

export interface ActivationAccountRequest {
  message: string;
  code: number;
}

export interface ActivationAccountRequestError extends CommonError {}

export interface ActivationAccountRequestError422 extends AdvanceError {}

// TODO: No 200 response for activate account

export interface ActivateAccountError extends CommonError {}

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

// TODO: All followers

export interface AllFolowers {
  followers: Follower[];
}

export interface AllFolowersError extends CommonError {}

export interface AllFolowersError400 {
  code: number;
  errors?: Record<string, string>;
}

export interface AuthenticateAccountError extends CommonError {}

export interface AuthenticateAccountError422 extends AdvanceError {}

// TODO: No 200 response for ChangePassword

export interface ChangePasswordError extends CommonError {}

export interface ChangePasswordError422 extends AdvanceError {}

// TODO: No 200 response for Erase account

export interface EraseAccountError extends CommonError {}

export interface ExportAccountData {
  message: string;
  code: number;
}

export interface ExportAccountDataError extends CommonError {}

export interface EraseAccountError404 extends AdvanceError {}

export interface CreateForgotPasswordToken {
  code: number;
  message: string;
}

export interface CreateForgotPasswordTokenError extends AdvanceError {}

// TODO: No 200 response for UpdatePassword

export interface UpdatePasswordError extends AdvanceError {}

export interface Impersonate {
  master_id: number;
  follower_id: number;
  scopes: string[];
  created_at: number;
}

export interface ImpersonateError400 {
  code: number;
  errors: {
    400: string;
  };
}

export interface ImpersonateError404Or422 extends AdvanceError {}

// TODO: No 200 response for Sign out

export interface SignOutError extends CommonError {}

export interface CreateFollowerMerchantAccount {
  access_token: string;
  account: {
    master_id: number;
    scopes: string[];
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
  };
}

export interface CreateFollowerMerchantAccountError400Or403Or422
  extends AdvanceError {}

export interface CreateFollowerMerchantAccountError401Or409
  extends CommonError {}

// TODO: Same values as Impersonate

export interface UpdateMasterFollowerRelation {
  master_id: number;
  follower_id: number;
  scopes: string[];
  created_at: number;
}

export interface UpdateMasterFollowerRelationError400Or404Or409
  extends AdvanceError {}

export interface UpdateMasterFollowerRelationError422 {
  code: number;
  message: string;
  errors?: Record<string, number>;
}

// Needed individual interface GetRegisterFields property option

export interface GetRegisterFieldOption {
  string: string;
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

export interface GetRegisterFieldError extends CommonError {}

// Needed individual interface GetRegisterFields property social_urls

export interface SocialURLs {
  facebook: string;
  twitter: string;
  google: string;
}

export interface ListSocialURLs {
  social_urls: SocialURLs[];
}

export interface ListSocialURLsError extends CommonError {}

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

export interface CreateAccountV2Error extends CommonError {}

export interface CreateAccountV2Error422 extends AdvanceError {}

export interface ImpersonateV2 {
  access_token: string;
  expires: number;
  account: AccountInformationReturn;
}

export interface ImpersonateV2Error extends CommonError {}

export interface ImpersonateV2Error422 extends AdvanceError {}

export interface SendPinCode {
  code: number;
  message: string;
}

export interface SendPinCodeError extends CommonError {}

export interface ValidatePinCode {
  code: number;
  message: string;
}

export interface ValidatePinCodeError extends CommonError {}

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

export interface DeleteAccountData {
  password: string;
  brandingId: number;
}

export interface ExportData {
  password: string;
  brandingId: number;
}
