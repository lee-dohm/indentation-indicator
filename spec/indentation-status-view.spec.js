'use babel'

import etch from 'etch'

import IndentationStatusView from '../lib/indentation-status-view'
import SynchronousScheduler from './etch-synchronous-scheduler'

class MockModel {
  constructor (text) {
    this.text = text
  }

  getText () {
    return this.text
  }
}

describe('IndentationStatusView', function () {
  let model, previousScheduler, view

  beforeEach(function () {
    previousScheduler = etch.getScheduler()
    etch.setScheduler(new SynchronousScheduler())
  })

  afterEach(function () {
    etch.setScheduler(previousScheduler)
  })

  it('displays the text given by the model', function () {
    const model = new MockModel('foo')
    const view = new IndentationStatusView(model)

    view.update()

    expect(view.element.textContent).to.eq('foo')
  })
})
