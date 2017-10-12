# sixaxis-test
Test PS3 SixAxis controller from node on a RaspberryPi.

## Install notes

Install Linux dependencies:

`sudo apt-get install libudev-dev libusb-1.0-0 libusb-1.0-0-dev build-essential git`

Install `node-hid` with:

`npm install node-hid --driver=hidraw`

Install patched bluez:

```
git clone https://github.com/luetzel/bluez
cd bluez
./configure --prefix=/usr --mandir=/usr/share/man --sysconfdir=/etc --localstatedir=/var --enable-sixaxis 
make -j3
sudo make install
sudo systemctl daemon-reload
sudo systemctl start bluetooth
```

Install SixAxis pairing tool and its Linux dependencies:

```
sudo apt-get install pyqt4-dev-tools qt4-designer libjack-dev
wget http://downloads.sourceforge.net/project/qtsixa/QtSixA%201.5.1/QtSixA-1.5.1-src.tar.gz
tar xvfz QtSixA-1.5.1-src.tar.gz
cd QtSixA-1.5.1
wget https://launchpadlibrarian.net/112709848/compilation_sid.patch
patch -p1 < compilation_sid.patch
make
cd utils/bins
chmod 755 sixpair
sudo cp sixpair /usr/local/bin/
```

## Pair PS3 Joystick

Connect the joystick using the USB cable and run:

`sudo sixpair`

Disconnect the joystick.
It should stop blinking its leds and just one should be on.

## Run tests

`npm start`

It should connect to your joystick and display events on console.

