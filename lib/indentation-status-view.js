'use babel'
/** @jsx etch.dom */

import etch from 'etch'

export default class IndentationStatusView {
  constructor (model) {
    this.model = model

    etch.initialize(this)
  }

  render () {
    return (
      <div className="indentation-status-view inline-block">
        {this.model.getText()}
      </div>
    )
  }

  update () {
    return etch.update(this)
  }

  destroy () {
    return etch.destroy(this)
  }
}
