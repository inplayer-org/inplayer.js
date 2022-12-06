import qs from "qs";
import { AxiosResponse } from "axios";
import {
  CreateAccount,
  AccountData,
  ListSocialURLs,
  GetRegisterField,
  RestrictionSettingsData,
  CreateAccountV2,
  AuthenticateRequestBody,
  UpdateAccountRequestBody,
  AccountProfile,
  CollectionWithCursor,
  FavoritesData,
  WatchlistHistoryData,
  CollectionWithCursorArgs,
} from "../models/IAccount&Authentication";
import {
  CommonResponse,
  CustomErrorResponse,
} from "../models/CommonInterfaces";
import { ApiConfig, Request } from "../models/Config";
import BaseExtend from "../extends/base";
import { API } from "../constants";
import tokenStorage from "../factories/tokenStorage";

/**
 * Contains all Requests regarding user account and authentication.
 *
 * @class Account
 */
class Account extends BaseExtend {
  constructor(config: ApiConfig, request: Request) {
    super(config, request);
  }

  /**
   * Returns a boolean if the user is authenticated
   * @method isAuthenticated
   * @example
   *    InPlayer.Account.isAuthenticated()
   * @returns {boolean}
   */
  isAuthenticated = this.request.isAuthenticated;

  /**
   * Returns the OAuth token set in browser's localStorage object
   * @method getToken
   * @example
   *    InPlayer.Account.getToken()
   * @returns {CredentialsConfig} Contains the data:
   * ```typescript
   * {
   *    token: string,
   *    refreshToken: string,
   *    expires: number
   * }
   * ```
   */
  getToken = this.request.getToken;

  /**
   * Sets the Token in browser's localStorage object
   * @method setToken
   * @param {string} token The authorisation token of the logged in account.
   * @param {string} refreshToken The refresh token of the logged in account.
   * @param {number} expiresAt The token's expiration date of the logged in account.
   * @example
   *    InPlayer.Account.setToken('23b1b40-aa4f1h-1abc-j3dsg-21d36d', '528b1b80-ddd1hj-4abc-gha3j-256sa', 1558529593297)
   * @returns {void}
   */
  setToken = this.request.setToken;

  /**
   * Removes the token from browser's localStorage object
   * @method removeToken
   * @example
   *    InPlayer.Account.removeToken()
   * @returns {void}
   */
  removeToken = this.request.removeToken;

