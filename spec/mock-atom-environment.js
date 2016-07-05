'use babel'

import {Disposable} from 'atom'

class MockTooltips {
  add () {
    return new Disposable()
  }
}

export default class MockAtomEnvironment {
  constructor () {
    this.tooltips = new MockTooltips()
  }
}
