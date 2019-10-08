import { ApiConfig, Request } from '../models/CommonInterfaces';
import RequestFactory from '../factories/request';

class BaseExtend {
  config: ApiConfig;
  request: Request;
  constructor(config: ApiConfig) {
    this.config = config;
    this.request = new RequestFactory(config);
  }
}

export default BaseExtend;
