import { expect } from 'chai';
import InPlayer from '../src';

describe('Misc', function() {
    // jsdom();
    let misc;

    beforeEach(() => {
        misc = InPlayer.Misc;
    });

    describe('#getDlcLinks()', function() {
        it('should return unaothorized request with wrong auth', async () => {
            const result = await misc.getDlcLinks(
                'eyJ0eXAiOiJOGIxYjgNR5Y',
                36320
            );

            expect(result).to.deep.equal({
                reason: 'Unauthorized request.',
            });
        });
    });

    describe('#getDiscount()', function() {
        it('should return unaothorized request with wrong auth', async () => {
            const result = await misc.getDiscount(
                'eyJ0eXAiYXQiOjE1MTMyNDMwODgsInN1YiI6InZsZF90ZXN0QGNvbnN1bWVyLmNvbSIsImFpZCI6MjE0ODIsIm1pZCI6MjEsIm11aSI6IjUyOGIxYjgwLTU4NjgtNGFiYy1hOWI2LTRkMzQ1NWQ3MTljOCIsImN0eCI6WyJjb25zdW1lciJdLCJleHAiOjE1MTMyNDY2ODh9.1-8i9lsUaIL6BF1MRelGlU7J2FGi0xNlr9MB18oqYG4',
                {
                    voucherCode: 'm-true',
                    merchantId: 21,
                    accessFeeId: 2042,
                }
            );

            expect(result).to.deep.equal({
                errors: {
                    '401': 'Invalid auth token',
                },
            });
        });
    });

    describe('#getBranding()', function() {
        it('should return branding object', async () => {
            const result = await misc.getBranding(
                'c62e75f2-e090-4b0b-a3b2-ca70d52f19ac'
            );

            expect(result).to.be.an('array');
        });
    });

    describe('#downloadProtectedFile()', function() {
        it('should return unauthorized', async () => {
            const result = await misc.downloadProtectedFile(
                'eyJ0eXAiOiJOGIxYjgNR5Y',
                {}
            );

            expect(result).to.deep.equal({
                errors: 'Sorry, something went wrong.',
            });
        });
    });
});
