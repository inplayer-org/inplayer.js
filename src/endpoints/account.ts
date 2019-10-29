import qs from 'qs';
import {
  AuthenticateData,
  SignUpData,
  RequestNewPasswordData,
  SetNewPasswordData,
  UpdateAccountData,
  ChangePasswordData,
  AccountAuthData,
} from '../models/IAccount&Authentication';
import { CustomErrorResponse, ApiConfig, Request } from '../models/CommonInterfaces';
import Credentials from '../factories/credentials';
import BaseExtend from '../extends/base';
import { API } from '../constants/endpoints';

/**
 * Contains all Requests regarding user/account and authentication
 *
 * @class Account
 */
class Account extends BaseExtend {
  constructor(config: ApiConfig, request: Request) {
    super(config, request);
  }

  /**
   * Signs in the user
   * @method signIn
   * @async
   * @typedef {Object} AxiosResponse<CreateAccount>
   * @param {AuthenticateData} data - Contains {
   *  email: string,
   *  password: string,
   *  clientId: string,
   *  clientSecret: string,
   *  referrer: string,
   *  refreshToken: string,
   * }
   * @example
   *     InPlayer.Account.signIn({
   *      email: 'test@test.com',
   *      password: 'test123',
   *      clientId: '123-123-hf1hd1-12dhd1',
   *      referrer: 'http://localhost:3000/',
   *      refreshToken: '528b1b80-ddd1hj-4abc-gha3j-111111'
   *     })
   *     .then(data => console.log(data));
   * @return {AxiosResponse<CreateAccount>}
   */
  async signIn(data: AuthenticateData) {
    const body: any = {
      client_id: data.clientId,
      grant_type: 'password',
      referrer: data.referrer,
    };

    if (data.clientSecret) {
      body.client_secret = data.clientSecret;
      body.grant_type = 'client_credentials';
    }

    if (data.refreshToken) {
      body.refresh_token = data.refreshToken;
      body.grant_type = 'refresh_token';
    } else {
      body.username = data.email;
      body.password = data.password;
    }

    const respData = await this.request.post(
      API.signIn,
      qs.stringify(body),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );

    this.request.setToken(
      respData.data.access_token,
      respData.data.refresh_token,
      respData.data.expires,
    );

    return respData;
  }

  /**
   * Signs up/Registers user
   * @method signUp
   * @async
   * @param {SignUpData} data - Contains {
   *  fullName: string,
   *  email: string
   *  password: string,
   *  passwordConfirmation: string,
   *  clientId: string,
   *  type: string,
   *  referrer: string,
   *  brandingId?: number,
   *  metadata?: { [key: string]: string }\
   *  dateOfBirth?: string,
   * }
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
   * @return {AxiosResponse<CreateAccount>}
   */
  async signUp(data: SignUpData) {
    const body = {
      full_name: data.fullName,
      username: data.email,
      password: data.password,
      password_confirmation: data.passwordConfirmation,
      client_id: data.clientId,
      type: data.type,
      referrer: data.referrer,
      grant_type: 'password',
      metadata: data.metadata,
      branding_id: data.brandingId,
    };

    const resp = await this.request.post(
      API.signUp,
      qs.stringify(body),
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      },
    );

    this.request.setToken(
      resp.data.access_token,
      resp.data.refresh_token,
      resp.data.expires,
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
   * @return {AxiosResponse<undefined>}
   */
  async signOut() {
    const response = await this.request.get(API.signOut, {
      headers: { Authorization: `Bearer ${this.request.getToken().token}` },
    });

    return response;
  }

  /**
   * Refreshes the token
   * @method refreshToken
   * @async
   * @param clientId - The merchant's clientId
   * @example
   *     InPlayer.Account.refreshToken('123123121-d1-t1-1ff').then(data => console.log(data))
   * @return {AxiosResponse<CreateAccount>}
   */
  async refreshToken(clientId: number) {
    const token = this.request.getToken();

    if (!token.refreshToken) {
      const response: CustomErrorResponse = {
        status: 401,
        data: {
          code: 401,
          message: 'The refresh token is not present',
        },
      };

      // eslint-disable-next-line no-throw-literal
      throw { response };
    }

    const body = {
      refresh_token: token.refreshToken,
      client_id: clientId,
      grant_type: 'refresh_token',
    };

    const responseData = await this.request.post(
      API.signIn,
      qs.stringify(body),
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      },
    );

    return responseData;
  }

