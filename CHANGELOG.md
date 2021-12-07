# Change Log

All notable changes to this project will be documented in this file.

# [3.12.2] - 07-12-2021

### Changes

- The type of getSubscription method parameter chnaged to string

# [3.12.1] - 03-12-2021
## Changes

- IOT token validity changed from 60 to 30 minutes

# [3.12.0] - 28-09-2021
## Changes

- Typedoc version upgraded to 0.22.4
- The view of our generated docs is changed, due to breaking changes introduces in typedoc 0.20.0 version
- Moved the directDebitSubscribe and idealSubscribe methods in subscription module and added deprecated description next to them in payments module
- Added more comprehensive description for methods parameters and responses 
- Removed redundant getPaymentTools method

# [3.11.3] - 23-09-2021

### Added

- New `Account` methods: `synchWithExternalAccount` and `updateExternalAccount`

# [3.11.2] - 10-05-2021

### Fixes

- Due to breaking changes introduced in typedoc 0.20.0 version, the view of our generated docs has been broken. The typedoc version is reverted to 0.19.2.

# [3.11.1] - 26-04-2021

### Fixes

- Encode password and confirm password in setNewPassword method due to special characters problem

# [3.11.0] - 11-03-2021

### Added

- New account methods: Inplayer.Account.signInV2 and Inplayer.Account.signUpV2

# [3.10.0] - 24-02-2021

### Changes

- Code only optimizations: Use code_id instead of code to avoid duplicate sessions for multiple assets and remove redundant releaseAccessCode method

# [3.9.0] - 05-02-2021

### Added

- New payment methods: InPlayer.Payment.googlePayPayment and InPlayer.Payment.applePayPayment

# [3.8.2] - 21-01-2021

### Fixes

- Corrected the return types of `TokenStorage` methods in index.d.ts

# [3.8.1] - 21-01-2021

### Fixes

- Remove token from localStorage after signOut

# [3.8.0] - 21-01-2021

### Changes

- `TokenStorage.overrides` object's methods and consequently all methods that use them can now be used asynchronously
- Add optional request param donationId to createDonationPayment and confirmDonationPayment

# [3.7.3] - 13-01-2021

### Fixes

- Add isAuthenticated to Account interface

# [3.7.2] - 12-01-2021

### Fixes

- Account class properties

# [3.7.1] - 12-01-2021

### Fixes

- Remove use of authenticatedGet in getDonationOptions method
- Change Account class properties to methods

# [3.7.0] - 11-01-2021

### Added

- Donation endpoints (getDonationOptions, createDonationPayment, confirmDonationPayment)

# [3.6.3] - 22-12-2020

### Changes

- Removed isGift and receiverEmail params from Subscription.createSubscription method

# [3.6.2]

### Fixes

- Remove register fields random query param

# [3.6.1]

### Added

- New optional parameter type to Asset.getAssetsHistory method
- New optional parameters isGift and receiverEmail to Payment.createPayment and Subscription.createSubscription methods

# [3.6.0] - 03-12-2020

### Added

- InPlayer.Account.isAuthenticated method

# [3.5.1] - 18-11-2020

### Changes

