import { CommonError, AdvanceError } from './CommonInterfaces';

export interface AccountInformationReturn {
    id: number;
    email: string;
    full_name: string;
    referrer: string;
    metadata: object;
    social_apps_metadata: Array<object>;
    roles: Array<string>;
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

//TODO: No 200 response for deactivate account

export interface DeactivateAccountError extends CommonError {}

export interface DeactivateAccountError400 extends AdvanceError {}

//TODO: No 200 response for update account

export interface UpdateAccountError extends CommonError {}

export interface UpdateAccountError422 extends AdvanceError {}

export interface ActivationAccountRequest {
    message: string;
    code: number;
}

export interface ActivationAccountRequestError extends CommonError {}

export interface ActivationAccountRequestError422 extends AdvanceError {}

//TODO: No 200 response for activate account

export interface ActivateAccountError extends CommonError {}

//TODO: One follower

export interface Follower {
    id: number;
    email: string;
    full_name: string;
    referrer: string;
    country: string;
    active: boolean;
    merchant_id: number;
    is_master: boolean;
    scopes: Array<string>;
    created_at: number;
}

//TODO: All followers

export interface AllFolowers {
    followers: Array<Follower>
}


export interface AllFolowersError extends CommonError {}

export interface AllFolowersError400 {
    code: number;
    errors?: Record<string, string>
}

export interface AuthenticateAccount {
    access_token: string;
    refresh_token: string;
    account: AccountInformationReturn
}

export interface AuthenticateAccountError extends CommonError {}

export interface AuthenticateAccountError422 extends AdvanceError {}

//TODO: No 200 response for ChangePassword

export interface ChangePasswordError extends CommonError {}

export interface ChangePasswordError422 extends AdvanceError {}

//TODO: No 200 response for Erase account

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

//TODO: No 200 response for UpdatePassword

export interface UpdatePasswordError extends AdvanceError {}

export interface Impersonate {
    master_id: number;
    follower_id: number;
    scopes: Array<string>;
    created_at: number;
}

export interface ImpersonateError400 {
    code: number;
    errors: {
        400: string;
    }
}

export interface ImpersonateError404Or422 extends AdvanceError {}

//TODO: No 200 response for Sign out

export interface SignOutError extends CommonError {}

export interface CreateFollowerMerchantAccount {
    access_token: string;
    account: {
        master_id: number;
        scopes: Array<string>;
        id: number;
        email: string;
        full_name: string;
        referrer: string;
        metadata: object;
        social_apps_metadata: Array<object>;
        roles: Array<string>;
        completed: boolean;
        created_at: number;
        updated_at: number;
    }
}

export interface CreateFollowerMerchantAccountError400Or403Or422 extends AdvanceError {}

export interface CreateFollowerMerchantAccountError401Or409 extends CommonError {}

//TODO: Same values as Impersonate

export interface UpdateMasterFollowerRelation {
    master_id: number;
    follower_id: number;
    scopes: Array<string>
    created_at: number;
}

export interface UpdateMasterFollowerRelationError400Or404Or409 extends AdvanceError {}

export interface UpdateMasterFollowerRelationError422 {
    code: number;
    message: string;
    errors?: Record<string, number>
}

//Needed individual interface GetRegisterFields property option

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
    options: Array<GetRegisterFieldOption>;
}

export interface GetRegisterFieldError extends CommonError {}

//Needed individual interface GetRegisterFields property social_urls

export interface SocialURLs {
    facebook: string;
    twitter: string;
    google: string;
}

export interface ListSocialURLs {
    social_urls: Array<SocialURLs>
}

export interface ListSocialURLsError extends CommonError {}

// ---------------------------V2---------------------------

export interface Account {
    id: number;
    email: string;
    created_at: number;
    updated_at: number;
}

export interface CreateAccountV2 {
    access_token: string;
    expires: number;
    account: Account;
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