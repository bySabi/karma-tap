# karma-tap-pretty-reporter
> A Karma plugin to `report` and `prettify` test results in TAP.

## Installation

`package.json`
```json
{
  "devDependencies": {
    "karma": "1.x.x",
    "karma-tap": "2.x.x",
    "karma-tap-pretty-reporter": "1.x.x",
    "faucet": "0.0.1"
  }
}
```
> a `prettifier` package must be add too. See below supported prettifiers.


## Configuration
```js
// karma.conf.js
module.exports = function(config) {
  config.set({
    reporters: ['tap-pretty'],

    tapReporter: {
      prettifier: 'tap-spec',       // default 'standard TAP'
      separator: '****-----****'    // default 'false'
    },
  });
};
```

### Using `separator`
On Karma `autoWatch: true` mode you could need separate test run cycles. Set your own `separator` string or set to `true` for default separator. [prettifiers.js](https://github.com/bySabi/karma-tap-pretty-reporter/blob/master/src/prettifiers.js)

### Report to a file
Optionally you can save report to a file and turn off output to the console.
```js
reporters: ['tap-pretty'],

tapReporter: {
  outputFile: './test.out.tap',
  disableStdout: true            // default 'false'
},
```

## Supported `prettifiers`
* [faucet](https://github.com/substack/faucet)
* [tap-spec](https://github.com/scottcorgan/tap-spec)
* [tap-min](https://github.com/gummesson/tap-min)
* [tap-diff](https://github.com/axross/tap-diff)
* [tap-notify](https://github.com/axross/tap-notify)
* [tap-summary](https://github.com/zoubin/tap-summary)
* [tap-markdown](https://github.com/Hypercubed/tap-markdown)

## Example usage
[karma--tap--boilerplate](https://github.com/bySabi/karma--tap--boilerplate)

## Contributing
* Documentation improvement
* Feel free to send any PR

## LICENSE
ISC
