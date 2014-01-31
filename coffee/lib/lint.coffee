fs = require 'fs'
_ = require 'underscore'

printer = require './printer'

LINT_DIRECTORY_PATH = "#{__dirname}/../lint/"

lint = ($equ, path) ->
  printer.log "review #{path}"

  lintPaths = _readdir LINT_DIRECTORY_PATH

  results = _.flatten _.map lintPaths, (lintPath) ->
    unless lintPath.match ///\.js$/// then return
    {lint} = require "../lint/#{lintPath}"
    lint $equ, path

  _.each results, (result) ->
    unless result then return
    messages = [result.message]
    level = if result.level then result.level else 'info'
    messages.unshift "#{_locToOneline result.loc}:"
    printer[level] messages.join ' '

_locToOneline = (loc) ->
  unless loc then return "L0~L0"
  start = loc.start
  end   = loc.end
  "L#{start.line}~L#{end.line}"

_readdir = (path) -> fs.readdirSync path

module.exports = lint: lint
