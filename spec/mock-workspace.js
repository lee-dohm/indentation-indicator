'use babel'

export default class MockWorkspace {
  constructor (editor) {
    this.editor = editor
  }

  getActiveTextEditor () {
    return this.editor
  }
}
