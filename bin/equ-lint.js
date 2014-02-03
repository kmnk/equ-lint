#!/usr/bin/env node
(function() {
  var lint, readAndParse, _;

  _ = require('underscore');

  param = require('commander');

  lint = require('../lib/lint').lint;

  param
    .version('0.0.1')
    .option('-c, --color [true/false]', 'color output?', 'true')
    .parse(process.argv);

  readAndParse = require('equ').readAndParse;

  _.each(param.args, function(path) {
    return lint(readAndParse(path), path, {
        color : param.color
    });
  });

}).call(this);
