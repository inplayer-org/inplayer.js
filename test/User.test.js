var jsdom = require('mocha-jsdom')
import {expect} from 'Chai';
import User from '../src/Models/User';

describe('User', function () {
  jsdom();
  let user;


  beforeEach(() => {
    user = new User();
  });


  describe('#signIn()', function() {
    it('should return missing data because of FormData', async () => {

      const result = await user.signIn({
        email: 'test@test.com',
        password: 'test123',
        merchantUid: '1jh1f-1fff1fjr1-fr',
        referrer: 'localhost.com'
      });

      expect(result).to.deep.equal({
        "errors": {
          "email": "The email is not in a valid format.",
          "merchant_uuid": "The UUID must not be empty.",
          "password": "The password must not be empty.",
        }
      });

    });
  });

  describe('#signOut()', function() {
    it('should sign out', async () => {

      const result = await user.signOut();

      expect(result).to.deep.equal(true);

    });
  });

  describe('#signUp()', function() {
    it('should throw error for missing data', async () => {

      const result = await user.signUp({
        full_name: "Test",
        email: "test@test.com",
        "password": "12345678j",
        "passwordConfirmation": "12345678j",
        "merchantUid": "d1-d1-d1-ddfh",
        "type": "merchant",
        "referrer": "http://localhost",
      });

      expect(result).to.deep.equal({
        "errors": {
          "full_name": "The full_name must not be empty and between 2 and 250 characters.",
          "email": "The email is not in a valid format.",
          "merchant_uuid": "The UUID must not be empty.",
          "password": "The password must be at least 8 characters.",
          "password_confirmation": "The password_confirmation does not match the password.",
          "type": "The type must not be empty and must be consumer or merchant.",
        }
      });

    });
  });

  describe('#requestNewPassword()', function() {
    it('should throw missing data error because of FormData', async () => {

      const result = await user.requestNewPassword({
        email: "test@test.com",
        merchantUid: "asd-f1hf1-fa1f-gh",
      });

      expect(result).to.deep.equal({
        "errors": {
          "email": "The email is not in a valid format.",
          "merchant_uuid": "The uuid must not be empty.",
        }
      });

    });
  });

  describe("#setNewPassword()", function() {
    it('should throw error for missing data', async () => {
      const result = await user.setNewPassword({
        password: "test@test.com",
        passwordConfirmation: "asd-f1hf1-fa1f-gh",
      }, 'asdhgf19jrf2g89fdlkfgjhgklsd19');

      expect(result).to.deep.equal({
        "errors": {
          "password_confirmation": "The password_confirmation does not match the password.",
        }
      });
    });
  });

  describe("#getAccountInfo()", function() {
    it('should throw error for invalid auth', async () => {
      const result = await user.getAccountInfo('asdhgf19jrf2g89fdlkfgjhgklsd19');

      expect(result).to.deep.equal({
        "errors": {
          "401": "Invalid auth token",
        }
      });
    });
  });

  describe("#getSocialLoginUrls()", function() {
    it('should throw error for invalid state', async () => {
      const result = await user.getAccountInfo('asdhgf19jrf2g89fdlkfgjhgklsd19');

      expect(result).to.deep.equal({
        "errors": {
          "401": "Invalid auth token",
        }
      });
    });
  });

  describe("#updateAccount()", function() {
    it('should throw error for invalid state', async () => {
      const result = await user.updateAccount({ full_name: 'TEST' });

      expect(result).to.deep.equal({
        "errors": {
          "401": "Invalid auth token",
        }
      });
    });
  });

  describe("#changePassword()", function() {
    it('should throw error for invalid data', async () => {
      const result = await user.changePassword(
        {
          token: 'gy189d89efrjdkwejhg8f3fwj',
          password: 'password123',
          passwordConfirmation: 'password123'
        });

      expect(result).to.deep.equal({
        "errors": {
          "401": "Invalid auth token",
        }
      });
    });
  });

  describe("#getRegisterFields()", function() {
    it('should return register fields', async () => {
      const result = await user.getRegisterFields(
        '528b1b80-5868-4abc-a9b6-4d3455d719c8'
      );

      expect(result).to.have.property('collection');
    });
  });


});
