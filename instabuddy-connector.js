const WebSocket = require('ws')
const ws = new WebSocket('wss://instabuddy.herokuapp.com')

class InstabuddyConnector {
  constructor () {
    this.ready = false
    this.onReadyCallback = null

    ws.on('open', () => {
      this.ready = true
      if (this.onReadyCallback) {
        this.onReadyCallback()
      }
    })
  }

  onReady (callback) {
    if (typeof callback !== 'function') return
    this.onReadyCallback = callback
    if (this.ready) {
      callback()
    }
  }

  play ({channel, id, src}) {
    if (!this.ready) {
      console.log('Delayed playback, waiting for WS to connect...')
      setTimeout(() => {
        this.play({channel, id, src})
      }, 250)
      return
    }

    const message = {
      type: 'play',
      data: { channel, id, src }
    }
    const data = JSON.stringify(message)
    ws.send(data)
  }

}

const instabuddyConnector = new InstabuddyConnector()
module.exports = instabuddyConnector
