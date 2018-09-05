import { expect } from 'chai';
import InPlayer from '../src';

describe('Payment', function() {
    InPlayer.setConfig('develop');

    let secret = process.env.CLIENT_SECRET;
    let payment = InPlayer.Payment;

    before(() => {
        async () =>
            await user.authenticate({
                clientId: 'b0899d7f-66da-40fc-8eeb-36cad735589c',
                clientSecret: secret,
                referrer: 'localhost.com',
            })();
    });

    describe('#getPaymentMethods()', function() {
        it('should return unaothorized request with wrong auth', async () => {
            const result = await payment.getPaymentMethods();

            expect(result).to.be.a('array');
        });
    });

    describe('#getPaymentTools()', function() {
        it('should return unaothorized request with wrong auth', async () => {
            const result = await payment.getPaymentTools(123);

            expect(result).to.be.a('array');
        });
    });

    describe('#payForAsset()', function() {
        it('should return unaothorized request with wrong auth', async () => {
            try {
                await payment.create({});
            } catch (error) {
                const result = await error.response.json();

                expect(result).to.have.property('code');
                expect(result).to.have.property('errors');
            }
        });
    });

    describe('#getPayPalParams()', function() {
        it('should return unaothorized request with wrong auth', async () => {
            try {
                await payment.getPayPalParams({});
            } catch (error) {
                const result = await error.response.json();

                expect(result).to.have.property('code');
                expect(result).to.have.property('errors');
            }
        });
    });
});
