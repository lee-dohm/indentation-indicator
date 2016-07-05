'use babel'

import {CompositeDisposable} from 'atom'

import IndentationStatusView from './indentation-status-view'

export default class IndentationStatus {
  constructor (statusBar, atomEnv = global.atom, config = atomEnv.config, workspace = atomEnv.workspace) {
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

    return `${softTabs ? 'Spaces' : 'Tabs'}${separator}${length}`
  }

  destroyTile () {
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
    } else {
      this.tile = this.statusBar.addLeftTile({item: this.view.element, priority: priority})
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
        this.view.update()
      }
    }))

    this.subscriptions.add(this.workspace.onDidChangeActivePaneItem(() => {
      if (this.view) {
        this.view.update()
      }
    }))

    this.subscriptions.add(this.workspace.observeTextEditors((editor) => {
      let disposable = editor.onDidChangeGrammar(() => {
        if (this.view) {
          this.view.update()
        }
      })

      editor.onDidDestroy(() => {
        disposable.dispose()
      })
    }))
  }
}
