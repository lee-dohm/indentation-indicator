'use babel'

import IndentationStatus from '../lib/indentation-status'

import MockConfig from './mock-config'
import MockEditor from './mock-editor'
import MockStatusBar from './mock-status-bar'
import MockWorkspace from './mock-workspace'

describe('IndentationStatus', function () {
  let config, editor, status, statusBar, workspace

  beforeEach(function () {
    let configMap = {
      'indentation-indicator.spaceAfterColon': false,
      'indentation-indicator.indicatorPosition': 'left'
    }

    config = new MockConfig(configMap)
    editor = new MockEditor()
    statusBar = new MockStatusBar()
    workspace = new MockWorkspace(editor)

    status = new IndentationStatus(statusBar, null, config, workspace)
  })

  describe('when there is no active editor', function () {
    beforeEach(function () {
      workspace = new MockWorkspace()

      status = new IndentationStatus(statusBar, null, config, workspace)
    })

    it('returns nothing', function () {
      expect(status.getText()).to.eq('')
    })
  })

  describe('when soft tabs is false', function () {
    beforeEach(function () {
      status = new IndentationStatus(statusBar, null, config, workspace)
    })

    it('returns "Tabs:3"', function () {
      expect(status.getText()).to.eq('Tabs:3')
    })
  })

  describe('when soft tabs is true', function () {
    beforeEach(function () {
      editor = new MockEditor(true)
      workspace = new MockWorkspace(editor)

      status = new IndentationStatus(statusBar, null, config, workspace)
    })

    it('returns "Spaces:3"', function () {
      expect(status.getText()).to.eq('Spaces:3')
    })
  })

  describe('when space after colon is true', function () {
    beforeEach(function () {
      let configMap = {
        'indentation-indicator.spaceAfterColon': true,
        'indentation-indicator.indicatorPosition': 'left'
      }

      config = new MockConfig(configMap)

      status = new IndentationStatus(statusBar, null, config, workspace)
    })

    it('returns "Tabs: 3"', function () {
      expect(status.getText()).to.eq('Tabs: 3')
    })
  })

  describe('when indicatorPosition is right', function () {
    beforeEach(function () {
      configMap = {
        'indentation-indicator.spaceAfterColon': false,
        'indentation-indicator.indicatorPosition': 'right'
      }

      config = new MockConfig(configMap)
      statusBar = new MockStatusBar()

      status = new IndentationStatus(statusBar, null, config, workspace)
    })

    it('displays on the right', function () {
      expect(statusBar.position).to.eq('right')
    })
  })
})
