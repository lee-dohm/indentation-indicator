{CompositeDisposable} = require 'atom'

IndentationIndicatorView = require './indentation-indicator-view'

# Handles the activation and deactivation of the package.
class IndentationIndicator
  # Private: Default configuration.
  config:
    spaceAfterColon:
      type: 'boolean'
      default: false

  # Private: Indicator view.
  view: null

  # Public: Activates the package.
  activate: ->
    @observeEvents()

  # Public: Deactivates the package.
  deactivate: ->
    @editorObserver?.dispose()
    @view?.destroy()
    @view = null
    @tile?.destroy()
    @tile = null

  # Private: Creates the set of event observers.
  observeEvents: ->
    @editorObserver = atom.workspace.observeTextEditors (editor) =>
      disposable = editor.onDidChangeGrammar =>
        @view?.update()

      editor.onDidDestroy -> disposable.dispose()

    atom.packages.onDidActivateInitialPackages =>
      statusBar = document.querySelector('status-bar')
      if statusBar?
        @view = new IndentationIndicatorView
        @view.initialize(statusBar)
        @tile = statusBar.addLeftTile(item: @view, priority: 100)

module.exports = new IndentationIndicator
