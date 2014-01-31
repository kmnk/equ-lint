(function() {
  var LINT_DIRECTORY_PATH, fs, lint, printer, _, _locToOneline, _readdir;

  fs = require('fs');

  _ = require('underscore');

  printer = require('./printer');

  LINT_DIRECTORY_PATH = "" + __dirname + "/../lint/";

  lint = function($equ, path) {
    var lintPaths, results;
    printer.log("review " + path);
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
      messages = [result.message];
      level = result.level ? result.level : 'info';
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
