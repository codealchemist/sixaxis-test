const WebSocket = require('ws')
const ws = new WebSocket('wss://instabuddy.herokuapp.com')

class InstabuddyConnector {
  onReady (callback) {
    if (typeof callback !== 'function') return
    ws.on('open', callback)
  }

  play ({channel, id, src}) {
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
