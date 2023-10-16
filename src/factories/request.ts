import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import Credentials from './credentials';
import {
  CustomErrorResponse, Env, CredentialsConfig, Credentials as CredentialInterface,
} from '../models/CommonInterfaces';
import { ApiConfig } from '../models/Config';
import configOptions from '../config';
import tokenStorage from './tokenStorage';
import { isPromise, createCredentials } from '../helpers';

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
  customAxiosConfig: AxiosRequestConfig; // New property to hold custom config

  constructor(config: ApiConfig) {
    this.config = config;
    this.basicInstance = axios.create({
      baseURL: this.config.BASE_URL,
    });
    this.authenticatedInstance = axios.create({
      baseURL: this.config.BASE_URL,
    });
    this.authenticatedInstance.interceptors.request.use(
      this.createAuthInterceptor,
    );

    this.customAxiosConfig = {}; // Initialize with an empty object
  }

  setInstanceConfig = (configEnv: Env): void => {
    this.config = configOptions[configEnv];
    this.basicInstance = axios.create({
      baseURL: this.config.BASE_URL,
    });
    this.authenticatedInstance = axios.create({
      baseURL: this.config.BASE_URL,
    });
    this.authenticatedInstance.interceptors.request.use(
      this.createAuthInterceptor,
    );
  };

  // Step 1: Create a new method `setAxiosConfig`
  setAxiosConfig = (customConfig: AxiosRequestConfig) => {
    this.customAxiosConfig = customConfig;

    // Merge custom config with the default config
    this.basicInstance = axios.create({
      ...this.config,
      ...customConfig,
    });

    this.authenticatedInstance = axios.create({
      ...this.config,
      ...customConfig,
    });

    this.authenticatedInstance.interceptors.request.use(
      this.createAuthInterceptor,
    );
  };

  /** Returns the OAuth token
   *  @method getToken
   *  @example
   *  InPlayer.Account.getToken()
   *  @returns {CredentialsConfig}
   */
  getToken = (): CredentialsConfig | Promise<CredentialsConfig> => {
    const tokenString = tokenStorage.getItem(this.config.INPLAYER_TOKEN_KEY);

    if (isPromise(tokenString)) {
      return (tokenString as Promise<string>).then((resolvedString) =>
        createCredentials(resolvedString));
    }
    return createCredentials(tokenString as string);
  };

  /** Sets the token
   *  @method setToken
   *  @param {string} token
   *  @param {string} refreshToken
   *  @param {number} expiresAt
   *  @example
   *  InPlayer.Account.setToken('344244-242242', '123123121-d1-t1-1ff',1558529593297)
   *  @returns {void}
   */
  setToken = (token: string, refreshToken: string, expiresAt: number): void | Promise<void> => {
    const credentials = new Credentials({
      token,
      refreshToken,
      expires: expiresAt,
    });

    return tokenStorage.setItem(
      this.config.INPLAYER_TOKEN_KEY,
      JSON.stringify(credentials),
    );
  };

  /** Removes the token
   *  @method removeToken
   *  @example
   *  InPlayer.Account.removeToken()
   *  @returns {void}
   */
  removeToken = (): void | Promise<void> => {
    const tasks: Array<void | Promise<void>> = [
      tokenStorage.removeItem(this.config.INPLAYER_TOKEN_KEY),
      tokenStorage.removeItem(this.config.INPLAYER_IOT_KEY),
    ];

    if (!tasks.some(isPromise)) {
      return undefined;
    }

    return Promise.all(tasks).then(() => undefined);
  };

  /**
   * Checks if the user is authenticated
   * @method isAuthenticated
   * @example
   *    InPlayer.Account.isAuthenticated()
   * @return {boolean}
   */
  isAuthenticated = (): boolean | Promise<boolean> => {
    const tokenObject = this.getToken();

    if (isPromise(tokenObject)) {
      return (tokenObject as Promise<CredentialInterface>).then(
        (resolvedCredentials) =>
          !resolvedCredentials.isExpired() && !!resolvedCredentials.token,
      );
    }

    const credentials = tokenObject as CredentialInterface;

    return !credentials.isExpired() && !!credentials.token;
  };

  // HTTP GET Request - Returns Resolved or Rejected Promise
  get = (
    path: string,
    headers?: Record<string, Record<string, unknown> | string | boolean>,
  ): any => this.basicInstance.get(path, headers || getHeaders());

  // HTTP POST Request - Returns Resolved or Rejected Promise
  post = (
    path: string,
    data: any,
    headers?: Record<string, Record<string, unknown> | string | boolean>,
  ): any => this.basicInstance.post(path, data, headers || getHeaders());

  // HTTP PUT Request - Returns Resolved or Rejected Promise
  put = (
    path: string,
    data: any,
    headers?: Record<string, Record<string, unknown> | string | boolean>,
  ): any => this.basicInstance.put(path, data, headers || getHeaders());

   // HTTP PATCH Request - Returns Resolved or Rejected Promise
   patch = (
     path: string,
     data: any,
     headers?: Record<string, Record<string, unknown> | string | boolean>,
   ): any => this.basicInstance.patch(path, data, headers || getHeaders());

  // HTTP DELETE Request - Returns Resolved or Rejected Promise
  delete = (
    path: string,
    headers?: Record<string, Record<string, unknown> | string | boolean>,
  ): any => this.basicInstance.delete(path, headers || getHeaders());

  // HTTP GET Request - Returns Resolved or Rejected Promise
  authenticatedGet = (
    path: string,
    headers?: Record<string, Record<string, unknown> | string | boolean>,
  ): any => this.authenticatedInstance.get(path, headers || getHeaders());

  // HTTP PATCH Request - Returns Resolved or Rejected Promise
  authenticatedPatch = (
    path: string,
    data: any,
    headers?: Record<string, Record<string, unknown> | string | boolean>,
  ): any => this.authenticatedInstance.patch(path, data, headers || getHeaders());

  // HTTP POST Request - Returns Resolved or Rejected Promise
  authenticatedPost = (
    path: string,
    data: any,
    headers?: Record<string, Record<string, unknown> | string | boolean>,
  ): any => this.authenticatedInstance.post(path, data, headers || getHeaders());

  // HTTP PUT Request - Returns Resolved or Rejected Promise
  authenticatedPut = (
    path: string,
    data: any,
    headers?: Record<string, Record<string, unknown> | string | boolean>,
  ): any => this.authenticatedInstance.put(path, data, headers || getHeaders());

  // HTTP DELETE Request - Returns Resolved or Rejected Promise
  authenticatedDelete = (
    path: string,
    headers?: Record<string, Record<string, unknown> | string | boolean>,
  ): any => this.authenticatedInstance.delete(path, headers || getHeaders());

  createAuthInterceptor = (axiosConfig: AxiosRequestConfig): AxiosRequestConfig => {
    const auth = this.isAuthenticated();
    // Build and Record<string, unknown> similar to an Axios error response
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
  };
}
