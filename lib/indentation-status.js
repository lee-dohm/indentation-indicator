'use babel'

import {CompositeDisposable} from 'atom'

import IndentationStatusView from './indentation-status-view'

export default class IndentationStatus {
  constructor (statusBar, atomEnv = global.atom, config = atomEnv.config, workspace = atomEnv.workspace) {
    this.atomEnv = atomEnv
    this.config = config
    this.workspace = workspace
    this.statusBar = statusBar

    this.observeEvents()
    this.displayTile()
  }

  destroy () {
    this.subscriptions.dispose()
    this.destroyTile()
  }

  getText () {
    const editor = this.workspace.getActiveTextEditor()

    if (!editor) {
      return ''
    }

    const softTabs = editor.getSoftTabs()
    const length = editor.getTabLength()
    const separator = this.config.get('indentation-indicator.spaceAfterColon') ? ': ' : ':'

    return `${this.softTabsSettingToText(softTabs)}${separator}${length}`
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

    this.subscriptions.add(this.workspace.onDidChangeActivePaneItem(() => {
      if (this.view) {
        this.updateView()
      }
    }))

    this.subscriptions.add(this.workspace.observeTextEditors((editor) => {
      let disposable = editor.onDidChangeGrammar(() => {
        if (this.view) {
          this.updateView()
        }
      })

      editor.onDidDestroy(() => {
        disposable.dispose()
      })
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

    let editor = this.workspace.getActiveTextEditor()

    if (editor) {
      const tooltipText = `Active editor is using ${editor.getTabLength()} ${this.softTabsSettingToText(editor.getSoftTabs())}\nfor indentation`

      this.tooltipDisposable = this.atomEnv.tooltips.add(this.view.element,
                                                         {title: tooltipText, trigger: 'hover'})
    }
  }

  async updateView () {
    await this.view.update()

    this.updateTooltip()
  }
}
