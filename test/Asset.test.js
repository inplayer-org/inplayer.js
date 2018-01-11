import {expect} from 'Chai';
import Asset from '../src/Models/Asset';

describe('Asset', function () {
  let asset;

  beforeEach(() => {
    asset = new Asset();
  });


  describe('#checkAccessForAsset()', function() {
    it('should return data with error object - invalid auth', async () => {

      const result = await asset.checkAccessForAsset(
        'eyJ0eXAiOiJOGIxYjgNR5Y',
        36320
      );

      expect(result).to.deep.equal({
        'errors': {
          '401': 'Invalid auth token'
        }
      });

    });
  });


  describe('#findAsset()', function() {
    it('should return data with asset object', async () => {

      const result = await asset.findAsset(
        36320,'528b1b80-5868-4abc-a9b6-4d3455d719c8'
      );

      //check only 1 property (there are a lot)
      expect(result).to.include({ "merchant_uuid": "528b1b80-5868-4abc-a9b6-4d3455d719c8" });

    });
  });

  describe('#findExternalAsset()', function() {
    it('should return data with external asset object (not found)', async () => {

      const result = await asset.findExternalAsset(
        'brightcove','shddasdas-2623-sdgd-23623'
      );

      //check only 1 property (there are a lot)
      expect(result.message).equal("Asset not found");

    });
  });

  describe('#findPackage()', function() {
    it('should return data with package object', async () => {

      const result = await asset.findPackage(36332);

      //check only 1 property (there are a lot)
      expect(result.merchant_id).equal(68);

    });
  });

  describe('#getAssetAccessFees()', function() {
    it('should return array with access fees', async () => {

      const result = await asset.getAssetAccessFees(36320);

      //check only 1 property (there are a lot)
      expect(typeof result).equal("object");

    });
  });

  describe('#getFreemiumAsset()', function() {
    it('should return an object with an error for invalid auth token', async () => {

      const result = await asset.getFreemiumAsset(
        'eyJ0eXAiOiJOGIxYjgNR5Y',
        36320
      );

      //check only 1 property (there are a lot)
      expect(result).to.deep.equal({
        'errors': {
          '401': 'Invalid auth token'
        }
      });

    });
  });

});
