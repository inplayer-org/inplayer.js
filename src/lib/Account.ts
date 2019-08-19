import qs from 'qs';
import {
  authenticatedApi, basicApi, getToken, setToken,
} from '../Utils/http';
import {
  AuthenticateData,
  SignUpData,
  RequestNewPasswordData,
  SetNewPasswordData,
  UpdateAccountData,
  ChangePasswordData,
  DeleteAccountData,
  ExportData,
} from '../Interfaces/IAccount&Authentication';
import { CustomErrorResponse } from '../Interfaces/CommonInterfaces';
import Credentials from '../Credentials';

/**
 * Contains all Requests regarding user/account and authentication
 *
 * @class Account
 */
class Account {
  config: any;
  constructor(config: any) {
    this.config = config;
  }

  /**
   * Signs in the user
   * @method authenticate
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
   *     InPlayer.Account.authenticate({
   *      email: 'test@test.com',
   *      password: 'test123',
   *      clientId: '123-123-hf1hd1-12dhd1',
   *      referrer: 'http://localhost:3000/',
   *      refreshToken: '528b1b80-ddd1hj-4abc-gha3j-111111'
   *     })
   *     .then(data => console.log(data));
   * @return {AxiosResponse<CreateAccount>}
   */
  async authenticate(data: AuthenticateData) {
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

    const respData = await basicApi.post(
      this.config.API.authenticate,
      qs.stringify(body),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );

    setToken(
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
   *  metadata?: { [key: string]: string }
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

    const resp = await basicApi.post(
      this.config.API.signUp,
      qs.stringify(body),
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      },
    );

    setToken(
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
    const response = await authenticatedApi.get(this.config.API.signOut, {
      headers: { Authorization: `Bearer ${getToken().token}` },
    });

    setToken('', '', 0);

    return response;
  }

  /** Retruns the OAuth token
   *  @method getToken
   *  @example
   *  InPlayer.Account.getToken()
   *  @return {Credentials}
   */
  getToken = () => {
    const token = localStorage.getItem(this.config.INPLAYER_TOKEN_NAME);

    if (token === undefined || token === null) {
      return new Credentials();
    }

    return new Credentials(JSON.parse(token));
  };

  /** Sets the Token
   *  @method setToken
   *  @param {string} token
   *  @param {string} refreshToken
   *  @param {number} expiresAt
   *  @example
   *  InPlayer.Account.setToken('344244-242242', '123123121-d1-t1-1ff',1558529593297)
   */
  setToken = (token: any, refreshToken: any, expiresAt: any) => {
    const credentials = new Credentials({
      token,
      refreshToken,
      expires: expiresAt,
    });

    localStorage.setItem(
      this.config.INPLAYER_TOKEN_NAME,
      JSON.stringify(credentials),
    );
  };

  /**
   * Checks if the user is authenticated
   * @method isAuthenticated
   * @example
   *    InPlayer.Account.isAuthenticated()
   * @return {Boolean}
   */
  isAuthenticated = () => !getToken().isExpired() && getToken().token !== '';

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
    const token = getToken();

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

    const responseData = await basicApi.post(
      this.config.API.authenticate,
      qs.stringify(body),
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      },
    );

    setToken(
      responseData.data.access_token,
      responseData.data.refresh_token,
      responseData.data.expires,
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
    return basicApi.post(this.config.API.reportSSOtoken(ssoDomain), body, {
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

    return basicApi.post(
      this.config.API.requestNewPassword,
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

    return basicApi.put(this.config.API.setNewPassword(token), body, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
  }

  /**
   * Gets the account information for a given auth token
   * @method getAccount
   * @async
   * @example
   *     InPlayer.Account
   *     .getAccount()
   *     .then(data => console.log(data));
   * @return {AxiosResponse<AccountInformationReturn>}
   */
  async getAccount() {
    return authenticatedApi.get(this.config.API.getAccountInfo, {
      headers: { Authorization: `Bearer ${getToken().token}` },
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
    return basicApi.get(this.config.API.getSocialLoginUrls(state));
  }

  /**
   * Updates the account info. Metadata fields must be from the Inplayer.getRegisterFields()
   * @method updateAccount
   * @async
   * @param {Object} data - The new data for the account
   * @example
   *     InPlayer.Account
   *     .updateAccount({fullName: 'test test', metadata: {country: 'Germany'}})
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

    return authenticatedApi.put(
      this.config.API.updateAccount,
      qs.stringify(body),
      {
        headers: {
          Authorization: `Bearer ${getToken().token}`,
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

    return authenticatedApi.post(
      this.config.API.changePassword,
      qs.stringify(body),
      {
        headers: {
          Authorization: `Bearer ${getToken().token}`,
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
    return basicApi.get(this.config.API.getRegisterFields(merchantUuid));
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

  async deleteAccount(data: DeleteAccountData) {
    const body = {
      password: data.password,
      branding_id: data.brandingId,
    };

    const response = await authenticatedApi.delete(
      this.config.API.deleteAccount,
      {
        headers: {
          Authorization: `Bearer ${getToken().token}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: qs.stringify(body),
      },
    );

    localStorage.removeItem(this.config.INPLAYER_TOKEN_NAME);
    localStorage.removeItem(this.config.INPLAYER_IOT_NAME);

    return {
      code: response.status,
      message: 'Account has been successfuly deleted',
    };
  }

  /**
   * DExports account data to the users' email
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

  async exportData(data: ExportData) {
    const body = {
      password: data.password,
      branding_id: data.brandingId,
    };

    const response = await authenticatedApi.post(
      this.config.API.exportData,
      qs.stringify(body),
      {
        headers: {
          Authorization: `Bearer ${getToken().token}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );

    return {
      code: response.status,
      message: 'Your data is being exported, please check your email.',
    };
  }
}

export default Account;
