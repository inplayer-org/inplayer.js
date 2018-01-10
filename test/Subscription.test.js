var jsdom = require('mocha-jsdom')
import {expect} from 'Chai';
import Subscription from '../src/Models/Subscription';

describe('Subscription', function () {
  jsdom();
  let subscription;


  beforeEach(() => {
    subscription = new Subscription();
  });


  describe('#getSubscriptions()', function() {
    it('should return unaothorized request with wrong auth', async () => {

      const result = await subscription.getSubscriptions('12312dashgsfa');

      expect(result).to.deep.equal({
        "errors": {
          "401": "Invalid auth token"
        }
      });

    });
  });

  describe('#cancelSubscription()', function() {
    it('should return unaothorized request with wrong auth or wrong url', async () => {

      const result = await subscription.cancelSubscription('https://staging-v2.inplayer.com/subscriptions/cancel/S-WS30tLFpkYbaMsHHMor51ViJ3-ST','12312dashgsfa');

      expect(result).to.have.property('code');

    });
  });


});
