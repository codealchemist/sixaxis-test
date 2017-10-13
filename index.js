const ds = require('dualshock')
const player = require('./audio-player')

const waitMs = 5000

function onDevicesFound (callback) {
  const devices = ds.getDevices('ds3')
  if (!devices.length) {
    // Keep looking for devices.
    setTimeout(() => {
      onDevicesFound(callback)
    }, waitMs)
    return
  }

  console.log('DEVICES:', devices)
  callback(devices)
}

console.log('Looking for devices...')
onDevicesFound((devices) => {
  setEvents(devices)
})

function setEvents (devices) {
  const device = devices[0] // Support just one device at a time right now.
  const gamepad = ds.open(device, {smoothAnalog:10, smoothMotion:15, joyDeadband:4, moveDeadband:4})

  gamepad.ondigital = (button, value) => {
    // console.log(`BUTTON ${button} = ${value}`)
    if (value) player(button)
  }

  gamepad.onanalog = (axis, value) => {
    // console.log(`AXIS ${axis} = ${value}`)
  }
}
