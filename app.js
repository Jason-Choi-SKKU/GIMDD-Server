import ReadLineParser from '@serialport/parser-readline';
import SerialPort from 'serialport';
import { WebSocketServer } from 'ws';
import Express from 'express';
import http from 'http';
import KalmanFilter from 'kalmanjs';



const port = new SerialPort('/dev/cu.usbmodem21301', { baudRate: 9600 }); // choi jason ver
// const port = new SerialPort('COM4', { baudRate: 9600 }); // hur minseok ver
const parser = port.pipe(new ReadLineParser({ delimiter: '\n' }));


const wport = 30001;
const app = Express();
const server = http.createServer(app).listen(wport, () => { console.log("SERVER LISTENING AT ", wport) });
const webSocketServer = new WebSocketServer({ server : server });
const mapper = ["ACCX", "ACCY", "ACCZ", "GYRX", "GYRY", "GYRZ"];

app.use("/", (req, res) => {
  res.send('Hello World!');
});

webSocketServer.on('connection', (ws, req) => {
  
});

parser.on('data', data => {
  const dataSplit = data.replace("\r", "").split("\t").map((x) => Number(x));
  const message = {
    accX: Number(kfAccSensor.accX.filter(dataSplit[0]).toFixed(1)),
    accY: Number(kfAccSensor.accY.filter(dataSplit[1]).toFixed(1)),
    accZ: Number(kfAccSensor.accZ.filter(dataSplit[2]).toFixed(1)),
    gyrX: Math.round(krGyroSensor.gyrX.filter(dataSplit[3])),
    gyrY: Math.round(krGyroSensor.gyrY.filter(dataSplit[4])),
    gyrZ: Math.round(krGyroSensor.gyrZ.filter(dataSplit[5])),
    bend1: isBended(kfBendSensor.bend1.filter(dataSplit[6])),
    bend2: isBended(kfBendSensor.bend2.filter(dataSplit[7])),
    bend3: isBended(kfBendSensor.bend3.filter(dataSplit[8])),
    bend4: isBended(kfBendSensor.bend4.filter(dataSplit[9])),

  }
  console.log(message);
  // ws.send(JSON.stringify(message));
});

function isBended(value) {
  return value > 850 ? 1 : 0;
}

const kfBendSensor = {
  bend1 : new KalmanFilter(),
  bend2: new KalmanFilter(),
  bend3: new KalmanFilter(),
  bend4: new KalmanFilter(),
}

const kfAccSensor = {
  accX: new KalmanFilter(),
  accY: new KalmanFilter(),
  accZ: new KalmanFilter(),
}

const krGyroSensor = {
  gyrX: new KalmanFilter(),
  gyrY: new KalmanFilter(),
  gyrZ: new KalmanFilter(),
}

