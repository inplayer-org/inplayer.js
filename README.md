InPlayer JavaScript SDK
=======================

[![npm version](https://img.shields.io/npm/v/@inplayer-org/inplayer.js.svg)](https://www.npmjs.com/package/@inplayer-org/inplayer.js)
[![Build Status](https://travis-ci.org/inplayer-org/inplayer.js.svg?branch=ci)](https://travis-ci.org/inplayer-org/inplayer.js)

[inplayer.com](https://inplayer.com)

SDK Documentation can be found [here](https://inplayer-org.github.io/inplayer.js/)

## Installation

Install the package from [npm](https://www.npmjs.com/package/@inplayer-org/inplayer.js) and import it in your project.

```bash
npm install --save @inplayer-org/inplayer.js
```

Alternatively you can include the script like so:

```
<script src="https://unpkg.com/@inplayer-org/inplayer.js"></script>
```

## Usage

```
// Change default config example

InPlayer.setConfig('develop');
```

```
// Authenticate

InPlayer.Account.authenticate({
    merchantUid: '528b1b80-ddd1hj-4abc-gha3j-111111',
    referrer: 'http://localhost:3000/',
    email: 'test@test.com',
    password: 'test123',
}).then(data => console.log(data));

```

## Contributing

We love community contributions, so here's a quick guide if you want to help out:

1. Fork the repository
2. Write your changes
3. Make sure the tests pass
4. Commit your changes
5. Send us a PR
