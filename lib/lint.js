(function() {
  var LEVEL, LINT_DIRECTORY_PATH, Printer, fs, lint, _, _locToOneline, _readdir;

  fs = require('fs');

  _ = require('underscore');

  Printer = require('./printer').Printer;

  LINT_DIRECTORY_PATH = "" + __dirname + "/../lint/";

  LEVEL = {
    log: 0,
    info: 1,
    warn: 2,
    error: 3
  };

  lint = function($equ, path, option) {
    var lintPaths, minLevel, printer, results;
    printer = new Printer({
      color: option.color === 'true' ? true : false
    });
    minLevel = LEVEL[option.level];
    if (minLevel <= LEVEL.log) {
      printer.log("review " + path);
    }
    lintPaths = _readdir(LINT_DIRECTORY_PATH);
    results = _.flatten(_.map(lintPaths, function(lintPath) {
      if (!lintPath.match(/\.js$/)) {
        return;
      }
      lint = require("../lint/" + lintPath).lint;
      return lint($equ, path);
    }));
    return _.each(results, function(result) {
      var level, messages;
      if (!result) {
        return;
      }
      level = result.level ? result.level : 'info';
      if (!(minLevel <= LEVEL[level])) {
        return;
      }
      messages = [result.message];
      messages.unshift("" + (_locToOneline(result.loc)) + ":");
      return printer[level](messages.join(' '));
    });
  };

  _locToOneline = function(loc) {
    var end, start;
    if (!loc) {
      return "L0~L0";
    }
    start = loc.start;
    end = loc.end;
    return "L" + start.line + "~L" + end.line;
  };

  _readdir = function(path) {
    return fs.readdirSync(path);
  };

  module.exports = {
    lint: lint
  };

}).call(this);
