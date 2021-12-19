import ReadLineParser from '@serialport/parser-readline';
import SerialPort from 'serialport';
import { WebSocketServer } from 'ws';
import Express from 'express';
import http from 'http';
import KalmanFilter from 'kalmanjs';



const port = new SerialPort('/dev/cu.usbmodem1101', { baudRate: 9600 }); // choi jason ver
// const port = new SerialPort('COM4', { baudRate: 9600 }); // hur minseok ver
const parser = port.pipe(new ReadLineParser({ delimiter: '\n' }));


const wport = 30001;
const app = Express();
const server = http.createServer(app).listen(wport, () => { console.log("SERVER LISTENING AT ", wport) });
const webSocketServer = new WebSocketServer({ server : server });
app.use('/', Express.static('public'));

webSocketServer.on('connection', (ws, req) => {
  parser.on('data', data => {
    const dataSplit = data.replace("\r", "").split("\t").map((x) => Number(x));
    const message = {
      place : 1111111111111111111,
      gyrX: Math.round(krGyroSensor.gyrX.filter(dataSplit[3])),
      gyrY: Math.round(krGyroSensor.gyrY.filter(dataSplit[4])),
      gyrZ: Math.round(krGyroSensor.gyrZ.filter(dataSplit[5])),
      ring: isBended(kfBendSensor.ring.filter(dataSplit[6]), 850),
      middle: isBended(kfBendSensor.middle.filter(dataSplit[7]), 810),
      index: isBended(kfBendSensor.index.filter(dataSplit[8]), 860),
      thumb: isBended(kfBendSensor.bend4.filter(dataSplit[9]), 830),

    }
    // console.log(message);
    ws.send(JSON.stringify(message));
  });
});



function isBended(value, criticalValue) {
  if(criticalValue == 0) return value;
  return value > criticalValue ? 1 : 0;
}

const kfBendSensor = {
  ring : new KalmanFilter(),
  middle: new KalmanFilter(),
  index: new KalmanFilter(),
  bend4: new KalmanFilter(),
}

const krGyroSensor = {
  gyrX: new KalmanFilter(),
  gyrY: new KalmanFilter(),
  gyrZ: new KalmanFilter(),
}

