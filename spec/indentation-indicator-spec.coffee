{WorkspaceView} = require 'atom'

describe 'IndentationIndicator', ->
  beforeEach ->
    atom.workspaceView = new WorkspaceView
    atom.workspace = atom.workspaceView.model

    waitsForPromise -> atom.packages.activatePackage('status-bar')
    waitsForPromise -> atom.packages.activatePackage('indentation-indicator')

    runs ->
      atom.packages.emit('activated')
      atom.workspaceView.simulateDomAttachment()

  describe '.initialize', ->
    it 'displays in the status bar', ->
      expect(atom.workspaceView.find('.indentation-indicator').length).toBe 1

  describe '.deactivate', ->
    it 'removes the indicator view', ->
      view = atom.workspaceView.find('.indentation-indicator')
      expect(view).toExist()

      atom.packages.deactivatePackage('indentation-indicator')

      view = atom.workspaceView.find('.indentation-indicator')
      expect(view).not.toExist()

    it 'can be executed twice', ->
      atom.packages.deactivatePackage('indentation-indicator')
      atom.packages.deactivatePackage('indentation-indicator')
