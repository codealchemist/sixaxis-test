const ds = require('dualshock')
const player = require('./audio-player')

const devices = ds.getDevices('ds3')

if (!devices.length) {
  console.log('NO DEVICES CONNECTED.')
  process.exit()
}
console.log('DEVICES:', devices)

const device = devices[0]
const gamepad = ds.open(device, {smoothAnalog:10, smoothMotion:15, joyDeadband:4, moveDeadband:4})

gamepad.ondigital = (button, value) => {
  // console.log(`BUTTON ${button} = ${value}`)
  if (value) player(button)
}

gamepad.onanalog = (axis, value) => {
  // console.log(`AXIS ${axis} = ${value}`)
}

