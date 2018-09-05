import { expect } from 'chai';
import InPlayer from '../src';

describe('Voucher', function() {
    InPlayer.setConfig('develop');

    let secret = process.env.CLIENT_SECRET;
    let voucher = InPlayer.Voucher;

    before(() => {
        async () =>
            await user.authenticate({
                clientId: 'b0899d7f-66da-40fc-8eeb-36cad735589c',
                clientSecret: secret,
                referrer: 'localhost.com',
            })();
    });

    describe('#getDiscount()', function() {
        it('should return discount', async () => {
            try {
                await voucher.getDiscount(123);
            } catch (error) {
                const result = await error.response.json();

                expect(result).to.have.property('code');
                expect(result).to.have.property('errors');
            }
        });
    });
});
