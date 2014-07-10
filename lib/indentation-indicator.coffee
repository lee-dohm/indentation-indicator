IndentationIndicatorView = require './indentation-indicator-view'

module.exports =
  indentationIndicatorView: null

  activate: (state) ->
    @indentationIndicatorView = new IndentationIndicatorView(state.indentationIndicatorViewState)

  deactivate: ->
    @indentationIndicatorView.destroy()

  serialize: ->
    indentationIndicatorViewState: @indentationIndicatorView.serialize()
