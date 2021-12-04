import ReadLineParser from '@serialport/parser-readline';
import SerialPort from 'serialport';
import { WebSocketServer } from 'ws';
import Express from 'express';
import http from 'http';
import pkg from 'kalman-filter';
const { KalmanFilter } = pkg;

//const port = new SerialPort('/dev/cu.usbmodem21301', { baudRate: 9600 }); // choi jason ver
const port = new SerialPort('COM4', { baudRate: 9600 }); // hur minseok ver
const parser = port.pipe(new ReadLineParser({ delimiter: '\n' }));


const wport = 3000;
const app = Express();
const server = http.createServer(app).listen(wport, () => { console.log("SERVER LISTENING AT ", wport) });
const webSocketServer = new WebSocketServer({ server : server });
const mapper = ["ACCX", "ACCY", "ACCZ", "GYRX", "GYRY", "GYRZ"];

app.use("/", (req, res) => {
  parser.on('data', data => {
    const dataSplit = data.replace("\r", "").split("\t").map((x) => Number(x));
    const message = {
      accX: dataSplit[0],
      accY: dataSplit[1],
      accZ: dataSplit[2],
      gyrX: dataSplit[3],
      gyrY: dataSplit[4],
      gyrZ: dataSplit[5],
      bend1 : dataSplit[6], // A0
      bend2: dataSplit[7],  // A1
      bend3: dataSplit[8],  // A2
      bend4: dataSplit[9],  // A3

    }
    if(message.bend1 > 1000) message.bend1=-1
    else{
      if(message.bend1 >= 850) message.bend1=1;
      else message.bend1=0;
    }
    if(message.bend2 > 1000) message.bend2=-1
    else{
      if(message.bend2 >= 805) message.bend2=1;
      else message.bend2=0;
    }
    if(message.bend3 > 1000) message.bend3=-1
    else{
      if(message.bend3 >= 790) message.bend3=1;
      else message.bend3=0;
    }
    if(message.bend4 > 1000) message.bend4=-1
    else{
      if(message.bend4 >= 805) message.bend4=1;
      else message.bend4=0;
    }

    // 810~840 870~900
    // 760~780 820~850
    // 760~790 790~820
    // 770~795 820~870
    console.log(message.bend1, message.bend2, message.bend3, message.bend4);
  });
  res.send('Hello World!');
});

webSocketServer.on('connection', (ws, req) => {
  parser.on('data', data => {
    const dataSplit = data.replace("\r", "").split("\t").map((x) => Number(x));
    const message = {
      accX: dataSplit[0],
      accY: dataSplit[1],
      accZ: dataSplit[2],
      gyrX: dataSplit[3],
      gyrY: dataSplit[4],
      gyrZ: dataSplit[5],
      bend1 : dataSplit[6],
      bend2: dataSplit[7],
      bend3: dataSplit[8],
      bend4: dataSplit[9],

    }
    ws.send(JSON.stringify(message));
  });
});