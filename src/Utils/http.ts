import axios from 'axios';
import { environmentVariables } from '../constants/api';
import Credentials from '../Credentials';
import { CustomErrorResponse } from '../Interfaces/CommonInterfaces';

const INPLAYER_TOKEN_KEY = 'inplayer_token';

/** Retruns the OAuth token
 *  @method getToken
 *  @example
 *  InPlayer.Account.getToken()
 *  @return {Credentials}
 */
export const getToken = () => {
  const token = localStorage.getItem(INPLAYER_TOKEN_KEY);

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
export const setToken = (token: string, refreshToken: string, expiresAt: number) => {
  const credentials = new Credentials({
    token,
    refreshToken,
    expires: expiresAt,
  });

  localStorage.setItem(
    INPLAYER_TOKEN_KEY,
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
export const isAuthenticated = () =>
  !getToken().isExpired() && getToken().token !== '';

const basicInstance = axios.create({
  baseURL: environmentVariables,
});

const authenticatedInstance = axios.create({
  baseURL: environmentVariables,
});

authenticatedInstance.interceptors.request.use(
  (config) => {
    const auth = isAuthenticated();

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

    return config;
  },
);

// Make maybe to get headers as params
const getHeaders = () => ({
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

// HTTP GET Request - Returns Resolved or Rejected Promise
const get = (path: string, headers?: Record<string, object | string | boolean>) =>
  basicInstance.get(path, headers || getHeaders());

// HTTP PATCH Request - Returns Resolved or Rejected Promise
const patch = (path: string, data: any, headers?: Record<string, object | string | boolean>) =>
  basicInstance.patch(path, data, headers || getHeaders());

// HTTP POST Request - Returns Resolved or Rejected Promise
const post = (path: string, data: any, headers?: Record<string, object | string | boolean>) =>
  basicInstance.post(path, data, headers || getHeaders());

// HTTP PUT Request - Returns Resolved or Rejected Promise
const put = (path: string, data: any, headers?: Record<string, object | string | boolean>) =>
  basicInstance.put(path, data, headers || getHeaders());

// HTTP DELETE Request - Returns Resolved or Rejected Promise
const del = (path: string, headers?: Record<string, object | string | boolean>) =>
  basicInstance.delete(path, headers || getHeaders());

// HTTP GET Request - Returns Resolved or Rejected Promise
const authenticatedGet = (path: string, headers?: Record<string, object | string | boolean>) =>
  authenticatedInstance.get(path, headers || getHeaders());

// HTTP PATCH Request - Returns Resolved or Rejected Promise
const authenticatedPatch = (
  path: string,
  data: any,
  headers?: Record<string, object | string | boolean>,
) => authenticatedInstance.patch(path, data, headers || getHeaders());

// HTTP POST Request - Returns Resolved or Rejected Promise
const authenticatedPost = (
  path: string,
  data: any,
  headers?: Record<string, object | string | boolean>,
) => authenticatedInstance.post(path, data, headers || getHeaders());

// HTTP PUT Request - Returns Resolved or Rejected Promise
const authenticatedPut = (
  path: string,
  data: any,
  headers?: Record<string, object | string | boolean>,
) => authenticatedInstance.put(path, data, headers || getHeaders());

// HTTP DELETE Request - Returns Resolved or Rejected Promise
const authenticatedDelelete = (
  path: string,
  headers?: Record<string, object | string | boolean>,
) => authenticatedInstance.delete(path, headers || getHeaders());

const basicApi = {
  get,
  post,
  put,
  patch,
  delete: del,
};

const authenticatedApi = {
  get: authenticatedGet,
  patch: authenticatedPatch,
  post: authenticatedPost,
  put: authenticatedPut,
  delete: authenticatedDelelete,
};

export { basicApi, authenticatedApi };
