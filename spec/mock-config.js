'use babel'

import {Disposable} from 'atom'

export default class MockConfig {
  constructor (config) {
    this.config = config
  }

  get (key) {
    return this.config[key]
  }

  onDidChange () {
    return new Disposable()
  }
}
