'use babel'

let model = null

export function consumeStatusBar (statusBar) {
  const IndentationStatus = require('./indentation-status')
  model = new IndentationStatus(statusBar)
}

export function deactivate () {
  if (model) {
    model.destroy()
    model = null
  }
}
