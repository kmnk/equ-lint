#!/usr/bin/env node
(function() {
  var getParameters, lint, readAndParse, _;

  _ = require('underscore');

  getParameters = require('../lib/parameter').getParameters;

  lint = require('../lib/lint').lint;

  readAndParse = require('equ').readAndParse;

  _.each(getParameters(), function(path) {
    return lint(readAndParse(path), path);
  });

}).call(this);
