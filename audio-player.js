const path = require('path')
const player = require('play-sound')(opts = {})
const instabuddy = require('./instabuddy-connector')
const audioMap = require('./audio-map')

const audioPath = path.join(__dirname, 'audio')

function play (button) {
  const buttonData = audioMap[button]
  if (!buttonData) return

  console.log(`[ ${button} ] PLAYING ${buttonData.file}`)
  instabuddy.play(buttonData)
  player.play(`${audioPath}/${buttonData.file}`, (err) => {
    if (err) console.log('AUDIO ERR:', err)
  })
}

module.exports = play
