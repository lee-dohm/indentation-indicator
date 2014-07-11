{View} = require 'atom'

# Status bar view for the indentation indicator.
module.exports =
class IndentationIndicatorView extends View
  @content: ->
    @div class: 'inline-block', =>
      @span 'foo:42', class: 'indentation-indicator', outlet: 'text'

  # Initializes the view by subscribing to various events.
  #
  # statusBar - {StatusBar} of the application
  initialize: (@statusBar) ->
    @subscribe @statusBar, 'active-buffer-changed', @update

  formatText: (softTabs, length) ->
    type = if softTabs then "Spaces" else "Tabs"
    "#{type}:#{length}"

  # Gets the currently active `Editor`.
  #
  # Returns the {Editor} that is currently active or `null` if there is not one active.
  getActiveEditor: ->
    atom.workspace.getActiveEditor()

  # Updates the indicator based on the current state of the application.
  update: =>
    editor = @getActiveEditor()
    if editor?
      @text.text(@formatText(editor.getSoftTabs(), editor.getTabLength())).show()
    else
      @text.hide()

  # Tear down any state and detach.
  destroy: ->
    @remove()
