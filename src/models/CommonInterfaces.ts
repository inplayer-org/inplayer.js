import { AxiosResponse } from 'axios';
import { ApiConfig, Request } from './Config';

export enum Env {
  Development = 'development',
  Production = 'production',
}

export interface BaseExtend {
  config: ApiConfig;
  request: Request;
  setConfig: (env: Env) => void;
}

export interface CommonResponse {
  code: number;
  message: string;
}

export interface AdvanceError extends CommonResponse {
  errors?: Record<string, string>;
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
  expires: string;
  isExpired(): boolean;
  toObject(): CredentialsConfig;
}

interface DlcLink {
  token: string;
  filesize: string;
  thumbnail: string;
  title: string;
  file_description: string;
}

export interface DLC extends BaseExtend {
  getDlcLinks(assetId: number): Promise<AxiosResponse<DlcLink>>;
}

export interface Notifications extends BaseExtend {
  getIotToken(): Promise<any>;
  subscribe(accountUuid: string, callbackParams: any): Promise<boolean>;
  handleSubscribe(data: Record<string, unknown>, callbackParams: any, uuid: string): void;
  setClient(client: any): void;
  isSubscribed(): boolean;
  unsubscribe(): void;
}
