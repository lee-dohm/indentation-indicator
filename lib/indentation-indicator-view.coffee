# Public: Displays the indentation status in the bar.
class IndentationIndicatorView extends HTMLElement
  # Public: Initializes the indicator.
  initialize: (@statusBar) ->
    @classList.add('indentation-indicator', 'inline-block')

    @activeItemSubscription = atom.workspace.onDidChangeActivePaneItem =>
      @update()

    @update()

  # Public: Destroys the indicator.
  destroy: ->
    @activeItemSubscription.dispose()


  # Public: Updates the indicator.
  update: ->
    editor = atom.workspace.getActiveTextEditor()

    if editor
      @textContent = @formatText(editor.getSoftTabs(), editor.getTabLength())
    else
      @textContent = ''

  # Private: Formats the text of the indicator.
  #
  # * `softTabs` A {Boolean} indicating whether soft tabs are enabled.
  # * `length` A {Number} giving the size of a tab in spaces.
  #
  # Returns a {String} with the text to display.
  formatText: (softTabs, length) ->
    type = if softTabs then 'Spaces' else 'Tabs'
    space = if atom.config.get('indentation-indicator.spaceAfterColon') then ' ' else ''
    "#{type}:#{space}#{length}"

module.exports = document.registerElement('status-bar-indentation',
                                          prototype: IndentationIndicatorView.prototype,
                                          extends: 'div')
