var TAPReporter = function(baseReporterDecorator, config, logger, helper) {
  var tapReporterConfig = config.tapReporter || {},
    disableStdout = !!tapReporterConfig.disableStdout,
    prettifierConfig = tapReporterConfig.prettifier,
    separatorConfig = tapReporterConfig.separator,
    log = logger.create('karma-tap-pretty-reporter'),
    out, stream = require('stream'),
    path = require('path'),
    fs = require('fs'),
    EOL = require('os').EOL,
    prettifiers = require('./src/prettifiers.js'),
    numbers, outputFile,
    currentSuite,
    separator = '';

  var prettifier = prettifiers[prettifierConfig] || prettifiers['default'];
  var prettify = prettifier.prettify();

  /**
   * save all data that is coming in to the `data` variable for later use and
   * proxy input to `this.write`
   */
  function write(data) {
    output = output + data;
    if (!disableStdout) {
      out.push(data);
    }
  }

  function writeSuite(suite) {
    suite = suite.join(' ').replace(/\./g, '_');
    if (currentSuite != suite) {
      write(suite);
      currentSuite = suite;
    }
  }

  if (tapReporterConfig.outputFile) {
    outputFile = path.resolve(config.basePath, tapReporterConfig.outputFile)
  }

  baseReporterDecorator(this);

  this.onRunStart = function() {
    numbers = new Object();
    output = '';
    currentSuite = '';

    if (!disableStdout) {
      out = new stream.Readable();
      out._read = function () {};
      out.pipe(prettify()).pipe(process.stdout);

      // output Test `session` separator
      if (separator) console.log(separator);
    }

    write('TAP version 13' + EOL);
  };

  this.onBrowserStart = function(browser) {
    numbers[browser.id] = 0;
  };

  this.specSuccess = function(browser, result) {
    writeSuite(result.suite);
    write('ok ' + ++numbers[browser.id] + ' ' + result.description + EOL);
  };

  this.specFailure = function(browser, result) {
    var resultLog = JSON.parse(result.log[0]);
    writeSuite(result.suite);
    write('not ok ' + ++numbers[browser.id] + ' ' + result.description + EOL);
    write('  ---' + EOL);
    for (var key in resultLog) {
      write('    ' + key + ': ' + resultLog[key] + EOL);
    }
    write('  ...' + EOL);
  };

  this.specSkipped = function(browser, result) {
    write('# SKIP' + ' ' + result.description);
  };

  this.onRunComplete = function(browsers, results) {
    var total = 0, success = 0, failed = 0;
    browsers.forEach(function(browser, id) {
      total += browser.lastResult.total;
      success += browser.lastResult.success;
      failed += browser.lastResult.failed;
    });

    write(EOL);
    write('1..' + total + EOL);
    write('# tests ' + total + EOL);
    write('# pass  ' + success + EOL);
    if (failed) {
      write('# fail  ' + failed + EOL);
    }
    write(EOL);
    if (!failed) {
      write('# ok' + EOL);
    }
    write(EOL);

    if (!disableStdout) {
      // close stream
      out.push(null);

      // set Tests `session` separator
      if (separatorConfig) {
        separator = typeof separatorConfig !== 'boolean' ? separatorConfig : prettifier.separator();
      }
    }

    if (outputFile) {
      helper.mkdirIfNotExists(path.dirname(outputFile), function (err) {
        if (err) {
          return log.error('error writing report to file: ' + err);
        }
        log.info('writing report to file: ' + outputFile);
        fs.writeFileSync(outputFile, output);
      });
    }
  };
};

TAPReporter.$inject = ['baseReporterDecorator', 'config', 'logger', 'helper'];

module.exports = {
  'reporter:tap-pretty': ['type', TAPReporter]
};
