import { ApiConfig, Request } from '../models/Config';
import configOptions from '../config';
import { Env } from '../models/CommonInterfaces';

class BaseExtend {
  config: ApiConfig;
  request: Request;
  constructor(config: ApiConfig, request: Request) {
    this.config = config;
    this.request = request;
  }
  /** @internal */
  setConfig = (env: Env): void => {
    this.config = configOptions[env];
  }
}

export default BaseExtend;
