import { ApiConfig, Request } from '../models/CommonInterfaces';

class BaseExtend {
  config: ApiConfig;
  request: Request;
  constructor(config: ApiConfig, request: Request) {
    this.config = config;
    this.request = request;
  }
}

export default BaseExtend;