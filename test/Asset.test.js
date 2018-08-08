import { expect } from 'chai';
import InPlayer from '../src';

describe('Asset', function() {
    let asset;

    beforeEach(() => {
        asset = InPlayer.Asset;
    });

    describe('#checkAccessForAsset()', function() {
        it('should return data with error object - invalid auth', async () => {
            const result = await asset.checkAccessForAsset(
                'eyJ0eXAiOiJOGIxYjgNR5Y',
                36320
            );
            //error
            expect(result).to.deep.equal({
                errors: {
                    '401': 'Invalid auth token',
                },
            });
        });
    });

    describe('#findAsset()', function() {
        it('should return data with asset object', async () => {
            const result = await asset.findAsset(
                1,
                'c62e75f2-e090-4b0b-a3b2-ca70d52f19ac'
            );
            //check only 1 property (there are a lot)
            expect(result).to.include({
                merchant_uuid: 'c62e75f2-e090-4b0b-a3b2-ca70d52f19ac',
            });
        });
    });

    describe('#findExternalAsset()', function() {
        it('should return data with external asset object (not found)', async () => {
            const result = await asset.findExternalAsset(
                'brightcove',
                'shddasdas-2623-sdgd-23623',
                'b43613af-dacc-44c3-b640-c89a1115aeba'
            );

            //check only 1 property (there are a lot)
            expect(result.message).equal('Asset not found');
        });
    });

    describe('#findPackage()', function() {
        it('should return data with package object', async () => {
            const result = await asset.findPackage(13);

            //check only 1 property (there are a lot)
            expect(result.merchant_id).equal(2);
        });
    });

    describe('#getAssetAccessFees()', function() {
        it('should return array with access fees', async () => {
            const result = await asset.getAssetAccessFees(36320);

            //check only 1 property (there are a lot)
            expect(typeof result).equal('object');
        });
    });
});