- Remove encodeURIComponent function (Code can't contain special characters)

# [3.5.0] - 17-11-2020

### Changes

- Remove redundant confirmIdealPayment and confirmIdealSubscribe methods

### Fixes

- Use encodeURIComponent to encode special code characters

# [3.4.1] - 02-11-2020

### Added

- New optional parameter `product_name` to Payment.validatePayment method

# [3.4.0] - 30-10-2020

### Added

- Added a new tokenStorage wrapper for non-web environments

### Changes

- Re-added getToken and setToken methods
- Added a new method removeToken

### Fixes

- Remove unused IdealData interface

# [3.3.0] - 19-10-2020

### Added

- New method Payment.validateReceipt

### Changes

- Extended AccessFee with current_phase

### Fixes

- Remove redundant setToken method

# [3.2.2] - 09-09-2020

### Fixes

- Revert axios version

# [3.2.1] - 07-09-2020

### Fixes

- Rename request body parameter to data for deleteAccount

# [3.2.0] - 04-09-2020

### Added

- Add endpoint for dataCaptureNoAuthAccess

# [3.1.0] - 20-08-2020

### Added

- Add getAccessCodeSession method
- Add terminateSession method

### Breaking Changes

- Change api endpoint for requestCodeAccess

# [3.0.0] - 23-07-2020

### Added

- Add ideal subscribe method
- Ideal payment actions (idealPayment and confirmIdealPayment)
- Complete rewrite to TypeScript
- Add axios as HTTP client

### Changes

- Extend the getDiscount object attribute with itemId
- Add status query param for getSubscriptions endpoint
- Add referrer param for SEPA payments

### Breaking Changes

- Use v2 endpoint for fetching access fees
- InPlayer.Account.authenticate rename to InPlayer.Account.signIn
- InPlayer.Payment.create rename to InPlayer.Payment.createPayment
- InPlayer.Subscription.create rename to InPlayer.Subscription.createSubscription

# [3.0.0-beta.14] - 14-07-2020

### Changes

- Extend the getDiscount object attribute with itemId

# [3.0.0-beta.13] - 02-07-2020

### Added

- Add ideal subscribe method

# [3.0.0-beta.12] - 30-06-2020

### Added

- Add referrer as idealPayment attribute

### Fixes

- Remove redundant ideal paymentMethod key
- Object parameter in confirmIdealPayment function is replaced with string parameter (sourceId)
- Display error message if source id is not defined

# [3.0.0-beta.11] - 29-06-2020

### Fixes

- Remove redundant DirectDebit paymentMethod key

# [3.0.0-beta.10] - 26-06-2020

### Fixes

- String parameter in confirmIdealPayment function is replaced with object parameter

# [3.0.0-beta.9] - 25-06-2020

### Added

- Ideal payment actions (idealPayment and confirmIdealPayment)

# [3.0.0-beta.8] - 23-05-2020

### Added

- Add missing props `uuid` and `merchant_uuid` in interface `AccountInformationReturn`

# [3.0.0-beta.7] - 18-05-2020

### Changes

- Add status query param for getSubscriptions endpoint

# [3.0.0-beta.6] - 11-05-2020

### Changes

- Use v2 endpoint for fetching access fees

# [3.0.0-beta.5] - 16-01-2020

### Added

- Test config

### Changes

- Rename reportSSOtoken function param (retire to deactivate)

# [3.0.0-beta.4] - 13-01-2020

### Changes

- Add string type to clientId parameter in refreshToken function
- Add missing expires property to the CreateAccout interface

# [3.0.0-beta.3] - 20-12-2019

### Add

- Branding id param to paypal payment

# [3.0.0-beta.2] - 11-12-2019

### Changes

- Update the existing or add new types and interfaces

# [3.0.0-beta.1] - 29-10-2019

### Changes

- Remove preinstall script

# [3.0.0-beta.0] - 29-10-2019

### Added

- Complete rewrite to TypeScript
- Add axios as HTTP client

### Breaking Changes

- InPlayer.Account.authenticate rename to InPlayer.Account.signIn
- InPlayer.Payment.create rename to InPlayer.Payment.createPayment
- InPlayer.Subscription.create rename to InPlayer.Subscription.createSubscription

# [2.12.3] - 11-09-2019

### Fixes

- v2.12.2 fixes published unsuccessfully

# [2.12.2] - 10-09-2019

### Fixes

- Send authorization header in setDefaultCreditCard

# [2.12.1] - 06-09-2019

### Fixes

- Rename returnUrl to return_url in Subscription.create

# [2.12.0] - 04-09-2019

### Added

- Required returnUrl param to Payment.create
- Required returnUrl param to Subscription.create
- New confirmPayment method that accepts paymentIntentId for payment confirmation

# [2.11.1] - 27-08-2019

### Changes

- Remove optional dateOfBirth parameter from signUp method

# [2.11.0] - 26-08-2019

### Changes

- Add optional brandingId parameter in directDebitCharge and directDebitSubscribe methods

# [2.10.0] - 20-08-2019

### Added

- Age verification methods in Account

### Changes

- Add optional dateOfBirth parameter in signUp and updateAccount methods

# [2.9.4] - 16-08-2019

### Fixes

- Remove response await in checkStatus

# [2.9.3] - 13-08-2019

### Fixes

- Remove double await typo in Payments

# [2.9.2] - 13-08-2019

### Fixes

- Fix isAuthenticated check in Notifications getIotToken

# [2.9.1] - 13-08-2019

### Fixes

- Await checkStatus to include error response

# [2.9.0] - 12-08-2019

### Added

- Direct Debit methods in Payments

# [2.8.3] - 09-07-2019

### Fixes

- Update TypeScript types and definitions

# [2.8.2] - 08-07-2019

### Fixes

- Update TypeScript types and definitions

# [2.8.1] - 08-07-2019

### Fixes

- Update TypeScript types and definitions

# [2.8.0] - 08-07-2019

### Added

- Add TypeScript types and definitions

# [2.7.2] - 27-06-2019

### Fixes

- Throw error if call not successful for getDefaultCreditCard and setDefaultCreditCard

# [2.7.1] - 27-06-2019

### Fixes

- Throw error if call not successful for getDefaultCreditCard and setDefaultCreditCard

# [2.7.0] - 25-06-2019

### Added

- Add getDefaultCreditCard and setDefaultCreditCard methods

# [2.6.10] - 20-06-2019

### Fixes

- Update examples in Docs
- Rename endpoints in API config to match methods

# [2.6.9] - 02-06-2019

### Fixes

- Security: Update npm dependencies
- Eslint warnings in tests

# [2.6.8] - 31-05-2019

### Fixes

- Security: Update npm dependencies

# [2.6.7] - 12-03-2019

### Fixes

- Add getSubscriptions method missing params to docs
