{CompositeDisposable} = require 'event-kit'

IndentationIndicatorView = require './indentation-indicator-view'

# Handles the activation and deactivation of the package.
class IndentationIndicator
  # Private: Default configuration.
  configDefaults:
    spaceAfterColon: false

  # Private: Event subscriptions that should be disposed of on deactivation.
  subscriptions: new CompositeDisposable

  # Private: Indicator view.
  view: null

  # Public: Activates the package.
  activate: ->
    @observeEvents()

  # Public: Deactivates the package.
  deactivate: ->
    @subscriptions.dispose()
    @view?.destroy()
    @view = null

  # Private: Creates the set of event observers.
  observeEvents: ->
    @subscriptions.add atom.workspace.observeTextEditors (editor) =>
      @subscriptions.add editor.onDidChangeGrammar =>
        @view.update()

    atom.packages.once 'activated', =>
      statusBar = atom.workspaceView.statusBar
      if statusBar?
        @view = new IndentationIndicatorView
        statusBar.appendLeft(@view)

module.exports = new IndentationIndicator
