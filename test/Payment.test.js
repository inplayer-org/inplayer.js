var jsdom = require('mocha-jsdom')
import {expect} from 'Chai';
import Payment from '../src/Models/Payment';
import User from '../src/Models/User';

describe('Payment', function () {
  jsdom();
  let misc;


  beforeEach(() => {
    misc = new Payment();
  });


  describe('#getPaymentMethods()', function() {
    it('should return unaothorized request with wrong auth', async () => {
      let authToken = '';
      const user = new User();
      user.signIn({
           merchant_uuid: '528b1b80-5868-4abc-a9b6-4d3455d719c8',
           referrer: 'http://localhost:3000/',
           email: 'vld_test@consumer.com',
           password: '11111111',
      }).then(data => {console.log(data);authToken = data});

      const result = await misc.getPaymentMethods(authToken);

      expect(result).to.deep.equal({
        'reason': 'Unauthorized request.'
      });

    });
  });


});
