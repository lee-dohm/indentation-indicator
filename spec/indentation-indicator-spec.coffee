IndentationIndicator = require '../lib/indentation-indicator'

describe 'IndentationIndicator', ->
  [indicator, workspaceElement, statusBar] = []

  beforeEach ->
    workspaceElement = atom.views.getView(atom.workspace)
    jasmine.attachToDOM(workspaceElement)

    waitsForPromise -> atom.packages.activatePackage('status-bar')
    waitsForPromise -> atom.packages.activatePackage('indentation-indicator')
    waitsForPromise -> atom.packages.activatePackage('language-gfm')

    runs ->
      atom.config.set('editor', softTabs: false, tabLength: 3)
      atom.packages.emitter.emit('did-activate-all')

      indicator = IndentationIndicator.view

  describe '::initialize', ->
    it 'displays in the status bar', ->
      expect(indicator).toBeDefined()
      expect(indicator.classList.contains('indentation-indicator')).toBeTruthy()

    describe 'when there is no file open', ->
      it 'has no text', ->
        expect(indicator.textContent).toEqual ''

  describe '::deactivate', ->
    it 'removes the indicator view', ->
      expect(indicator).toExist()

      atom.packages.deactivatePackage('indentation-indicator')

      expect(IndentationIndicator.view).toBeNull()

    it 'can be executed twice', ->
      atom.packages.deactivatePackage('indentation-indicator')
      atom.packages.deactivatePackage('indentation-indicator')

    it 'disposes of subscriptions', ->
      spyOn(IndentationIndicator.editorObserver, 'dispose')
      atom.packages.deactivatePackage('indentation-indicator')

      expect(IndentationIndicator.editorObserver.dispose).toHaveBeenCalled()

  describe 'when a file is open', ->
    it 'reflects the editor settings', ->
      waitsForPromise ->
        atom.workspace.open('sample.js')

      runs ->
        expect(indicator.textContent).toBe 'Tabs:3'

    it 'represents softTabs true as "Spaces"', ->
      atom.config.set('editor', softTabs: true, tabLength: 6)

      waitsForPromise ->
        atom.workspace.open('sample.js')

      runs ->
        expect(indicator.textContent).toBe 'Spaces:6'

    it 'uses the defaults if no editor settings are available', ->
      atom.config.set('editor', {})

      waitsForPromise ->
        atom.workspace.open('sample.js')

      runs ->
        expect(indicator.textContent).toBe 'Spaces:2'

    describe 'and the grammar changes', ->
      it 'updates the indicator', ->
        editor = null
        atom.config.set 'editor.softTabs', true, scopeSelector: '.source.gfm'
        atom.config.set 'editor.tabLength', 4, scopeSelector: '.source.gfm'

        waitsForPromise ->
          atom.workspace.open('sample.txt').then (e) ->
            editor = e

        runs ->
          grammar = atom.grammars.grammarForScopeName('source.gfm')
          editor.setGrammar(grammar)

          # See: atom/atom#4344
          # Soft tab settings are not updated when a new grammar is set
          # expect(indicator.textContent).toEqual 'Spaces:4'
          expect(indicator.textContent).toEqual 'Tabs:4'

  describe 'when spaceAfterColon is true', ->
    it 'has a space after the colon in the indicator', ->
      atom.config.set('editor', softTabs: true, tabLength: 6)
      atom.config.set('indentation-indicator', spaceAfterColon: true)

      waitsForPromise ->
        atom.workspace.open('sample.js')

      runs ->
        expect(indicator.textContent).toBe 'Spaces: 6'
