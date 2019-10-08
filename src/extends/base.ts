import { ApiConfig } from '../Interfaces/CommonInterfaces';
import RequestFactory from '../factories/request';

class BaseExtend {
  config: ApiConfig;
  request: any;
  constructor(config: ApiConfig) {
    this.config = config;
    this.request = new RequestFactory(config);
  }
}

export default BaseExtend;
