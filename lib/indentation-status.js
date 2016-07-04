'use babel'

import {CompositeDisposable} from 'atom'

export default class IndentationStatus {
  constructor (statusBar) {
    this.statusBar = statusBar

    this.observeEvents()
    this.displayTile()
  }

  destroy () {
    this.subscriptions.dispose()
    this.destroyTile()
  }

  getText () {
    const editor = atom.workspace.getActiveTextEditor()

    if (!editor) {
      return ''
    }

    const softTabs = editor.getSoftTabs()
    const length = editor.getTabLength()
    const separator = atom.config.get('indentation-indicator.spaceAfterColon') ? ': ' : ':'

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

    if (atom.config.get('indentation-indicator.indicatorPosition') === 'right') {
      this.tile = this.statusBar.addRightTile({item: this.view.element, priority: priority})
    } else {
      this.tile = this.statusBar.addLeftTile({item: this.view.element, priority: priority})
    }
  }

  observeEvents () {
    this.subscriptions = new CompositeDisposable()

    this.subscriptions.add(atom.config.onDidChange('indentation-indicator.indicatorPosition', () => {
      this.destroyTile()
      this.displayTile()
    }))

    this.subscriptions.add(atom.config.onDidChange('indentation-indicator.spaceAfterColon', () => {
      if (this.view) {
        this.view.update()
      }
    }))

    this.subscriptions.add(atom.workspace.onDidChangeActivePaneItem(() => {
      if (this.view) {
        this.view.update()
      }
    }))

    this.subscriptions.add(atom.workspace.observeTextEditors((editor) => {
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
