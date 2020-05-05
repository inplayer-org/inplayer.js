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

  setConfig = (env: Env) => {
    this.config = configOptions[env];
  }
}

export default BaseExtend;
