import { cursorEvent, cursorInitialize } from "../event/cursorEvent.js";
import { panEvent, panInitialize } from "../event/panEvent.js";
import { rotateEvent, rotateInitialize } from "../event/rotateEvent.js";
import { zoomEvent } from "../event/zoomEvent.js";
import { appearCursor, hideCursor, toggleCursor } from "./initInterface.js";


export default function eventHandler(e){

    const parsedData = JSON.parse(e.data.replace("\r", ""));

    if (parsedData.ring && parsedData.middle && parsedData.index && parsedData.thumb){
        hideCursor();
        cursorInitialize();
    }
    else if (parsedData.ring && parsedData.middle && parsedData.index && !parsedData.thumb) {
        hideCursor();
        zoomEvent(parsedData.gyrY);
    }
    else if (parsedData.ring && !parsedData.middle && !parsedData.index && parsedData.thumb) {
        hideCursor();
        panEvent(parsedData.gyrX, parsedData.gyrZ);
    }
    else if (parsedData.ring && parsedData.middle && !parsedData.index && parsedData.thumb) {
        appearCursor();
        cursorEvent(parsedData.gyrX, parsedData.gyrZ);
    }
    else if (!parsedData.ring && !parsedData.middle && !parsedData.index && parsedData.thumb) {
        hideCursor();
        rotateEvent(parsedData.gyrX, parsedData.gyrZ);
    }
    else{
    }


}