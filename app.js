import ReadLineParser from '@serialport/parser-readline';
import SerialPort from 'serialport';
import { WebSocketServer } from 'ws';
import Express from 'express';
import http from 'http';


const port = new SerialPort('/dev/cu.usbmodem21301', { baudRate: 9600 });
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