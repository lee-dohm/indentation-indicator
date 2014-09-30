{View} = require 'atom'

# Status bar view for the indentation indicator.
module.exports =
class IndentationIndicatorView extends View
  @content: ->
    @div class: 'indentation-indicator inline-block', =>
      @span 'foo:42', outlet: 'text'

  # Public: Initializes the view by subscribing to various events.
  #
  # statusBar - {StatusBar} of the application
  initialize: (@statusBar) ->
    @subscribe @statusBar, 'active-buffer-changed', @update

  # Public: Executes after the view is attached to a parent.
  afterAttach: ->
    @update()

  # Public: Tear down any state and detach.
  destroy: ->
    @remove()

  # Internal: Creates the text for the indicator.
  #
  # softTabs - A {Boolean} indicating whether soft tabs are enabled.
  # length - The {Number} of spaces that a tab is considered equivalent to.
  #
  # Returns the {String} containing the text for the indicator.
  formatText: (softTabs, length) ->
    type = if softTabs then "Spaces" else "Tabs"
    space = if atom.config.get('indentation-indicator.spaceAfterColon') then ' ' else ''
    "#{type}:#{space}#{length}"

  # Internal: Gets the currently active `Editor`.
  #
  # Returns the {Editor} that is currently active or `null` if there is not one active.
  getActiveEditor: ->
    atom.workspace.getActiveEditor()

  # Internal: Updates the indicator based on the current state of the application.
  update: =>
    editor = @getActiveEditor()
    if editor?
      @text.text(@formatText(editor.getSoftTabs(), editor.getTabLength())).show()
    else
      @text.hide()
