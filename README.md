# Project Title

InPlayer SDK

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

NOTE:

If CMD/Powershell on Windows is crashing on WATCH mode, go to
node_modules/rollup/bin/rollup and change

const SHOW_ALTERNATE_SCREEN = '\u001B[?1049h';
const HIDE_ALTERNATE_SCREEN = '\u001B[?1049l';

to

const SHOW_ALTERNATE_SCREEN = '';
const HIDE_ALTERNATE_SCREEN = '';


### Prerequisites

-

### Development

### Installing

Method 1 using <script> tag:
```html
  - Import the bundle.js inside your html as follows:
    <script src="https://inplayer.com/SDK/bundle.min.js"></script>
  - Initialize the SDK and use any of the functions
    <script>
      var inPlayer = new InPlayer();
      console.log(inPlayer.User.isAuthenticated());
    </script>
```
Method 2 using NPM:

  - Run the following command
    $ npm install inplayer-sdk
  - Import the SDK inside any javascript file:
     import InPlayer from 'inplayer-sdk';
  - Run any function you need
     InPlayer.User.isAuthenticated()

## Running the tests

-

## Deployment

-


## Contributing

-

## Versioning

0.1.0

## Authors


## License

InPlayer Ltd.
