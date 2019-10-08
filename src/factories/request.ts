import axios, { AxiosInstance } from 'axios';
import Credentials from './credentials';
import { CustomErrorResponse, ApiConfig } from '../models/CommonInterfaces';

// Make maybe to get headers as params
const getHeaders = () => ({
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default class Request {
  config: ApiConfig;
  basicInstance: AxiosInstance;
  authenticatedInstance: AxiosInstance;
  basicApi: any;
  authenticatedApi: any;

  constructor(config: ApiConfig) {
    this.config = config;
    this.basicInstance = axios.create({
      baseURL: this.config.BASE_URL,
    });
    this.authenticatedInstance = axios.create({
      baseURL: this.config.BASE_URL,
    });
    this.authenticatedInstance.interceptors.request.use(
      (axiosConfig) => {
        const auth = this.isAuthenticated();

        // Build and object similar to an Axios error response
        if (!auth) {
          const response: CustomErrorResponse = {
            status: 401,
            data: {
              code: 401,
              message: 'The user is not authenticated.',
            },
          };

          throw { response };
        }

        return axiosConfig;
      },
    );
    this.basicApi = {
      get: this.get,
      post: this.post,
      put: this.put,
      patch: this.patch,
      delete: this.del,
    };
    this.authenticatedApi = {
      get: this.authenticatedGet,
      patch: this.authenticatedPatch,
      post: this.authenticatedPost,
      put: this.authenticatedPut,
      delete: this.authenticatedDelete,
    };
  }

  /** Retruns the OAuth token
 *  @method getToken
 *  @example
 *  InPlayer.Account.getToken()
 *  @return {Credentials}
 */
  getToken = () => {
    const token = localStorage.getItem(this.config.INPLAYER_TOKEN_KEY);

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
  setToken = (token: string, refreshToken: string, expiresAt: number) => {
    const credentials = new Credentials({
      token,
      refreshToken,
      expires: expiresAt,
    });

    localStorage.setItem(
      this.config.INPLAYER_TOKEN_KEY,
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
  isAuthenticated = () =>
    !this.getToken().isExpired() && this.getToken().token !== '';

  // HTTP GET Request - Returns Resolved or Rejected Promise
  get = (path: string, headers?: Record<string, object | string | boolean>) =>
    this.basicInstance.get(path, headers || getHeaders());

  // HTTP PATCH Request - Returns Resolved or Rejected Promise
  patch = (path: string, data: any, headers?: Record<string, object | string | boolean>) =>
    this.basicInstance.patch(path, data, headers || getHeaders());

  // HTTP POST Request - Returns Resolved or Rejected Promise
  post = (path: string, data: any, headers?: Record<string, object | string | boolean>) =>
    this.basicInstance.post(path, data, headers || getHeaders());

  // HTTP PUT Request - Returns Resolved or Rejected Promise
  put = (path: string, data: any, headers?: Record<string, object | string | boolean>) =>
    this.basicInstance.put(path, data, headers || getHeaders());

  // HTTP DELETE Request - Returns Resolved or Rejected Promise
  del = (path: string, headers?: Record<string, object | string | boolean>) =>
    this.basicInstance.delete(path, headers || getHeaders());

  // HTTP GET Request - Returns Resolved or Rejected Promise
  authenticatedGet = (path: string, headers?: Record<string, object | string | boolean>) =>
    this.authenticatedInstance.get(path, headers || getHeaders());

  // HTTP PATCH Request - Returns Resolved or Rejected Promise
  authenticatedPatch = (
    path: string,
    data: any,
    headers?: Record<string, object | string | boolean>,
  ) => this.authenticatedInstance.patch(path, data, headers || getHeaders());

  // HTTP POST Request - Returns Resolved or Rejected Promise
  authenticatedPost = (
    path: string,
    data: any,
    headers?: Record<string, object | string | boolean>,
  ) => this.authenticatedInstance.post(path, data, headers || getHeaders());

  // HTTP PUT Request - Returns Resolved or Rejected Promise
  authenticatedPut = (
    path: string,
    data: any,
    headers?: Record<string, object | string | boolean>,
  ) => this.authenticatedInstance.put(path, data, headers || getHeaders());

  // HTTP DELETE Request - Returns Resolved or Rejected Promise
  authenticatedDelete = (
    path: string,
    headers?: Record<string, object | string | boolean>,
  ) => this.authenticatedInstance.delete(path, headers || getHeaders());
}
