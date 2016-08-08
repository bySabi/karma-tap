var PassThrough = require('readable-stream/passthrough');
var aSeparator = '****************************';

module.exports = {
  'faucet': {
    prettify: function() { return require('faucet') },
    separator: function() { return aSeparator }
  },
  'tap-spec': {
    prettify: function() { return require('tap-spec') },
    separator: function() { return aSeparator }
  },
  'tap-min': {
    prettify: function() { return require('tap-min') },
    separator: function() { return aSeparator }
  },
  'tap-diff': {
    prettify: function() { return require('tap-diff') },
    separator: function() { return aSeparator }
  },
  'tap-notify': {
    prettify: function() { return require('tap-notify') },
    separator: function() { return aSeparator }
  },
  'tap-summary': {
    prettify: function() { return require('tap-summary') },
    separator: function() { return aSeparator }
  },
  'tap-markdown': {
    prettify: function() { return require('tap-markdown') },
    separator: function() { return aSeparator }
  },
  'default': {
    prettify: function() { return function () { return new PassThrough() }},
    separator: function() { return '' }
   }
}
