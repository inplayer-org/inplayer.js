import { expect } from 'chai';
import InPlayer from '../src';

describe('Account', function () {
    InPlayer.setConfig('develop');

    let secret = process.env.CLIENT_SECRET;

    let user = InPlayer.Account;

    describe('#authenticate()', function () {
        it('should authenticate the user', async () => {
            const result = await user.authenticate({
                clientId: 'b0899d7f-66da-40fc-8eeb-36cad735589c',
                clientSecret: secret,
                referrer: 'localhost.com',
            });

            expect(result).to.have.property('account');
            expect(result).to.have.property('access_token');

            expect(user.isAuthenticated()).to.equal(true);
        });
    });

    describe('#signOut()', function () {
        it('should sign out', async () => {
            expect(user.isAuthenticated()).to.equal(true);
            const result = await user.signOut();

            expect(result).to.have.property('code');
            expect(result).to.have.property('message');
            expect(user.isAuthenticated()).to.equal(false);
        });
    });

    describe('#signUp()', function () {
        it('should throw error for invalid data', async () => {
            try {
                await user.signUp({
                    full_name: '',
                    email: 'test@test.com',
                    password: '12345678j',
                    passwordConfirmation: '12345678jjjj',
                    clientId: 'b0899d7f-66da-40fc-8eeb-36cad735589c',
                    type: 'consumer',
                    metadata: { foo: 'bar' },
                    referrer: 'http://localhost',
                });
            } catch (error) {
                const result = await error.response.json();

                expect(result).to.have.property('code');
                expect(result).to.have.property('errors');
            }
        });
    });

    describe('#requestNewPassword()', function () {
        it('should throw missing data error because of FormData', async () => {
            const result = await user.requestNewPassword({
                email: 'test@test.com',
                merchantUuid: 'asd-f1hf1-fa1f-gh',
            });

            expect(result).to.have.property('explain');
        });
    });

    describe('#getAccount()', function () {
        it('should fetch the account info', async () => {
            await user.authenticate({
                clientId: 'b0899d7f-66da-40fc-8eeb-36cad735589c',
                clientSecret: secret,
                referrer: 'localhost.com',
            });

            const result = await user.getAccount();

            expect(result).to.have.property('id');
        });
    });

    describe('#getSocialLoginUrls()', function () {
        it('should fetch social login urls', async () => {
            let state = btoa(
                JSON.stringify({
                    uuid: 'b0899d7f-66da-40fc-8eeb-36cad735589c',
                    redirect: 'http://example.com',
                })
            );
            const result = await user.getSocialLoginUrls(state);

            expect(result).to.have.property('social_urls');
            expect(result.social_urls).to.be.a('array');
        });
    });

    describe('#updateAccount()', function () {
        it('should throw error for invalid state', async () => {
            await user.authenticate({
                clientId: 'b0899d7f-66da-40fc-8eeb-36cad735589c',
                clientSecret: secret,
                referrer: 'localhost.com',
            });

            try {
                const result = await user.updateAccount({
                    fullName: 'Automated Tests Merchant'
                });

                expect(result).to.have.property('id');
            } catch (error) {
                const result = await error.response.json();

                expect(result).to.have.property('code');
                expect(result).to.have.property('errors');
            }
        });
    });

    describe('#changePassword()', function () {
        it('should throw error for invalid data', async () => {
            await user.authenticate({
                clientId: 'b0899d7f-66da-40fc-8eeb-36cad735589c',
                clientSecret: secret,
                referrer: 'localhost.com',
            });

            try {
                await user.changePassword({
                    oldPassword: 'test123',
                    password: 'password123',
                    passwordConfirmation: 'password123',
                });
            } catch (error) {
                const result = await error.response.json();

                expect(result).to.have.property('code');
                expect(result).to.have.property('errors');
            }
        });
    });

    describe('#getRegisterFields()', function () {
        it('should return register fields', async () => {
            const result = await user.getRegisterFields(
                'b0899d7f-66da-40fc-8eeb-36cad735589c'
            );

            expect(result).to.have.property('collection');
        });
    });
});
