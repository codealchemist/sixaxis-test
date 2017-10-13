const path = require('path')
const ds = require('dualshock')
const player = require('play-sound')(opts = {})

const devices = ds.getDevices('ds3')
const audioPath = path.join(__dirname, 'audio')

if (!devices.length) {
	console.log('NO DEVICES CONNECTED.')
	process.exit()
}
console.log('DEVICES:', devices)

const device = devices[0]
const gamepad = ds.open(device, {smoothAnalog:10, smoothMotion:15, joyDeadband:4, moveDeadband:4})

gamepad.ondigital = (button, value) => {
	console.log(`BUTTON ${button} = ${value}`)
	player.play(`${audioPath}/nivel.webm`, (err) => {
		console.log('AUDIO ERR:', err)
	})
}

gamepad.onanalog = (axis, value) => {
	console.log(`AXIS ${axis} = ${value}`)
}

