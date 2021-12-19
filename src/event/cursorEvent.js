const cursorPosition = {
    x : 1000,
    y : 500,
}



const correctionContant = 0.8;

export function cursorInitialize() {
    cursorPosition.x = 1000,
        cursorPosition.y = 500
}

export function cursorEvent(deltaX, deltaY){
    cursorPosition.x -= deltaX * correctionContant;
    cursorPosition.y -= deltaY * correctionContant;
    const e = new PointerEvent("pointermove", {
        bubbles: true,
        composed: true,
        isTrusted: true,
        isPrimary: true,
        screenX: cursorPosition.x,
        pageX: cursorPosition.x,
        clientX: cursorPosition.x,
        x: cursorPosition.x,
        offsetX: cursorPosition.x - 12,
        layerX: cursorPosition.x - 12,

        screenY: cursorPosition.y + 110 ,
        pageY: cursorPosition.y ,
        clientY: cursorPosition.y ,
        y: cursorPosition.y,
        layerY: cursorPosition.y - 56 ,
        movementX: 0 + deltaX,
        movementY: 0 + deltaY,

    });
    window.dispatchEvent(e);
}