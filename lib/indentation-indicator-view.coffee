{View} = require 'atom'

module.exports =
class IndentationIndicatorView extends View
  @content: ->
    @div class: 'indentation-indicator overlay from-top', =>
      @div "The IndentationIndicator package is Alive! It's ALIVE!", class: "message"

  initialize: (serializeState) ->
    atom.workspaceView.command "indentation-indicator:toggle", => @toggle()

  # Returns an object that can be retrieved when package is activated
  serialize: ->

  # Tear down any state and detach
  destroy: ->
    @detach()

  toggle: ->
    console.log "IndentationIndicatorView was toggled!"
    if @hasParent()
      @detach()
    else
      atom.workspaceView.append(this)
