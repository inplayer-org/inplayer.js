import { AxiosResponse } from 'axios';
import { CommonResponse, BaseExtend } from './CommonInterfaces';

export interface SignUpData {
  fullName: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  type: 'consumer';
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

export interface AuthenticateData {
  email: string;
  grantType?: 'password' | 'client_credentials' | 'refresh_token';
  clientId: string;
  clientSecret?: string;
  refreshToken?: string;
  referrer?: string;
  username?: string;
  password?: string;
}

export interface AuthenticateRequestBody {
  client_id: string;
  grant_type: string;
  referrer?: string;
  client_secret?: string;
  refresh_token?: string;
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

export interface UpdateAccountRequestBody {
  full_name: string;
  metadata?: { [key: string]: string };
  date_of_birth?: string;
}

export interface AccountAuthData {
  password: string;
  brandingId: number;
}

// Return data interfaces
export interface AccountData {
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

export interface CreateAccount {
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

export interface SocialURLs {
  facebook: string;
  twitter: string;
  google: string;
}

export interface ListSocialURLs {
  social_urls: SocialURLs[];
  code: number;
}

export interface GetRegisterFieldOption {
  [key: string]: string;
}

export interface RegisterField {
  id: number;
  name: string;
  label: string;
  type: string;
  required: boolean;
  default_value: string;
  placeholder: string;
  options: GetRegisterFieldOption[];
}

export interface GetRegisterFieldsResponse {
  collection: RegisterField[];
}

export interface AccountProfile {
  id: number;
  account_id: number;
  token: string;
}

export interface RestrictionSettingsData {
  age_verification_type: string;
  age_verification_enabled: boolean;
  merchant_uuid: string;
  created_at: number;
  updated_at: number;
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
export interface ProfilesData {
  id: string,
  account_id: string,
  name: string,
  avatar_url: string,
  default: boolean,
  adult: boolean,
  pin_required: boolean,
  created_at: number,
  updated_at: number,
}

export interface CollectionWithCursor<T> {
  collection: T[];
  cursor?: string;
}
export interface CollectionWithCursorArgs {
  filter?: 'all' | 'watched' | 'currently_watching';
  cursor?: string;
}
export interface Account extends BaseExtend {
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
    deactivate: boolean
  ): Promise<AxiosResponse<any>>;
  sendPinCode(brandingId?: number): Promise<AxiosResponse<CommonResponse>>;
  validatePinCode(pinCode: string): Promise<AxiosResponse<CommonResponse>>;
  syncWithExternalAccount(
    integration: string,
    itemId: number
  ): Promise<AxiosResponse<AccountProfile>>;
  updateExternalAccount(
    integratiion: string,
    body: Record<string, any>
  ): Promise<AxiosResponse<any>>;
  loadMerchantRestrictionSettings(
    merchantUuid: string
  ): Promise<AxiosResponse<RestrictionSettingsData>>;
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
  getProfiles(): Promise<AxiosResponse<ProfilesData>>;
  enterProfile(id: string, pin?:number): Promise<AxiosResponse<ProfilesData>>;
  createProfile(name: string,
    adult: boolean,
    avatar_url?: string,
    pin?:number,): Promise<AxiosResponse<ProfilesData>>;
    getProfileDetails(id: string): Promise<AxiosResponse<ProfilesData>>;
    updateProfile(id: string, name: string,
      avatar_url?: string,
     ): Promise<AxiosResponse<ProfilesData>>;
      deleteProfile(id: string): Promise<AxiosResponse<ProfilesData>>;

}
