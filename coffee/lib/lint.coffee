fs = require 'fs'
_ = require 'underscore'

{Printer} = require './printer'

LINT_DIRECTORY_PATH = "#{__dirname}/../lint/"

LEVEL =
  log:   0
  info:  1
  warn:  2
  error: 3

lint = ($equ, path, option) ->
  printer = new Printer color: if option.color is 'true' then true else false
  minLevel = LEVEL[option.level]

  printer.log "lint #{path}" if minLevel <= LEVEL.log

  lintFiles = if option.names
    _.map option.names, (name) -> "#{name}.js"
  else
    _readdir LINT_DIRECTORY_PATH

  if option.exclude
    lintFiles = _.reject lintFiles, (file) ->
      _.contains _.map(option.exclude, (name) -> "#{name}.js"), file

  results = _.flatten _.map lintFiles, (lintFile) ->
    unless lintFile.match ///\.js$/// then return
    {lint} = require "../lint/#{lintFile}"
    lint $equ, path

  _.each results, (result) ->
    unless result then return

    level = if result.level then result.level else 'info'
    unless minLevel <= LEVEL[level] then return

    messages = [result.message]
    messages.unshift "#{_locToOneline result.loc}:"
    printer[level] messages.join ' '

_locToOneline = (loc) ->
  unless loc then return "L0~L0"
  start = loc.start
  end   = loc.end
  "L#{start.line}~L#{end.line}"

_readdir = (path) -> fs.readdirSync path

module.exports = lint: lint
