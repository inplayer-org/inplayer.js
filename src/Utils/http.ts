import axios from 'axios';
import { environmentVariables } from '../constants/api';
import Credentials from '../Credentials';
import { CustomErrorResponse } from '../Interfaces/CommonInterfaces';

const INPLAYER_TOKEN_NAME = 'inplayer_token';

/** Retruns the OAuth token
 *  @method getToken
 *  @example
 *  InPlayer.Account.getToken()
 *  @return {Credentials}
 */
const getToken = () => {
  const token = localStorage.getItem(INPLAYER_TOKEN_NAME);

  if (token === undefined || token === null) {
    return new Credentials();
  }

  return new Credentials(JSON.parse(token));
};
/**
 * Checks if the user is authenticated
 * @method isAuthenticated
 * @example
 *    InPlayer.Account.isAuthenticated()
 * @return {Boolean}
 */
const isAuthenticated = () =>
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

      // eslint-disable-next-line no-throw-literal
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
const get = (path: string) => basicInstance.get(path, getHeaders());

// HTTP PATCH Request - Returns Resolved or Rejected Promise
const patch = (path: string, data: any) =>
  basicInstance.patch(path, data, getHeaders());

// HTTP POST Request - Returns Resolved or Rejected Promise
const post = (path: string, data: any) =>
  basicInstance.post(path, data, getHeaders());

// HTTP DELETE Request - Returns Resolved or Rejected Promise
const del = (path: string) => basicInstance.delete(path, getHeaders());

// HTTP GET Request - Returns Resolved or Rejected Promise
const authenticatedGet = (path: string) =>
  authenticatedInstance.get(path, getHeaders());

// HTTP PATCH Request - Returns Resolved or Rejected Promise
const authenticatedPatch = (path: string, data: any) =>
  authenticatedInstance.patch(path, data, getHeaders());

// HTTP POST Request - Returns Resolved or Rejected Promise
const authenticatedPost = (path: string, data: any) =>
  authenticatedInstance.post(path, data, getHeaders());

// HTTP DELETE Request - Returns Resolved or Rejected Promise
const authenticatedDelelete = (path: string) =>
  authenticatedInstance.delete(path, getHeaders());

const basicApi = {
  get,
  post,
  patch,
  delete: del,
};

const authenticatedApi = {
  get: authenticatedGet,
  patch: authenticatedPatch,
  post: authenticatedPost,
  delete: authenticatedDelelete,
};

export { basicApi, authenticatedApi };
