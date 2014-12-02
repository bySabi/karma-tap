# Karma TAP adapter

This adapter reads [TAP](http://testanything.org/) output from runners like
[tape](https://github.com/substack/tape) into [Karma](http://karma-runner.github.io/0.12/index.html).

## Installation

    npm install --save-dev karma-tap

## Configuration Example

```js
module.exports = function(config) {
    config.set({
        frameworks: ['browserify', 'tap'],
        files: [
            'test/*.js'
        ],
        preprocessors: {
            'test/**/*.js': [ 'browserify' ]
        }
    });
};
```
