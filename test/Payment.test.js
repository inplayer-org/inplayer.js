var jsdom = require('mocha-jsdom');
import { expect } from 'chai';
import InPlayer from '../src';

describe('Payment', function() {
    jsdom();
    let payment;

    beforeEach(() => {
        payment = InPlayer.Payment;
    });

    describe('#getPaymentMethods()', function() {
        it('should return unaothorized request with wrong auth', async () => {
            const result = await payment.getPaymentMethods('12312dashgsfa');

            expect(result).to.deep.equal({
                errors: {
                    '401': 'Invalid auth token',
                },
            });
        });
    });

    describe('#getPaymentTools()', function() {
        it('should return unaothorized request with wrong auth', async () => {
            const result = await payment.getPaymentTools('12312dashgsfa', 123);

            expect(result).to.deep.equal({
                errors: {
                    '401': 'Invalid auth token',
                },
            });
        });
    });

    describe('#payForAsset()', function() {
        it('should return unaothorized request with wrong auth', async () => {
            const result = await payment.payForAsset('12312dashgsfa', {});

            expect(result).to.deep.equal({
                errors: {
                    '401': 'Invalid auth token',
                },
            });
        });
    });

    describe('#getPayPalParams()', function() {
        it('should return unaothorized request with wrong auth', async () => {
            const result = await payment.getPayPalParams('12312dashgsfa', {});

            expect(result).to.deep.equal({
                errors: {
                    '401': 'Invalid auth token',
                },
            });
        });
    });
});
