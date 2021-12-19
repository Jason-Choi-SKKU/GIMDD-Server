# GIMD2: Gesture Interaction for Multi-Dimensional Data

GIMD2 is 3-dimensional visualization client and its interaction device implemented in arduino nano 33 ble sense.


## Development
Install node.js and npm from https://nodejs.org/en/download/

Clone this repository:
```bash
git clone https://github.com/Jason-Choi-SKKU/GIMD2.git
cd GIMD2
```

Instal the dependencies:
```bash
npm install
npm install -g nodemon
```

Flash arduino code to Arduino Nano 33 BLE Sense

Fix Port Number 
```
// app.js, 10th row
const port = new SerialPort('CHANGE HERE', { baudRate: 9600 });
```

Build with webpack and run with nodemon:
```bash
npm start
```