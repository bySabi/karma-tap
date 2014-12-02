var createPattern = function(path) {
  return {pattern: path, included: true, served: true, watched: false};
};

var initTape = function(files, tapeConfig) {
    files.unshift(createPattern(__dirname + '/src/adapter.js'));
    files.unshift(createPattern(__dirname + '/src/tap-parser.js'));
};

initTape.$inject = ['config.files'];

module.exports = {
  'framework:tape': ['factory', initTape]
};
