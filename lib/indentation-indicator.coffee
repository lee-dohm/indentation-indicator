{CompositeDisposable} = require 'atom'

IndentationIndicatorView = require './indentation-indicator-view'

# Handles the activation and deactivation of the package.
class IndentationIndicator
  # Private: Default configuration.
  config:
    spaceAfterColon:
      type: 'boolean'
      default: false
    indicatorPosition:
      type: 'string'
      default: 'left'
      enum: ['left', 'right']

  # Private: Indicator view.
  view: null

  # Public: Activates the package.
  activate: ->
    @observeEvents()

  # Private: Consumes the status-bar service.
  #
  # * `statusBar` Status bar service.
  consumeStatusBar: (@statusBar) ->
    @updateTile()

  # Public: Deactivates the package.
  deactivate: ->
    @subscriptions?.dispose()
    @destroyTile()

  # Private: Destroys the status bar indicator view and its tile.
  destroyTile: ->
    @view?.destroy()
    @view = null
    @tile?.destroy()
    @tile = null

  # Private: Creates the set of event observers.
  observeEvents: ->
    @subscriptions = new CompositeDisposable
    @subscriptions.add atom.workspace.observeTextEditors (editor) =>
      disposable = editor.onDidChangeGrammar =>
        @view?.update()

      editor.onDidDestroy -> disposable.dispose()

    @subscriptions.add atom.config.onDidChange 'indentation-indicator.indicatorPosition', =>
      @destroyTile()
      @updateTile()

  # Private: Updates the status bar indicator view and its tile.
  updateTile: ->
    priority = 100

    @view = new IndentationIndicatorView
    @view.initialize(@statusBar)

    if atom.config.get('indentation-indicator.indicatorPosition') is 'right'
      @tile = @statusBar.addRightTile(item: @view, priority: priority)
    else
      @tile = @statusBar.addLeftTile(item: @view, priority: priority)

module.exports = new IndentationIndicator
