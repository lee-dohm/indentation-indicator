'use babel'

export default class MockStatusBar {
  addLeftTile () {
    this.position = 'left'

    return new Object()
  }

  addRightTile () {
    this.position = 'right'

    return new Object()
  }

  getPosition () {
    return this.position
  }
}
