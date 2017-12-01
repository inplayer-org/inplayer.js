import User from './Models/User';
import Asset from './Models/Asset';
import Payment from './Models/Payment';
import Subscriptions from './Models/Subscriptions';
import Misc from './Models/Misc';


class InPlayer {
  constructor(){
    this.User = new User();
    this.Asset = new Asset();
    this.Payment = new Payment();
    this.Subscriptions = new Subscriptions();
    this.Misc = new Misc();
  }
}

export default new InPlayer();
