var createStartFn = function(tc, env) {
    var parser = tapParser(function(results) {
            tc.complete();
        })
        .on('assert', function(assert) {
            tc.result({
                description: assert.name,
                success: assert.ok,
                suite: []
            });
        });

    var getConsole = function(currentWindow) {
      return currentWindow.console || {
          log: function() {},
          info: function() {},
          warn: function() {},
          error: function() {},
          debug: function() {}
        };
    };

    function processConsole(tc, msg) {
        parser.write(msg + '\n');
    }

    var contextWindow = window;
    var localConsole = contextWindow.console = getConsole(contextWindow);
    var browserConsoleLog = localConsole.log;
    var logMethods = ['log', 'info', 'warn', 'error', 'debug'];
    var patchConsoleMethod = function(method) {
        var orig = localConsole[method];
        if (!orig) {
            return;
        }
        localConsole[method] = function() {
            processConsole(method, arguments[0]);
            return Function.prototype.apply.call(orig, localConsole, arguments);
        };
    };
    for (var i = 0; i < logMethods.length; i++) {
        patchConsoleMethod(logMethods[i]);
    }
    return function(config) {
    };
};

window.__karma__.start = createStartFn(window.__karma__);
