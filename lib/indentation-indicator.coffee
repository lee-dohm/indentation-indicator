IndentationIndicatorView = require './indentation-indicator-view'

# Handles the activation and deactivation of the package.
class IndentationIndicator
  view: null

  # Activates the package.
  activate: ->
    atom.packages.once 'activated', =>
      statusBar = atom.workspaceView.statusBar
      if statusBar?
        @view = new IndentationIndicatorView(statusBar)
        statusBar.appendLeft(@view)

  # Deactivates the package.
  deactivate: ->
    @view?.destroy()

module.exports = new IndentationIndicator()
