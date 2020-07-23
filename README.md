<h1 align="center">
  <a target="_blank" href="https://inplayer-org.github.io/inplayer.js/">
    <img src="https://assets.inplayer.com/images/inplayer-256.png" alt="inplayer-js" title="InPlayer JS SDK" width="300">
    <br />
    <span style="font-size: 1.5rem; color: blue">InPlayer JavaScript SDK</span>
  </a>
</h1>
<p align="center" style="font-size: 1.2rem;">InPlayer's JS API client wrapper</p>

[![npm version](https://img.shields.io/npm/v/@inplayer-org/inplayer.js.svg)](https://www.npmjs.com/package/@inplayer-org/inplayer.js)
![CI](https://github.com/inplayer-org/inplayer.js/workflows/CI/badge.svg)
[![Netlify Status](https://api.netlify.com/api/v1/badges/a6f99b76-a75a-48d4-ab3e-d0ad387cbc41/deploy-status)](https://app.netlify.com/sites/inplayer-js/deploys)

[inplayer.com](https://inplayer.com)

SDK Documentation can be found:

- [v2](https://inplayer-org.github.io/inplayer.js/)
- [v3](https://inplayer-js.netlify.app/)

## Installation

Install the package from [npm](https://www.npmjs.com/package/@inplayer-org/inplayer.js) and import it in your project.

```bash
npm install --save @inplayer-org/inplayer.js
```

Alternatively you can include the script like so:

### Latest v2 version

```
<script src="https://unpkg.com/@inplayer-org/inplayer.js@v2/dist/inplayer.umd.js"></script>
```

### Latest v3 version

```
<script src="https://unpkg.com/@inplayer-org/inplayer.js@v3/dist/inplayer.min.js"></script>
```

### Sign in using grant type: password

```
InPlayer.Account.signIn({
    email: 'test@test.com',
    password: '12345678',
    cliendId: 'b0899d7f-66da-40fc-8eeb-36cad735589c',
    referrer: 'http://localhost:3000/'
}).then(data => console.log(data));
```

### Sign in using grant type: refresh token

```
InPlayer.Account.signIn({
    clientId: 'b0899d7f-66da-40fc-8eeb-36cad735589c',
    refreshToken: '528b1b80-ddd1hj-4abc-gha3j-111111',
    referrer: 'http://localhost:3000/'
}).then(data => console.log(data));
```

### Sign in using grant type: client secret

```
InPlayer.Account.signIn({
    clientId: 'b0899d7f-66da-40fc-8eeb-36cad735589c',
    clientSecret: '528b1b80-ddd1hj-4abc-gha3j-111111',
    referrer: 'http://localhost:3000/'
}).then(data => console.log(data));
```

## Contributing

We love community contributions, so here's a quick guide if you want to help out:

1. Fork the repository
2. Write your changes
3. Make sure the tests pass
4. Update the docs
5. Commit your changes
6. Send us a PR
