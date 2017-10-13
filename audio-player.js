const path = require('path')
const player = require('play-sound')(opts = {})
const audioMap = require('./audio-map')

const audioPath = path.join(__dirname, 'audio')

function play (button) {
  const audioFile = audioMap[button]
  if (!audioFile) return

  console.log(`[ ${button} ] PLAYING ${audioFile}`)
  player.play(`${audioPath}/${audioFile}`, (err) => {
    if (err) console.log('AUDIO ERR:', err)
  })
}

module.exports = play
