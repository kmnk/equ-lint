#!/usr/bin/env node
(function() {
  var lint, readAndParse, _;

  _ = require('underscore');

  param = require('commander');

  lint = require('../lib/lint').lint;

  param
    .version('0.0.2')
    .option('-c, --color [true|false]', 'color output ?', 'true')
    .option('-l, --level [log|info|warn|error]', 'log level ?', 'log')
    .parse(process.argv);

  readAndParse = require('equ').readAndParse;

  _.each(param.args, function(path) {
    return lint(readAndParse(path), path, {
        color : param.color,
        level : param.level
    });
  });

}).call(this);
