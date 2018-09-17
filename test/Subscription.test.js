import { expect } from 'chai';
import InPlayer from '../src';
describe('Subscription', function() {
    InPlayer.setConfig('develop');

    let secret = process.env.CLIENT_SECRET;
    let subscription = InPlayer.Subscription;

    before(() => {
        async () =>
            await user.authenticate({
                clientId: 'b0899d7f-66da-40fc-8eeb-36cad735589c',
                clientSecret: secret,
                referrer: 'localhost.com',
            })();
    });

    describe('#getSubscriptions()', function() {
        it('should return unauthorized request with wrong auth', async () => {
            try {
                await subscription.getSubscriptions();
            } catch (error) {
                const result = await error.response.json();

                expect(result).to.have.property('code');
                expect(result).to.have.property('errors');
            }
        });
    });

    describe('#cancelSubscription()', function() {
        it('should return unauthorized request with wrong auth or wrong url', async () => {
            try {
                await subscription.cancelSubscription('abcdef');
            } catch (error) {
                const result = await error.response.json();

                expect(result).to.have.property('code');
                expect(result).to.have.property('message');
            }
        });
    });
});
