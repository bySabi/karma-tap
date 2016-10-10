# Karma TAP adapter

[![npm version](https://badge.fury.io/js/karma-tap.svg)](https://badge.fury.io/js/karma-tap)
[![npm downloads](https://img.shields.io/npm/dm/karma-tap.svg?style=flat-square)](https://www.npmjs.com/package/karma-tap)
[![Build Status](https://travis-ci.org/bySabi/karma-tap.svg?branch=master)](https://travis-ci.org/bySabi/karma-tap)
[![Windows Tests](https://img.shields.io/appveyor/ci/bySabi/karma-tap/master.svg?label=Windows%20Tests)](https://ci.appveyor.com/project/bySabi/karma-tap)
[![bitHound Overall Score](https://www.bithound.io/github/bySabi/karma-tap/badges/score.svg)](https://www.bithound.io/github/bySabi/karma-tap)

> This Karma adapter reads [TAP](http://testanything.org/) output from runners like
[tape](https://github.com/substack/tape) into [Karma](http://karma-runner.github.io/1.0/index.html)

## Installation

### npm
```bash
npm install karma-tap --save-dev
```

## Configuration Example
`karma.conf.js`
```js
module.exports = function(config) {
  config.set({
    frameworks: ['browserify', 'tap'],
    files: [
      'test/**/*.js'
    ],
    preprocessors: {
      'test/**/*.js': [ 'browserify' ]
    }
  });
};
```

## Projects using `karma-tap`
* [carma-tap-webpack](https://github.com/bySabi/carma-tap-webpack)

## TAP Protocol
Support TAP Protocol version `13`

## Credits

### author
* Tom MacWright <> [@tmcw](https://github.com/tmcw)

### current mantainers
* [@bySabi](https://github.com/bySabi)

### top contributors
* [@eiriksm](https://github.com/eiriksm)

## Contributing

* Documentation improvement
* Feel free to send any PR

## License

[ISC][isc-license]

[isc-license]:./LICENSE
