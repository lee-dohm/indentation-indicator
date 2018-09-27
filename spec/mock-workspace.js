'use babel'

import {Disposable} from 'atom'

export default class MockWorkspace {
  constructor (editor) {
    this.editor = editor
  }

  getActiveTextEditor () {
    return this.editor
  }

  observeActiveTextEditor (func) {
    func(this.editor)

    return new Disposable()
  }

  observeTextEditors () {
    return new Disposable()
  }

  onDidChangeActivePaneItem () {
    return new Disposable()
  }
}
