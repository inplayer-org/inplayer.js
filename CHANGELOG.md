# Change Log

All notable changes to this project will be documented in this file.

# [2.13.1] - 20-12-2019

### Fixes

- Re-publish unsuccesfully published 2.13.0 version

# [2.13.0] - 20-12-2019

### Added

- Add brandingId param to paypal payment

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
