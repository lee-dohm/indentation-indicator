'use babel'

export default class MockConfig {
  constructor (config) {
    this.config = config
  }

  get (key) {
    return this.config[key]
  }
}
