#!/usr/bin/env node
(function() {
  var lint, list, readAndParse, _;

  _ = require('underscore');

  param = require('commander');

  lint = require('../lib/lint').lint;

  list = function (val) { return val.split(','); };

  param
    .version('0.0.3')
    .usage('[options] -- <file ...>')
    .option('-c, --color [true|false]', 'color output ?', 'true')
    .option('-l, --level [log|info|warn|error]', 'log level ?', 'log')
    .option('-n, --names <lint names>', 'specify lint names', list)
    .option('-e, --exclude <lint names>', 'specify not lint names', list)
    .parse(process.argv);

  readAndParse = require('equ').readAndParse;

  _.each(param.args, function(path) {
    return lint(readAndParse(path), path, param);
  });

}).call(this);
