{WorkspaceView} = require 'atom'

describe 'IndentationIndicator', ->
  [indicator] = []

  beforeEach ->
    atom.workspaceView = new WorkspaceView
    atom.workspace = atom.workspaceView.model

    waitsForPromise -> atom.packages.activatePackage('status-bar')
    waitsForPromise -> atom.packages.activatePackage('indentation-indicator')

    runs ->
      atom.config.set('editor', {softTabs: false, tabLength: 3})
      atom.packages.emit('activated')
      atom.workspaceView.simulateDomAttachment()
      indicator = atom.workspaceView.find('.indentation-indicator')

  describe '.initialize', ->
    it 'displays in the status bar', ->
      expect(indicator.length).toBe 1

    it 'has placeholder text if there is no file open', ->
      expect(indicator.text()).toBe 'foo:42'

    it 'is hidden if there is no file open', ->
      expect(indicator).toBeHidden()

    it 'reflects the editor settings if there is a file open', ->
      waitsForPromise ->
        atom.workspace.open('sample.js')

      runs ->
        expect(indicator.text()).toBe 'Tabs:3'

    it 'represents softTabs true as "Spaces"', ->
      atom.config.set('editor', {softTabs: true, tabLength: 6})

      waitsForPromise ->
        atom.workspace.open('sample.js')

      runs ->
        expect(indicator.text()).toBe 'Spaces:6'

    it 'uses the defaults if no editor settings are available', ->
      atom.config.set('editor', {})

      waitsForPromise ->
        atom.workspace.open('sample.js')

      runs ->
        expect(indicator.text()).toBe 'Spaces:2'

    describe 'when spaceAfterColon is true', ->
      it 'has a space after the colon in the indicator', ->
        atom.config.set('editor', {softTabs: true, tabLength: 6})
        atom.config.set('indentation-indicator', {spaceAfterColon: true})

        waitsForPromise ->
          atom.workspace.open('sample.js')

        runs ->
          expect(indicator.text()).toBe 'Spaces: 6'

  describe '.deactivate', ->
    it 'removes the indicator view', ->
      expect(indicator).toExist()

      atom.packages.deactivatePackage('indentation-indicator')

      indicator = atom.workspaceView.find('.indentation-indicator')
      expect(indicator).not.toExist()

    it 'can be executed twice', ->
      atom.packages.deactivatePackage('indentation-indicator')
      atom.packages.deactivatePackage('indentation-indicator')
