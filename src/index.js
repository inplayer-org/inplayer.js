import User from './Models/User.js';
import Asset from './Models/Asset.js';


class InPlayer {
  constructor(){
    // API Models
    this.User = new User();
    this.Asset = new Asset();
  }
}

export default new InPlayer();
