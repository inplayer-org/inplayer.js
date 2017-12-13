import {expect} from 'Chai';
import Misc from '../src/Models/Misc';

describe('Misc', function () {
  let misc;

  beforeEach(() => {
    misc = new Misc();
  });


  describe('#getDlcLinks()', function() {
    it('should return unaothorized request with wrong auth', async () => {

      const result = await misc.getDlcLinks(
        'eyJ0eXAiOiJOGIxYjgNR5Y',
        36320
      );

      expect(result).to.deep.equal({
        'reason': 'Unauthorized request.'
      });

    });
  });

  // describe('#getDiscount()', function() {
  //   it('should return unaothorized request with wrong auth', async () => {
  //
  //     const result = await misc.getDiscount(
  //       'eyJ0eXAiOWVyLmNvbSIWyJjb25zdW1lciJdLCJleHAiOjE1MTMxNzk2OTJ9.urZGnMCOk1NnTWeryoFWPpT7Pm0qmQjig_QmfnqyapU',
  //       {
  //           access_fee: 2042,
  //           origin: "http://localhost/sdk/",
  //           payment_method: 2
  //       }
  //     );
  //
  //     expect(result).to.deep.equal({
  //       'errors': {
  //         '401': 'Invalid auth token'
  //       }
  //     });
  //
  //   });
  // });


  describe('#getBranding()', function() {
    it('should return branding object', async () => {

      const result = await misc.getBranding(
        '528b1b80-5868-4abc-a9b6-4d3455d719c8'
      );

      expect(result).to.include({exists: true});

    });
  });

  describe('#downloadProtectedFile()', function() {
    it('should return unauthorized', async () => {

      const result = await misc.downloadProtectedFile(
        'eyJ0eXAiOiJOGIxYjgNR5Y',
        {}
      );

      expect(result).to.deep.equal({
        'errors': 'Sorry, something went wrong.'
      });

    });
  });

});
