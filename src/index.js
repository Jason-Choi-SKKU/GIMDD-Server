
import  "./style.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import * as data from './data.js'

import loadViewer from './controller/loadViewer.js';
import initInterface, { hideCursor } from './controller/initInterface.js';
import eventHandler from "./controller/eventHandler.js";


initInterface();
loadViewer(data.miserables);
hideCursor();


const ws = new WebSocket("ws://localhost:30001");

ws.onmessage = (event) => eventHandler(event);