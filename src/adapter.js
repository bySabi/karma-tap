function createStartFn(tc) {
  return function(config) {
    // global object tapParser from 'parser.js'
    var finished = tapParser.finished; // eslint-disable-line no-undef
    var parser = tapParser.parser; // eslint-disable-line no-undef
    var numResults = 0;
    var done = false;
    var res = [];
    var suite = '';
    var startTime = new Date().getTime();
    var parseStream = parser();
    var skip = /^# SKIP\s/;

    parseStream.on('comment', function(comment) {
      // handle skipped test
      if (skip.test(comment)) {
        res.push({
          description: comment.replace(skip, ''),
          skipped: true
        });
        return;
      }

      // TODO: validate if comment is a test 'name'
      suite = comment;
    });

    parseStream.on('assert', function(assertion) {
      numResults++;
      res.push({
        description: assertion.name,
        success: assertion.ok,
        log: [JSON.stringify(assertion.diag || assertion, null, 2)],
        suite: [suite],
        time: new Date().getTime() - startTime
      });
    });

    parseStream.on('complete', function(results) {
      tc.info({ total: numResults });
      for (var i = 0, len = res.length; i < len; i++) {
        tc.result(res[i]);
      }
      tc.complete({
        coverage: window.__coverage__
      });
    });

    // this part lifted from zuul
    // https://github.com/defunctzombie/zuul/blob/master/frameworks/tape/client.js
    var finishedStream = finished(function() {
      done = true;
      parseStream.end();
    });

    var originalLog = console.log;
    console.log = function () {
      var msg = arguments[0];

      // do not write in a closed WriteStream
      if (!done) {
        parseStream.write(msg + '\n');
        finishedStream.write(msg + '\n');
      }

      // transfer log to original console,
      // this shows the tap output in console
      // and also let the user add console logs
      if (typeof originalLog === 'function') {
        return originalLog.apply(this, arguments);
      }
    }
  }
};

window.__karma__.start = createStartFn(window.__karma__);
