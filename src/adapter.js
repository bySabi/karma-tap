var createStartFn = function(tc, env) {
  var numResults = 0;
  var res = [];
  var startTime = new Date().getTime();
  var parse_stream = tapParser(function(results) {
    tc.info({ total: numResults });
    for (var i = 0, len = res.length; i < len; i++) {
      tc.result(res[i]);
    }
    tc.complete({
      coverage: window.__coverage__
    });
  }).on('assert', function(assertion) {
    numResults++;
    res.push({
      description: assertion.name,
      success: assertion.ok,
      log: [JSON.stringify(assertion.diag || assertion, null, 2)],
      suite: [],
      time: new Date().getTime() - startTime
    });
  });

  // this part lifted from zuul
  // https://github.com/defunctzombie/zuul/blob/master/frameworks/tape/client.js
  var originalLog = console.log;
  console.log = function (msg) {
    if (!parse_stream.writable) return;
    var index = 1;
    var args = arguments;

    if (typeof msg === 'string') {
      msg = msg.replace(/(^|[^%])%[sd]/g, function (_, s) {
        return s + args[index++];
      });
    }

    for (var i = index; i < args.length; i++) {
      msg += ' ' + args[i];
    }

    parse_stream.write(msg + '\n');
    if (/^# fail\s*\d+$/.test(msg) || /^# ok/.test(msg)) {
      // reset console.log to make sure this stream doesn't get a write error.
      console.log = originalLog;
      parse_stream.end();
    }

    if (typeof originalLog === 'function') {
      return originalLog.apply(this, arguments);
    }
    else if (originalLog) return originalLog(arguments[0]);
  };

  return function(config) {
  };
};

window.__karma__.start = createStartFn(window.__karma__);
