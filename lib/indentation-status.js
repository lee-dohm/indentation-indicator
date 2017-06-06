'use babel'

import {CompositeDisposable} from 'atom'

import IndentationStatusView from './indentation-status-view'

export default class IndentationStatus {
  constructor (statusBar, atomEnv = global.atom, config = atomEnv.config, workspace = atomEnv.workspace) {
    this.atomEnv = atomEnv
    this.config = config
    this.workspace = workspace
    this.statusBar = statusBar
    this.editor = null
    this.editorDisposables = null

    this.observeEvents()
    this.displayTile()
  }

  destroy () {
    this.subscriptions.dispose()
    this.destroyTile()
  }

  getText () {
    if (this.editor) {
      const softTabs = this.editor.getSoftTabs()
      const length = this.editor.getTabLength()
      const separator = this.config.get('indentation-indicator.spaceAfterColon') ? ': ' : ':'

      return `${this.softTabsSettingToText(softTabs)}${separator}${length}`
    } else {
      return ''
    }
  }

  destroyTile () {
    if (this.tooltipDisposable) {
      this.tooltipDisposable.dispose()
      this.tooltipDisposable = null
    }

    if (this.view) {
      this.view.destroy()
      this.view = null
    }

    if (this.tile) {
      this.tile.destroy()
      this.tile = null
    }
  }

  displayTile () {
    const priority = 100
    this.view = new IndentationStatusView(this)

    if (this.config.get('indentation-indicator.indicatorPosition') === 'right') {
      this.tile = this.statusBar.addRightTile({item: this.view.element, priority: priority})
      this.updateTooltip()
    } else {
      this.tile = this.statusBar.addLeftTile({item: this.view.element, priority: priority})
      this.updateTooltip()
    }
  }

  observeEvents () {
    this.subscriptions = new CompositeDisposable()

    this.subscriptions.add(this.config.onDidChange('indentation-indicator.indicatorPosition', () => {
      this.destroyTile()
      this.displayTile()
    }))

    this.subscriptions.add(this.config.onDidChange('indentation-indicator.spaceAfterColon', () => {
      if (this.view) {
        this.updateView()
      }
    }))

    this.subscriptions.add(this.workspace.observeActiveTextEditor((editor) => {
      if (this.editorDisposables) {
        this.editorDisposables.dispose()
        this.editorDisposables = null
      }

      this.editor = editor

      if (this.view) {
        this.updateView()
      }

      if (this.editor) {
        this.editorDisposables = this.editor.onDidChangeGrammar(() => {
          if (this.view) {
            this.updateView()
          }
        })
      }
    }))
  }

  softTabsSettingToText (softTabs) {
    return softTabs ? 'Spaces' : 'Tabs'
  }

  updateTooltip () {
    if (this.tooltipDisposable) {
      this.tooltipDisposable.dispose()
      this.tooltipDisposable = null
    }

    if (this.editor) {
      const tooltipText = `Active editor is using ${this.editor.getTabLength()} ${this.softTabsSettingToText(this.editor.getSoftTabs())}\nfor indentation`

      this.tooltipDisposable = this.atomEnv.tooltips.add(this.view.element,
                                                         {title: tooltipText, trigger: 'hover'})
    }
  }

  async updateView () {
    await this.view.update()

    this.updateTooltip()
  }
}
