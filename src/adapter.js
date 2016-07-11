function createStartFn(tc) {
  return function(config) {
    // global object tapParser from 'parser.js'
    var finished = tapParser.finished, parser = tapParser.parser;
    var numResults = 0;
    var done = false;
    var res = [];
    var suite = '';
    var startTime = new Date().getTime();
    var parse_stream = parser();
    var skip = /^# SKIP\s/;

    parse_stream.on('comment', function(comment) {
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

    parse_stream.on('assert', function(assertion) {
      numResults++;
      res.push({
        description: assertion.name,
        success: assertion.ok,
        log: [JSON.stringify(assertion.diag || assertion, null, 2)],
        suite: [suite],
        time: new Date().getTime() - startTime
      });
    });

    parse_stream.on('complete', function(results) {
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
    var finished_stream = finished(function() {
      done = true;
      parse_stream.end();
    });

    var originalLog = console.log;
    console.log = function () {
      var msg = arguments[0];

      // do not write in a closed WriteStream
      if (!done) {
        parse_stream.write(msg + '\n');
        finished_stream.write(msg + '\n');
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
