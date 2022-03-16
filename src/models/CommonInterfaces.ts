import { ApiConfig, Request } from './Config';

// eslint-disable-next-line no-shadow
export enum Env {
  Daily = 'daily',
  Development = 'development',
  Production = 'production',
}

export interface BaseExtend {
  config: ApiConfig;
  request: Request;
  setConfig: (environment: Env) => void;
}

export interface CommonResponse {
  code: number;
  message: string;
}

export interface CustomErrorResponse {
  status: number;
  data: CommonResponse;
}

export interface CredentialsConfig {
  token: string;
  refreshToken: string;
  expires: number;
}

export interface Credentials {
  token: string;
  refreshToken: string;
  expires: number;
  isExpired(): boolean;
  toObject(): CredentialsConfig;
}

export interface Notifications extends BaseExtend {
  getIotToken(): Promise<Record<string, unknown>>;
  subscribe(accountUuid: string, callbackParams: any): Promise<boolean>;
  handleSubscribe(data: Record<string, unknown>, callbackParams: any, uuid: string): void;
  setClient(client: any): void;
  isSubscribed(): boolean;
  unsubscribe(): void;
}
