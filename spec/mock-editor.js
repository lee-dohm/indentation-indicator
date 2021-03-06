'use babel'

import {Disposable} from 'atom'

export default class MockEditor {
  constructor (softTabs = false, tabLength = 3) {
    this.softTabs = softTabs
    this.tabLength = tabLength
  }

  getSoftTabs () {
    return this.softTabs
  }

  getTabLength () {
    return this.tabLength
  }

  onDidChangeGrammar () {
    return new Disposable()
  }
}