  /**
   * Signs in the user
   * @method signIn
   * @async
   * @param {string} email The customer's email address.
   * @param {string} password The customer's password.
   * @param {string} clientId The Merchant's unique universal identifier (Merchant UUID).
   * You can find it on the InPlayer's dashboard at the Account Details section as Account ID.
   * @param {string} clientSecret The coresponging client secret
   * @param {string} referrer The URL from which the request has been invoked or the location
   * where the account has been created.
   * @param {string} refreshToken The auto-generated token that enables access when the original access
   * token has expired without requiring reauthentication
   * @example
   *     InPlayer.Account.signIn({
   *      email: 'test@test.com',
   *      password: 'test123',
   *      clientId: '123-123-hf1hd1-12dhd1',
   *      referrer: 'http://localhost:3000/',
   *      refreshToken: '528b1b80-ddd1hj-4abc-gha3j-111111'
   *     })
   *     .then(data => console.log(data));
   * @returns  {AxiosResponse<CreateAccount>} Contains the data:
   * ```typescript
   * {
   *    access_token: string,
   *    refresh_token: string,
   *    expires: number;
   *    account: {
   *      id: number,
   *      email: string,
   *      full_name: string,
   *      referrer: string,
   *      metadata: Record<string, unknown>,
   *      social_apps_metadata: Object[],
   *      roles: string[],
   *      completed: boolean,
   *      date_of_birth: number,
   *      created_at: number,
   *      updated_at: number,
   *      uuid: string;
   *      merchant_uuid: string;
   *    }
   * }
   * ```
   */
  // object types must be anonymous(don't use interface or type alias)
  // in order to data params description to be shown in typedoc
  async signIn({
    email,
    clientId,
    clientSecret,
    refreshToken,
    referrer,
    password,
  }: {
    email: string;
    clientId: string;
    clientSecret?: string;
    refreshToken?: string;
    referrer?: string;
    username?: string;
    password?: string;
  }): Promise<AxiosResponse<CreateAccount>> {
    const body: AuthenticateRequestBody = {
      client_id: clientId,
      grant_type: "password",
      referrer,
    };

    if (clientSecret) {
      body.client_secret = clientSecret;
      body.grant_type = "client_credentials";
    }

    if (refreshToken) {
      body.refresh_token = refreshToken;
      body.grant_type = "refresh_token";
    } else {
      body.username = email;
      body.password = password;
    }

    const respData = await this.request.post(API.signIn, qs.stringify(body), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    await this.request.setToken(
      respData.data.access_token,
      respData.data.refresh_token,
      respData.data.expires
    );

    return respData;
  }

  /**
   * Signs in the user v2
   * @method signInV2
   * @async
   * @param {string} email The customer's email address.
   * @param {string} password The customer's password.
   * @param {string} clientId The Merchant's unique universal identifier (Merchant UUID).
   * You can find it on the InPlayer's dashboard at the Account Details section as Account ID.
   * @param {string} referrer The URL from which the request has been invoked or the location
   * where the account has been created.
   * @example
   *     InPlayer.Account.signInV2({
   *      email: 'test@test.com',
   *      password: 'test123',
   *      clientId: '123-123-hf1hd1-12dhd1',
   *      referrer: 'http://localhost:3000/',
   *     })
   *     .then(data => console.log(data));
   * @returns  {AxiosResponse<CreateAccountV2>} Contains the data:
   * ```typescript
   * {
   *    access_token: string,
   *    refresh_token: string,
   *    expires: number;
   *    account: {
   *      id: number,
   *      email: string,
   *      full_name: string,
   *      referrer: string,
   *      metadata: Record<string, unknown>,
   *      social_apps_metadata: Object[],
   *      roles: string[],
   *      completed: boolean,
   *      date_of_birth: number,
   *      created_at: number,
   *      updated_at: number,
   *      uuid: string;
   *      merchant_uuid: string;
   *    }
   * }
   * ```
   */
  // object types must be anonymous(don't use interface or type alias)
  // in order to data params description to be shown in typedoc
  async signInV2({
    email,
    clientId,
    referrer,
    password,
  }: {
    email: string;
    clientId: string;
    referrer: string;
    password: string;
  }): Promise<AxiosResponse<CreateAccountV2>> {
    const body = {
      client_id: clientId,
      grant_type: "password",
      referrer,
      username: email,
      password,
    };

    const respData = await this.request.post(API.signInV2, qs.stringify(body), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    await this.request.setToken(
      respData.data.access_token,
      respData.data.refresh_token,
      respData.data.expires
    );

    return respData;
  }

  /**
   * Signs up/Registers user
   * @method signUp
   * @async
   * @param {string} fullName The customer's first and last name.
   * @param {string} email The customer's email address.
   * @param {string} password The password containing minimum 8 characters.
   * @param {string} passwordConfirmation The same password with minimum 8 characters.
   * @param {string} clientId The Merchant's unique universal identifier (Merchant UUID).
   * You can find it on the InPlayer's dashboard at the Account Details section as Account ID.
   * @param {string} type The account type (i.e 'consumer').
   * @param {string} referrer The URL from which the request has been invoked or the location
   * where the account has been created.
   * @param {number} brandingId The id of created branding theme in InPlayer Dashboard.
   * If it is not set the default branding details will be returned.
   * @param {Object} metadata The additional required and/or optional fields that merchants
   * can choose to require from their end-users to fill in upon registration.
   * @example
   *     InPlayer.Account.signUp({
   *      fullName: "test",
   *      email: "test32@test.com",
   *      password: "12345678",
   *      passwordConfirmation: "12345678",
   *      clientId: "528b1b80-5868-4abc-a9b6-4d3455d719c8",
   *      type: "consumer",
   *      referrer: "http://localhost:3000/",
   *      brandingId?: 12345,
   *      metadata : { country: "Macedonia" },
   *     })
   *     .then(data => console.log(data));
   * @returns  {AxiosResponse<CreateAccount>} Contains the data:
   * ```typescript
   * {
   *    access_token: string;
   *    refresh_token: string;
   *    expires: number;
   *    account: {
   *      id: number,
   *      email: string,
   *      full_name: string,
   *      referrer: string,
   *      metadata: Record<string, unknown>,
   *      social_apps_metadata: Object[],
   *      roles: string[],
   *      completed: boolean,
   *      date_of_birth: number,
   *      created_at: number,
   *      updated_at: number,
   *      uuid: string;
   *      merchant_uuid: string;
   *    }
   * }
   * ```
   */
  // object types must be anonymous(don't use interface or type alias)
  // in order to data params description to be shown in typedoc
  async signUp({
    fullName,
    email,
    password,
    passwordConfirmation,
    type,
    clientId,
    referrer,
    metadata,
    brandingId,
  }: {
    fullName: string;
    email: string;
    password: string;
    passwordConfirmation: string;
    type: "consumer";
    clientId: string;
    referrer: string;
    metadata?: { [key: string]: string };
    brandingId?: number;
  }): Promise<AxiosResponse<CreateAccount>> {
    const body = {
      full_name: fullName,
      username: email,
      password,
      password_confirmation: passwordConfirmation,
      client_id: clientId,
      type,
      referrer,
      grant_type: "password",
      metadata,
      branding_id: brandingId,
    };

    const resp = await this.request.post(API.signUp, qs.stringify(body), {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });

    await this.request.setToken(
      resp.data.access_token,
      resp.data.refresh_token,
      resp.data.expires
    );

    return resp;
  }

  /**
   * Signs up/Registers user v2
   * @method signUpV2
   * @async
   * @param {string} fullName The customer's first and last name
   * @param {string} email The customer's email address
   * @param {string} password The password containing minimum 8 characters
   * @param {string} passwordConfirmation The same password with minimum 8 characters
   * @param {string} clientId The Merchant's unique universal identifier (Merchant UUID).
   * You can find it on the InPlayer's dashboard at the Account Details section as Account ID.
   * @param {string} type The account type (i.e 'consumer')
   * @param {string} referrer The URL from which the request has been invoked or the location
   * where the account has been created.
   * @param {number} brandingId The id of created branding theme in InPlayer Dashboard.
   * If it is not set the default branding details will be returned.
   * @param {Object} metadata The additional required and/or optional fields that merchants
   * can choose to require from their end-users to fill in upon registration.
   * @example
   *     InPlayer.Account.signUpV2({
   *      fullName: "test",
   *      email: "test32@test.com",
   *      password: "12345678",
   *      passwordConfirmation: "12345678",
   *      clientId: "528b1b80-5868-4abc-a9b6-4d3455d719c8",
   *      type: "consumer",
   *      referrer: "http://localhost:3000/",
   *      brandingId?: 12345,
   *      metadata : { country: "Macedonia" },
   *     })
   *     .then(data => console.log(data));
   * @returns  {AxiosResponse<CreateAccount>} Contains the data:
   * ```typescript
   * {
   *    access_token: string;
   *    refresh_token: string;
   *    expires: number;
   *    account: {
   *      id: number,
   *      email: string,
   *      full_name: string,
   *      referrer: string,
   *      metadata: Record<string, unknown>,
   *      social_apps_metadata: Object[],
   *      roles: string[],
   *      completed: boolean,
   *      date_of_birth: number,
   *      created_at: number,
   *      updated_at: number,
   *      uuid: string;
   *      merchant_uuid: string;
   *    }
   * }
   * ```
   */
  // object types must be anonymous(don't use interface or type alias)
  // in order to data params description to be shown in typedoc
  async signUpV2({
    fullName,
    email,
    password,
    passwordConfirmation,
    clientId,
    type = "consumer",
    referrer,
    metadata,
    brandingId,
  }: {
    fullName: string;
    email: string;
    password: string;
    passwordConfirmation: string;
    clientId: string;
    type: "consumer";
    referrer: string;
    metadata?: { [key: string]: string };
    brandingId?: number;
  }): Promise<AxiosResponse<CreateAccount>> {
    const body = {
      full_name: fullName,
      username: email,
      password,
      password_confirmation: passwordConfirmation,
      client_id: clientId,
      type,
      referrer,
      grant_type: "password",
      metadata,
      branding_id: brandingId,
    };

    const resp = await this.request.post(API.signUpV2, qs.stringify(body), {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });

    await this.request.setToken(
      resp.data.access_token,
      resp.data.refresh_token,
      resp.data.expires
    );

    return resp;
  }

  /**
   * Signs out the user and destroys cookies
   * @method signOut
   * @async
   * @example
   *     InPlayer.Account.signOut()
   *     .then(data => console.log(data));
   * @returns  {AxiosResponse<undefined>}
   */
  async signOut(): Promise<AxiosResponse<undefined>> {
    const tokenObject = await this.request.getToken();

    const response = await this.request.get(API.signOut, {
      headers: { Authorization: `Bearer ${tokenObject.token}` },
    });

    await this.request.removeToken();

    return response;
  }

  /**
   * Refreshes the token
   * @method refreshToken
   * @async
   * @param {string} clientId The Merchant's unique universal identifier (Merchant UUID).
   * You can find it on the InPlayer's dashboard at the Account Details section as Account ID.
   * @throws Will throw an HTTP 401 error if the refresh token is not present.
   * @example
   *     InPlayer.Account.refreshToken('123123121-d1-t1-1ff').then(data => console.log(data))
   * @returns  {AxiosResponse<CreateAccount>} Contains the data:
   * ```typescript
   * {
   *    access_token: string;
   *    refresh_token: string;
   *    expires: number;
   *    account: {
   *      id: number,
   *      email: string,
   *      full_name: string,
   *      referrer: string,
   *      metadata: Record<string, unknown>,
   *      social_apps_metadata: Object[],
   *      roles: string[],
   *      completed: boolean,
   *      date_of_birth: number,
   *      created_at: number,
   *      updated_at: number,
   *      uuid: string;
   *      merchant_uuid: string;
   *    }
   * }
   * ```
   */
  async refreshToken(clientId: string): Promise<AxiosResponse<CreateAccount>> {
    const tokenObject = await this.request.getToken();

    if (!tokenObject.refreshToken) {
      const response: CustomErrorResponse = {
        status: 401,
        data: {
          code: 401,
          message: "The refresh token is not present",
        },
      };

      // eslint-disable-next-line no-throw-literal
      throw { response };
    }

    const body = {
      refresh_token: tokenObject.refreshToken,
      client_id: clientId,
      grant_type: "refresh_token",
    };

    const responseData = await this.request.post(
      API.signIn,
      qs.stringify(body),
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );

    return responseData;
  }

  /**
   * Reports the generated SSO token to the SSO domain.
   * @param {string} ssoDomain The SSO domain.
   * @param {string} token The authorisation token of the logged in account.
   * @param {boolean} deactivate Should the token be deactivated or activated.
   * If it is not set the token won't be deactivated.
   * @returns {AxiosResponse<any>}
   */
  async reportSSOtoken(
    ssoDomain: string,
    token: string,
    deactivate = false
  ): Promise<AxiosResponse<any>> {
    const body = new FormData();

    body.append("token", token);
    body.append("delete", deactivate ? "1" : "0");

    // TODO: Check if global withCredentials works
    return this.request.post(API.reportSSOtoken(ssoDomain), body, {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    });
  }

  /**
   * Requests new password for a given user
   * @method requestNewPassword
   * @async
   * @param {string} email The customer's email address.
   * @param {string} merchantUuid The Merchant's unique universal identifier (Merchant UUID).
   * You can find it on the InPlayer's dashboard at the Account Details section as Account ID.
   * @param {number} brandingId The id of created branding theme in InPlayer Dashboard.
   * If it is not set the default branding details will be returned.
   * @example
   *     InPlayer.Account
   *     .requestNewPassword({
   *      email: "test32@test.com",
   *      merchantUuid: "528b1b80-5868-4abc-a9b6-4d3455d719c8",
   *      brandingId: 12345,
   *     })
   *     .then(data => console.log(data));
   * @returns Promise<AxiosResponse<CommonResponse>> Contains the data:
   * ```typescript
   * {
   *    code: 200,
   *    message: ''
   * }
   * ```
   */
  // object types must be anonymous(don't use interface or type alias)
  // in order to data params description to be shown in typedoc
  async requestNewPassword({
    email,
    merchantUuid,
    brandingId,
  }: {
    email: string;
    merchantUuid: string;
    brandingId: number;
  }): Promise<AxiosResponse<CommonResponse>> {
    const body = {
      email,
      merchant_uuid: merchantUuid,
      branding_id: brandingId,
    };

    return this.request.post(API.requestNewPassword, qs.stringify(body), {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
  }

  /**
   * Sets new password for the user
   * @method setNewPassword
   * @async
   * @param {string} password The new password with minimum 8 characters.
   * @param {string} passwordConfirmation The same new password with minimum 8 characters.
   * @param {number} brandingId The id of created branding theme in InPlayer Dashboard.
   * If it is not set the default branding details will be returned.
   * @param {string} token The reset token from received email message after successfull
   * new password request.
   * @example
   *     InPlayer.Account
   *     .setNewPassword({
   *      password: "password",
   *      passwordConfirmation: "password",
   *      brandingId: "12345",
   *     }, 'afhqi83rji74hjf7e43df')
   *     .then(data => console.log(data));
   * @returns {AxiosResponse<void>}
   */
  // object types must be anonymous(don't use interface or type alias)
  // in order to data params description to be shown in typedoc
  async setNewPassword(
    {
      password,
      passwordConfirmation,
      brandingId,
    }: {
      password: string;
      passwordConfirmation: string;
      brandingId: number;
    },
    token = ""
  ): Promise<AxiosResponse<void>> {
    // TODO: check logic
    // eslint-disable-next-line max-len
    const encodePassword = encodeURIComponent(password);
    const encodePasswordConfirm = encodeURIComponent(passwordConfirmation);
    const body = `password=${encodePassword}&password_confirmation=${encodePasswordConfirm}&branding_id=${brandingId}`;

    return this.request.put(API.setNewPassword(token), body, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
  }

  /**
   * Creates or returns an existing external account integrated with an InPlayer fan account
   * @method syncWithExternalAccount
   * @async
   * @param {string} integration The name of the external integration
   * @param {number} itemId The id of created premium content in InPlayer Dashboard (i.e asset id or package id).
   * @example
   *     InPlayer.Account
   *     .syncWithExternalAccount('livelike', 12345)
   *     .then(data => console.log(data));
   * @returns  {AxiosResponse<AccountProfile>} Contains the data:
   * ```typescript
   * {
   *    id: 3, // The record id
   *    account_id: 54321, // The InPlayer account id
   *    token: '45b1b30-aa2f1h-9abc-j5dsg-78d36d' // The external integration longlived token
   * }
   * ```
   */
  async syncWithExternalAccount(
    integration: string,
    itemId: number
  ): Promise<AxiosResponse<AccountProfile>> {
    const body = { item_id: itemId };

    const tokenObject = await this.request.getToken();

    return this.request.post(
      API.externalAccount(integration),
      qs.stringify(body),
      {
        headers: {
          Authorization: `Bearer ${tokenObject.token}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
  }

  /**
   * Updates an existing external account integrated with an InPlayer fan account
   * @method updateExternalAccount
   * @async
   * @param {string} integration The name of the external integration
   * The additional required and/or optional fields that merchants
   * can choose to require from their end-users to fill in upon registration.
   * @param {Object} body The external account fields with updated by user values
   * (For example: new nickname value)
   * @example
   *     InPlayer.Account
   *     .updateExternalAccount('livelike', { nickname: 'My New Nickname' })
   *     .then(data => console.log(data));
   * @returns  {AxiosResponse<any>}
   */
  async updateExternalAccount(
    integration: string,
    body: Record<string, any>
  ): Promise<AxiosResponse<any>> {
    const tokenObject = await this.request.getToken();

    return this.request.patch(
      API.externalAccount(integration),
      qs.stringify(body),
      {
        headers: {
          Authorization: `Bearer ${tokenObject.token}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
  }

  /**
   * Gets the account information for a given auth token
   * @method getAccountInfo
   * @async
   * @example
   *     InPlayer.Account
   *     .getAccountInfo()
   *     .then(data => console.log(data));
   * @returns  {AxiosResponse<AccountData>} Contains the data:
   * ```typescript
   * {
   *    id: number;
   *    email: string;
   *    full_name: string;
   *    referrer: string;
   *    metadata: Record<string, unknown>;
   *    social_apps_metadata: Record<string, unknown>[];
   *    roles: string[];
   *    completed: boolean;
   *    created_at: number;
   *    updated_at: number;
   *    date_of_birth: number;
   *    uuid: string;
   *    merchant_uuid: string;
   * }
   * ```
   */
  async getAccountInfo(): Promise<AxiosResponse<AccountData>> {
    const tokenObject = await this.request.getToken();

    return this.request.get(API.getAccountInfo, {
      headers: { Authorization: `Bearer ${tokenObject.token}` },
    });
  }

  /**
   * Gets the social login urls for fb/twitter/google
   * @method getSocialLoginUrls
   * @async
   * @param {string} state The social login state.
   * The state needs to be json and base64 encoded to be sent as a query parameter.
   * Example: btoa(JSON.stringify({uuid: 'foo', redirect: 'http://example.com'}))
   * @example
   *     InPlayer.Account
   *     .getSocialLoginUrls('123124-1r-1r13ur1h1')
   *     .then(data => console.log(data));
   * @returns  {AxiosResponse<ListSocialURLs>} Contains the data:
   * ```typescript
   * {
   *    ocial_urls: [
   *      facebook: string;
   *      twitter: string;
   *      google: string;
   *    ];
   *    code: number;
   * }
   * ```
   */
  async getSocialLoginUrls(
    state: string
  ): Promise<AxiosResponse<ListSocialURLs>> {
    return this.request.get(API.getSocialLoginUrls(state));
  }

  /**
   * Updates the account info. Metadata fields must be from the Inplayer.getRegisterFields()
   * @method updateAccount
   * @async
   * @param {string} fullName The customer's first and last name
   * @param {Record<string, unknown>[]} metadata The additional required and/or optional fields that merchants
   * can choose to require from their end-users to fill in upon registration.
   * @param {number} dateOfBirth The customer's birthdate. Unix timestamp
   * conditionally required in case if the merchant has enabled the 'age verification' feature.
   * @example
   *     InPlayer.Account
   *     .updateAccount({fullName: 'test test', metadata: {country: 'Germany'},  dateOfBirth: '1999-03-05'})
   *     .then(data => console.log(data));
   * @returns  {AxiosResponse<void>}
   */
  // object types must be anonymous(don't use interface or type alias)
  // in order to data params description to be shown in typedoc
  async updateAccount({
    fullName,
    metadata,
    dateOfBirth,
  }: {
    fullName: string;
    metadata?: { [key: string]: string };
    dateOfBirth?: string;
  }): Promise<AxiosResponse<AccountData>> {
    const body: UpdateAccountRequestBody = {
      full_name: fullName,
    };

    if (metadata) {
      body.metadata = metadata;
    }
    if (dateOfBirth) {
      body.date_of_birth = dateOfBirth;
    }

    const tokenObject = await this.request.getToken();

    return this.request.put(API.updateAccount, qs.stringify(body), {
      headers: {
        Authorization: `Bearer ${tokenObject.token}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
  }

  /**
   * Changes password for a given user
   * @method changePassword
   * @async
   * @param {string} oldPassword The customer's old password.
   * @param {string} password The customer's new password with minimum 8 characters.
   * @param {string} passwordConfirmation The same new password with minimum 8 characters.
   * @param {number} brandingId The id of created branding theme in InPlayer Dashboard.
   * If it is not set the default branding details will be returned.
   * @example
   *     InPlayer.Account
   *     .changePassword({
   *       oldPassword: 'old123',
   *       password: 'test123',
   *       passwordConfirmation: 'test123'
   *       brandingId: 1234
   *     })
   *     .then(data => console.log(data));
   * @returns  {AxiosResponse<void>}
   */
  // object types must be anonymous(don't use interface or type alias)
  // in order to data params description to be shown in typedoc
  async changePassword({
    password,
    passwordConfirmation,
    oldPassword,
    brandingId,
  }: {
    password: string;
    passwordConfirmation: string;
    oldPassword: string;
    brandingId?: number;
  }): Promise<AxiosResponse<void>> {
    const body = {
      old_password: oldPassword,
      password,
      password_confirmation: passwordConfirmation,
      branding_id: brandingId,
    };

    const tokenObject = await this.request.getToken();

    return this.request.post(API.changePassword, qs.stringify(body), {
      headers: {
        Authorization: `Bearer ${tokenObject.token}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
  }

  /**
   * Gets register fields
   * @method getRegisterFields
   * @async
   * @param {string} merchantUuid The Merchant's unique universal identifier (Merchant UUID).
   * You can find it on the InPlayer's dashboard at the Account Details section as Account ID.
   * @example
   *     InPlayer.Account
   *     .getRegisterFields('123124-1r-1r13ur1h1')
   *     .then(data => console.log(data));
   * @returns  {AxiosResponse<GetRegisterField>} Contains the data:
   * ```typescript
   * {
   *    id: number;
   *    name: string;
   *    label: string;
   *    type: string;
   *    required: boolean;
   *    default_value: string;
   *    placeholder: string;
   *    options: [{
   *      [key: string]: string;
   *    }];
   * }
   * ```
   */
  async getRegisterFields(
    merchantUuid = ""
  ): Promise<AxiosResponse<GetRegisterField>> {
    return this.request.get(API.getRegisterFields(merchantUuid));
  }

  /**
   * Deletes an account
   * @method deleteAccount
   * @async
   * @param {string} password The customer's password.
   * @param {number} brandingId The id of created branding theme in InPlayer Dashboard.
   * If it is not set the default branding details will be returned.
   * @example
   *     InPlayer.Account.deleteAccount({
   *      password: "password",
   *      brandingId: 1234,
   *     })
   *     .then(data => console.log(data));
   * @returns  {AxiosResponse<CommonResponse>} Contains the data:
   * ```typescript
   * {
   *    code: 200,
   *    message: "Account successfully deleted"
   * }
   * ```
   */
  async deleteAccount({
    password,
    brandingId,
  }: {
    password: string;
    brandingId?: number;
  }): Promise<AxiosResponse<CommonResponse>> {
    const body = {
      password,
      branding_id: brandingId,
    };

    const tokenObject = await this.request.getToken();

    const response = await this.request.delete(API.deleteAccount, {
      headers: {
        Authorization: `Bearer ${tokenObject.token}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: qs.stringify(body),
    });

    await Promise.all([
      tokenStorage.removeItem(this.config.INPLAYER_TOKEN_KEY),
      tokenStorage.removeItem(this.config.INPLAYER_IOT_KEY),
    ]);

    return response;
  }

  /**
   * Exports account data to the users' email
   * @method exportData
   * @async
   * @param {string} password The customer's password.
   * @param {number} brandingId The id of created branding theme in InPlayer Dashboard.
   * If it is not set the default branding details will be returned.
   * @example
   *     InPlayer.Account.exportData({
   *        password: "password",
   *        brandingId: 1234,
   *     })
   *     .then(data => console.log(data));
   * @returns  {AxiosResponse<CommonResponse>} Contains the data:
   * ```typescript
   * {
   *    code: 200,
   *    message: "Account successfully exported"
   * }
   * ```
   */
  async exportData({
    password,
    brandingId,
  }: {
    password: string;
    brandingId?: number;
  }): Promise<AxiosResponse<CommonResponse>> {
    const body = {
      password,
      branding_id: brandingId,
    };

    const tokenObject = await this.request.getToken();

    return this.request.post(API.exportData, qs.stringify(body), {
      headers: {
        Authorization: `Bearer ${tokenObject.token}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
  }

  /**
   * Creates pin code and sends it to the users' email
   * @method sendPinCode
   * @async
   * @param {number} brandingId The id of created branding theme in InPlayer Dashboard.
   * If it is not set the default branding details will be returned.
   * @example
   *     InPlayer.Account.sendPinCode(1234)
   *     .then(data => console.log(data));
   * @returns  {AxiosResponse<CommonResponse>} Contains the data:
   * ```typescript
   * {
   *    code: 200,
   *    message: "Pin code successfully sent"
   * }
   * ```
   */
  async sendPinCode(
    brandingId: number
  ): Promise<AxiosResponse<CommonResponse>> {
    const body = {
      branding_id: brandingId,
    };

    const tokenObject = await this.request.getToken();

    return this.request.post(API.sendPinCode, qs.stringify(body), {
      headers: {
        Authorization: `Bearer ${tokenObject.token}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
  }

  /**
   * Checks validity of pin code
   * @method validatePinCode
   * @async
   * @param {string} pinCode The pin code from received email message.
   * @example
   *     InPlayer.Account.validatePinCode('5566')
   *     .then(data => console.log(data));
   * @returns  {AxiosResponse<CommonResponse>} Contains the data:
   * ```typescript
   * {
   *    code: 200,
   *    message: "Pin code is valid"
   * }
   * ```
   */

  async validatePinCode(
    pinCode: string
  ): Promise<AxiosResponse<CommonResponse>> {
    const body = {
      pin_code: pinCode,
    };

    const tokenObject = await this.request.getToken();

    return this.request.post(API.validatePinCode, qs.stringify(body), {
      headers: {
        Authorization: `Bearer ${tokenObject.token}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
  }

  /**
   * Returns restriction settings per Merchant
   * @method loadMerchantRestrictionSettings
   * @async
   * @param {string} merchantUuid The Merchant's unique universal identifier (Merchant UUID).
   * You can find it on the InPlayer's dashboard at the Account Details section as Account ID.
   * @example
   *     InPlayer.Account
   *     .loadMerchantRestrictionSettings("528b1b80-5868-4abc-a9b6-4d3455d719c8")
   *     .then(data => console.log(data));
   * @returns  {AxiosResponse<RestrictionSettingsData>} Contains the data:
   * ```typescript
   * {
   *     "age_verification_type": "pin_code",
   *     "age_verification_enabled": true,
   *     "merchant_uuid": "3b39b5ab-b5fc-4ba3-b770-73155d20e61f",
   *     "created_at": 1532425425,
   *     "updated_at": 1532425425
   * }
   * ```
   */
  async loadMerchantRestrictionSettings(
    merchantUuid: string
  ): Promise<AxiosResponse<RestrictionSettingsData>> {
    return this.request.get(API.merchantRestrictionSettings(merchantUuid));
  }

  /**
   * Returns the viewer's favorite media items
   * @method getFavorites
   * @async
   * @example
   *     InPlayer.Account
   *     .getFavorites()
   *     .then(data => console.log(data));
   * @returns  {AxiosResponse<CollectionWithCursor<FavoritesData>>} Contains the data:
   * ```typescript
   * {
   * 	"collection": [{
   * 		"media_id": "awWEFyPu",
   * 		"created_at": 1532425425
   * 	}],
   * 	"cursor": "https://services.inplayer.com/v2/accounts/media/favorites?cursor=Ksm34SUn3j23j3"
   * }
   * ```
   */
  async getFavorites(): Promise<
    AxiosResponse<CollectionWithCursor<FavoritesData>>
  > {
    const tokenObject = await this.request.getToken();
    return this.request.get(API.getFavorites, {
      headers: {
        Authorization: `Bearer ${tokenObject.token}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
  }

  /**
   * Returns the viewer's favorite media item
   * @method getFavorite
   * @param {string} mediaId The external ID
   * @async
   * @example
   *     InPlayer.Account
   *     .getFavorite()
   *     .then(data => console.log(data));
   * @returns  {AxiosResponse<FavoritesData>} Contains the data:
   * ```typescript
   *  {
   * 		"media_id": "awWEFyPu",
   * 		"created_at": 1532425425
   * 	}
   * ```
   */
  async getFavorite(mediaId: string): Promise<AxiosResponse<FavoritesData>> {
    const tokenObject = await this.request.getToken();
    return this.request.get(API.getFavorite(mediaId), {
      headers: {
        Authorization: `Bearer ${tokenObject.token}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
  }

  /**
   * Returns the viewer's favorite media item
   * @method addToFavorites
   * @param {string} mediaId The external ID
   * @async
   * @example
   *     InPlayer.Account
   *     .addToFavorites("awWEFyPu")
   *     .then(data => console.log(data));
   * @returns  {AxiosResponse<FavoritesData>} Contains the data:
   * ```typescript
   *  {
   * 		"media_id": "awWEFyPu",
   * 		"created_at": 1532425425
   * 	}
   * ```
   */
  async addToFavorites(mediaId: string): Promise<AxiosResponse<FavoritesData>> {
    const body = {
      media_id: mediaId,
    };

    const tokenObject = await this.request.getToken();
    return this.request.post(API.getFavorites, qs.stringify(body), {
      headers: {
        Authorization: `Bearer ${tokenObject.token}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
  }

  /**
   * Deletes viewer's favorite media item
   * @method getFavorite
   * @param {string} mediaId The external ID
   * @async
   * @example
   *     InPlayer.Account
   *     .deleteFromFavorites("awWEFyPu")
   *     .then(data => console.log(data));
   * @returns  {AxiosResponse<CommonResponse>} Contains the data:
   * ```typescript
   *  {
   * 		"message": "Media item has been successfully removed from favorites.",
   * 		"code": 200
   * 	}
   * ```
   */
  async deleteFromFavorites(
    mediaId: string
  ): Promise<AxiosResponse<CommonResponse>> {
    const tokenObject = await this.request.getToken();

    return this.request.delete(API.getFavorite(mediaId), {
      headers: {
        Authorization: `Bearer ${tokenObject.token}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
  }

  /**
   * Returns the viewer's watchlist history
   * @method getWatchHistory
   * @param {string} filter the filter can be one of all, watched or currently_watching. The default is: currently_watching
   * @param {string} cursor the url for the next page of the results
   * @async
   * @example
   *     InPlayer.Account
   *     .getWatchHistory({filter:"all"})
   *     .then(data => console.log(data));
   * @returns  {CollectionWithCursor<WatchlistHistoryData>} Contains the data:
   * ```typescript
   * {
   * 	"collection": [{
   * 		"media_id": "awWEFyPu",
   *    "progress": 0.8577555,
   * 		"created_at": 1532425425,
   *    "updated_at": 1532425425
   * 	}],
   * 	"cursor": "https://services.inplayer.com/v2/accounts/media/watchlist-history?cursor=Ksm34SUn3j23j3"
   * }
   * ```
   */
  async getWatchHistory({
    filter = "currently_watching",
    cursor = "",
  }: CollectionWithCursorArgs): Promise<
    AxiosResponse<CollectionWithCursor<WatchlistHistoryData>>
  > {
    const tokenObject = await this.request.getToken();
    return this.request.get(
      `${API.getWatchHistory}?filter=${filter}&cursor=${cursor}`,
      {
        headers: {
          Authorization: `Bearer ${tokenObject.token}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
  }

  /**
   * Returns the viewer's watchlist history media item
   * @method getWatchHistoryForItem
   * @param {string} mediaId The external ID
   * @async
   * @example
   *     InPlayer.Account
   *     .getWatchHistoryForItem("awWEFyPu")
   *     .then(data => console.log(data));
   * @returns  {AxiosResponse<WatchlistHistoryData>} Contains the data:
   * ```typescript
   *  {
   * 		"media_id": "awWEFyPu",
   *    "progress": 0.4848484444,
   * 		"created_at": 1532425425,
   *    "updated_at": 1532425425
   * 	}
   * ```
   */
  async getWatchHistoryForItem(
    mediaId: string
  ): Promise<AxiosResponse<WatchlistHistoryData>> {
    const tokenObject = await this.request.getToken();
    return this.request.get(API.getWatchHistoryForItem(mediaId), {
      headers: {
        Authorization: `Bearer ${tokenObject.token}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
  }

  /**
   * Updates the viewer's watchlist history media item
   * @method updateWatchHistory
   * @param {string} mediaId The external ID
   * @param {number} progress The progress of the watched video in percent
   * @async
   * @example
   *     InPlayer.Account
   *     .updateWatchHistory("awWEFyPu", 0.3434)
   *     .then(data => console.log(data));
   * @returns  {AxiosResponse<WatchlistHistoryData>} Contains the data:
   * ```typescript
   *  {
   * 		"media_id": "awWEFyPu",
   *    "progress": 0.3434444,
   * 		"created_at": 1532425425,
   *    "updated_at": 1532434467
   * 	}
   * ```
   */
  async updateWatchHistory(
    mediaId: string,
    progress: number
  ): Promise<AxiosResponse<WatchlistHistoryData>> {
    const body = {
      media_id: mediaId,
      progress: progress,
    };
    const tokenObject = await this.request.getToken();
    return this.request.patch(API.getWatchHistory, qs.stringify(body), {
      headers: {
        Authorization: `Bearer ${tokenObject.token}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
  }

  /**
   * Deletes viewer's watchlist history media item
   * @method deleteWatchHistoryForItem
   * @param {string} mediaId The external ID
   * @async
   * @example
   *     InPlayer.Account
   *     .deleteWatchHistoryForItem("awWEFyPu")
   *     .then(data => console.log(data));
   * @returns  {AxiosResponse<CommonResponse>} Contains the data:
   * ```typescript
   *  {
   * 		"message": "Media item has been successfully removed from the list.",
   * 		"code": 200
   * 	}
   * ```
   */
  async deleteWatchHistoryForItem(
    mediaId: string
  ): Promise<AxiosResponse<CommonResponse>> {
    const tokenObject = await this.request.getToken();
    return this.request.delete(API.getWatchHistoryForItem(mediaId), {
      headers: {
        Authorization: `Bearer ${tokenObject.token}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
  }
}

export default Account;