  /**
   * Reports the generated SSO token to the SSO domain.
   * @param {string} ssoDomain - The SSO domain.
   * @param {Credentials} tokenData - The token data.
   * @param {boolean} retire - Should the token be retired or activated.
   */
  async reportSSOtoken(
    ssoDomain: string,
    tokenData: Credentials,
    retire = false,
  ) {
    const body = new FormData();

    body.append('token', tokenData.token);
    body.append('delete', retire ? '1' : '0');

    // TODO: Check if global withCredentials works
    return this.request.post(API.reportSSOtoken(ssoDomain), body, {
      headers: { 'Content-Type': 'multipart/form-data' },
      withCredentials: true,
    });
  }

  /**
   * Requests new password for a given user
   * @method requestNewPassword
   * @async
   * @param {Object} data - Contains {
   *  email: string,
   *  merchantUuid: string
   *  brandingId?: number
   * }
   * @example
   *     InPlayer.Account
   *     .requestNewPassword({
   *      email: "test32@test.com",
   *      merchantUuid: "528b1b80-5868-4abc-a9b6-4d3455d719c8",
   *      brandingId: 12345,
   *     })
   *     .then(data => console.log(data));
   * @return {AxiosResponse<CreateForgotPasswordToken>}
   */
  async requestNewPassword(data: RequestNewPasswordData) {
    const body = {
      email: data.email,
      merchant_uuid: data.merchantUuid,
      branding_id: data.brandingId,
    };

    return this.request.post(
      API.requestNewPassword,
      qs.stringify(body),
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      },
    );
  }

  /**
   * Sets new password for the user
   * @method setNewPassword
   * @async
   * @param {Object} data - Contains {
   *  password: string
   *  passwordConfirmation: string
   *  brandingId?: number
   * }
   * @param {String} token - The reset token
   * @example
   *     InPlayer.Account
   *     .setNewPassword({
   *      password: "password",
   *      passwordConfirmation: "password",
   *      brandingId: "12345",
   *     }, 'afhqi83rji74hjf7e43df')
   *     .then(data => console.log(data));
   * @return {AxiosResponse<undefined>}
   */
  async setNewPassword(data: SetNewPasswordData, token = '') {
    // TODO: check logic
    // eslint-disable-next-line max-len
    const body = `password=${data.password}&password_confirmation=${data.passwordConfirmation}&branding_id=${data.brandingId}`;

    return this.request.put(API.setNewPassword(token), body, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
  }

  /**
   * Gets the account information for a given auth token
   * @method getAccountInfo
   * @async
   * @example
   *     InPlayer.Account
   *     .getAccountInfo()
   *     .then(data => console.log(data));
   * @return {AxiosResponse<AccountInformationReturn>}
   */
  async getAccountInfo() {
    return this.request.get(API.getAccountInfo, {
      headers: { Authorization: `Bearer ${this.request.getToken().token}` },
    });
  }

  /**
   * Gets the social login urls for fb/twitter/google
   * @method getSocialLoginUrls
   * @async
   * @param {string} state - Social login state.
   * The state needs to be json and base64 encoded to be sent as a query parameter.
   * Example: btoa(JSON.stringify({uuid: 'foo', redirect: 'http://example.com'}))
   * @example
   *     InPlayer.Account
   *     .getSocialLoginUrls('123124-1r-1r13ur1h1')
   *     .then(data => console.log(data));
   * @return {AxiosResponse<ListSocialURLs>}
   */
  async getSocialLoginUrls(state: string) {
    return this.request.get(API.getSocialLoginUrls(state));
  }

  /**
   * Updates the account info. Metadata fields must be from the Inplayer.getRegisterFields()
   * @method updateAccount
   * @async
   * @param {Object} data - The new data for the account
   * @example
   *     InPlayer.Account
   *     .updateAccount({fullName: 'test test', metadata: {country: 'Germany'},  dateOfBirth: '1999-03-05'})
   *     .then(data => console.log(data));
   * @return {AxiosResponse<undefined>}
   */
  async updateAccount(data: UpdateAccountData) {
    const body: any = {
      full_name: data.fullName,
    };

    if (data.metadata) {
      body.metadata = data.metadata;
    }
    if (data.dateOfBirth) {
      body.date_of_birth = data.dateOfBirth;
    }

    return this.request.put(
      API.updateAccount,
      qs.stringify(body),
      {
        headers: {
          Authorization: `Bearer ${this.request.getToken().token}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );
  }

  /**
   * Changes password for a given user
   * @method changePassword
   * @async
   * @param {Object} data - Contains {
   *  oldPassword: string
   *  password: string
   *  passwordConfirmation: string
   *  brandingId?: number
   * }
   * @param {string} token - The reset token
   * @example
   *     InPlayer.Account
   *     .changePassword({
   *       oldPassword: 'old123',
   *       password: 'test123',
   *       passwordConfirmation: 'test123'
   *       brandingId: 1234
   *     },'123124-1r-1r13ur1h1')
   *     .then(data => console.log(data));
   * @return {AxiosResponse<undefined>}
   */
  async changePassword(data: ChangePasswordData) {
    const body = {
      old_password: data.oldPassword,
      password: data.password,
      password_confirmation: data.passwordConfirmation,
      branding_id: data.brandingId,
    };

    return this.request.post(
      API.changePassword,
      qs.stringify(body),
      {
        headers: {
          Authorization: `Bearer ${this.request.getToken().token}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );
  }

  /**
   * Gets register fields
   * @method getRegisterFields
   * @async
   * @param {string} merchantUuid - The merchant UUID
   * @example
   *     InPlayer.Account
   *     .getRegisterFields('123124-1r-1r13ur1h1')
   *     .then(data => console.log(data));
   * @return {AxiosResponse<GetRegisterField>}
   */
  async getRegisterFields(merchantUuid = '') {
    return this.request.get(API.getRegisterFields(merchantUuid));
  }

  /**
   * Deletes an account
   * @method deleteAccount
   * @async
   * @param {Object} data - Contains {
   *  password: string,
   *  brandingId?: number,
   * }
   * @example
   *     InPlayer.Account.deleteAccount({
   *      password: "password",
   *      brandingId: 1234,
   *     })
   *     .then(data => console.log(data));
   * @return {AxiosResponse<undefined>}
   */

  async deleteAccount(data: AccountAuthData) {
    const body = {
      password: data.password,
      branding_id: data.brandingId,
    };

    const response = await this.request.delete(
      API.deleteAccount,
      {
        headers: {
          Authorization: `Bearer ${this.request.getToken().token}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: qs.stringify(body),
      },
    );

    localStorage.removeItem(this.config.INPLAYER_TOKEN_KEY);
    localStorage.removeItem(this.config.INPLAYER_IOT_KEY);

    return response;
  }

  /**
   * Exports account data to the users' email
   * @method exportData
   * @async
   * @param {Object} data - Contains {
   *  password: string,
   *  brandingId?: number,
   * }
   * @example
   *     InPlayer.Account.exportData({
   *        password: "password",
   *        brandingId: 1234,
   *     })
   *     .then(data => console.log(data));
   * @return {AxiosResponse<ExportAccountData>}
   */

  async exportData(data: AccountAuthData) {
    const body = {
      password: data.password,
      branding_id: data.brandingId,
    };

    return this.request.post(
      API.exportData,
      qs.stringify(body),
      {
        headers: {
          Authorization: `Bearer ${this.request.getToken().token}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );
  }

  /**
   * Creates pin code and sends it to the users' email
   * @method sendPinCode
   * @async
   * @param {number} brandingId - Optional parametar
   * @example
   *     InPlayer.Account.sendPinCode(1234)
   *     .then(data => console.log(data));
   * @return {AxiosResponse<SendPinCode>}
   */

  async sendPinCode(brandingId: number) {
    const body = {
      branding_id: brandingId,
    };

    return this.request.post(
      API.sendPinCode,
      qs.stringify(body),
      {
        headers: {
          Authorization: `Bearer ${this.request.getToken().token}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );
  }

  /**
   * Checks validity of pin code
   * @method validatePinCode
   * @async
   * @param {string} pinCode - Code from received email message
   * @example
   *     InPlayer.Account.validatePinCode('5566')
   *     .then(data => console.log(data));
   * @return {AxiosResponse<PinCodeData>}
   */

  async validatePinCode(pinCode: string) {
    const body = {
      pin_code: pinCode,
    };

    return this.request.post(
      API.validatePinCode,
      qs.stringify(body),
      {
        headers: {
          Authorization: `Bearer ${this.request.getToken().token}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );
  }

  /**
* Return restriction settings per Merchant
* @method loadMerchantRestrictionSettings
* @async
* @param {string} merchantUuid - The merchant UUID
* @example
*     InPlayer.Account
*     .loadMerchantRestrictionSettings("528b1b80-5868-4abc-a9b6-4d3455d719c8")
*     .then(data => console.log(data));
* @return {AxiosResponse<RestrictionSettingsData>} Contains the data - {
  "age_verification_type": "pin_code",
  "age_verification_enabled": true,
  "merchant_uuid": "3b39b5ab-b5fc-4ba3-b770-73155d20e61f",
  "created_at": 1532425425,
  "updated_at": 1532425425
}
*/
  async loadMerchantRestrictionSettings(merchantUuid: string) {
    return this.request.get(
      API.merchantRestrictionSettings(merchantUuid),
    );
  }
}

export default Account;
