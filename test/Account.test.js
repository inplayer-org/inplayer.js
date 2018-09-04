import { expect } from 'chai';
import Account from '../src/Models/Account';
import InPlayer from '../src';

describe('Account', function() {
    let user;

    beforeEach(() => {
        user = InPlayer.Account;
    });

    describe('#signIn()', function() {
        it('should return missing data because of FormData', async () => {
            try {
                const result = await user.authenticate({
                    email: 'test@test.com',
                    password: 'test123',
                    clientId: '1jh1f-1fff1fjr1-fr',
                    referrer: 'localhost.com',
                });
            } catch (error) {
                const res = error.response.json();

                res.then(data => {
                    expect(data).to.deep.equal({
                        code: 400,
                        errors: {
                            grant_type: 'Grant type must not be empty.',
                        },
                    });
                }).catch(error => {
                    console.log(error);
                });
            }
        });
    });

    describe('#signOut()', function() {
        it('should sign out', async () => {
            try {
                const result = await user.signOut();
            } catch (error) {
                expect(error).to.equal(
                    new Error('The user is not authenticated')
                );
            }
        });
    });

    describe('#signUp()', function() {
        it('should throw error for missing data', async () => {
            const result = await user.signUp({
                full_name: 'Test',
                email: 'test@test.com',
                password: '12345678j',
                passwordConfirmation: '12345678j',
                merchantUid: 'd1-d1-d1-ddfh',
                type: 'merchant',
                metadata: { foo: 'bar' },
                referrer: 'http://localhost',
            });

            expect(result).to.deep.equal({
                code: 400,
                errors: {
                    full_name:
                        'The full_name must not be empty and between 2 and 250 characters.',
                    email: 'The email is not in a valid format.',
                    merchant_uuid: 'The UUID must not be empty.',
                    password: 'The password must be at least 8 characters.',
                    password_confirmation:
                        'The password_confirmation does not match the password.',
                    type:
                        'The type must not be empty and must be consumer or merchant.',
                },
            });
        });
    });

    describe('#requestNewPassword()', function() {
        it('should throw missing data error because of FormData', async () => {
            const result = await user.requestNewPassword({
                email: 'test@test.com',
                merchantUid: 'asd-f1hf1-fa1f-gh',
            });

            expect(result).to.deep.equal({
                code: 400,
                errors: {
                    email: 'The email is not in a valid format.',
                    merchant_uuid: 'The uuid must not be empty.',
                },
            });
        });
    });

    describe('#getAccountInfo()', function() {
        it('should throw error for invalid auth', async () => {
            const result = await user.getAccountInfo(
                'asdhgf19jrf2g89fdlkfgjhgklsd19'
            );

            expect(result).to.deep.equal({
                errors: {
                    '401': 'Invalid auth token',
                },
            });
        });
    });

    describe('#getSocialLoginUrls()', function() {
        it('should throw error for invalid state', async () => {
            const result = await user.getAccountInfo(
                'asdhgf19jrf2g89fdlkfgjhgklsd19'
            );

            expect(result).to.deep.equal({
                errors: {
                    '401': 'Invalid auth token',
                },
            });
        });
    });

    describe('#updateAccount()', function() {
        it('should throw error for invalid state', async () => {
            const result = await user.updateAccount({ full_name: 'TEST' });

            expect(result).to.deep.equal({
                errors: {
                    '401': 'Invalid auth token',
                },
            });
        });
    });

    describe('#changePassword()', function() {
        it('should throw error for invalid data', async () => {
            const result = await user.changePassword({
                token: 'gy189d89efrjdkwejhg8f3fwj',
                password: 'password123',
                passwordConfirmation: 'password123',
            });

            expect(result).to.deep.equal({
                errors: {
                    '401': 'Invalid auth token',
                },
            });
        });
    });

    describe('#getRegisterFields()', function() {
        it('should return register fields', async () => {
            const result = await user.getRegisterFields(
                'c62e75f2-e090-4b0b-a3b2-ca70d52f19ac'
            );

            expect(result).to.have.property('collection');
        });
    });
});
