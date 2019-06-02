import { expect } from 'chai';
import InPlayer from '../src';

describe('Asset', function () {
    InPlayer.setConfig('develop');

    let secret = process.env.CLIENT_SECRET;
    let asset = InPlayer.Asset;
    let user = InPlayer.Account;

    before(() => {
        async () =>
            await user.authenticate({
                clientId: 'b0899d7f-66da-40fc-8eeb-36cad735589c',
                clientSecret: secret,
                referrer: 'localhost.com',
            })();
    });

    describe('#checkAccessForAsset()', function () {
        it('should return data with error object - asset not found', async () => {
            try {
                await asset.checkAccessForAsset(123);
            } catch (error) {
                const result = await error.response.json();

                expect(result).to.have.property('code');
                expect(result).to.have.property('message');
                expect(result).to.have.property('errors');
            }
        });
    });

    describe('#getAsset()', function () {
        it('should return data with asset object', async () => {
            const result = await asset.getAsset(
                36356,
                'b0899d7f-66da-40fc-8eeb-36cad735589c'
            );
            // check only 1 property (there are a lot)

            expect(result).to.include({
                merchant_uuid: 'b0899d7f-66da-40fc-8eeb-36cad735589c',
            });
        });
    });

    describe('#findExternalAsset()', function () {
        it('should return data with external asset object (not found)', async () => {
            try {
                await asset.getExternalAsset(
                    'brightcove',
                    'shddasdas-2623-sdgd-23623',
                    'b43613af-dacc-44c3-b640-c89a1115aeba'
                );
            } catch (error) {
                const result = await error.response.json();

                expect(result).to.have.property('code');
                expect(result).to.have.property('message');
            }
        });
    });

    describe('#getPackage()', function () {
        it('should return data with package object', async () => {
            try {
                await asset.getPackage(13);
            } catch (error) {
                const result = await error.response.json();

                expect(result).to.have.property('code');
                expect(result).to.have.property('message');
            }
        });
    });

    describe('#getAssetAccessFees()', function () {
        it('should return array with access fees', async () => {
            const result = await asset.getAssetAccessFees(36356);

            expect(result).to.be.a('array');
        });
    });
});
