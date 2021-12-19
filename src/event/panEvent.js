

// export function panInitialize() {
//     document.querySelector("canvas").dispatchEvent(
//         new PointerEvent("pointermove", {
            
//             bubbles: true,
//             composed: true,
//             isTrusted: true,
//             isPrimary: true,
//             screenX: 500,
//             pageX: 500,
//             clientX: 500,
//             x: 500,
//             offsetX: 500 - 12,
//             layerX: 500 - 12,

//             screenY: 500 + 110,
//             pageY: 500,
//             clientY: 500,
//             y: 500,
//             layerY: 500 - 56,
//             movementX: 0,
//             movementY: 0,

//         })
//     )
// }

// export function panEvent(deltaX, deltaY) {
//     deltaX *= correctionContant;
//     deltaY *= correctionContant;
//     document.querySelector("canvas").dispatchEvent(new PointerEvent("pointerdown", {
//         button: 2,
//         buttons: 2,
//     }))
//     panInitialize();
//     document.querySelector("canvas").dispatchEvent(
//         new PointerEvent("pointermove", {
//             button : -1,
//             buttons : 2,
//             bubbles: true,
//             composed: true,
//             isTrusted: true,
//             isPrimary: true,
//             screenX: 500 + deltaX,
//             pageX: 500 + deltaX,
//             clientX: 500 + deltaX,
//             x: 500 + deltaX,
//             offsetX: 500 - 12 + deltaX,
//             layerX: 500 - 12 + deltaX,

//             screenY: 500 + 110 + deltaY,
//             pageY: 500 + deltaY,
//             clientY: 500 + deltaY,
//             y: 500 + deltaY,
//             layerY: 500 - 56 + deltaY,

//             movementX: 0 + deltaX,
//             movementY: 0 + deltaY,

//         })
//     )
//     document.querySelector("canvas").dispatchEvent(new PointerEvent("pointerup", {
//         button: 2,
//     }))
// }

const cursorPosition = {
    x: 500,
    y: 500,
}


const correctionContant = 0.8;

export function cursorInitialize() {
    cursorPosition.x = 500,
    cursorPosition.y = 500
}

export function panEvent(deltaX, deltaY) {
    cursorInitialize();
    document.querySelector("canvas").dispatchEvent(new PointerEvent("pointerdown", {
        button: 2,
        buttons: 2,
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

        screenY: cursorPosition.y + 110,
        pageY: cursorPosition.y,
        clientY: cursorPosition.y,
        y: cursorPosition.y,
        layerY: cursorPosition.y - 56,
        movementX: 0,
        movementY: 0,
    }))
    cursorPosition.x -= deltaX * correctionContant;
    cursorPosition.y -= deltaY * correctionContant;
    
    document.querySelector("canvas").dispatchEvent(new PointerEvent("pointermove", {
        button: -1,
        buttons: 2,
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

        screenY: cursorPosition.y + 110,
        pageY: cursorPosition.y,
        clientY: cursorPosition.y,
        y: cursorPosition.y,
        layerY: cursorPosition.y - 56,
        movementX: 0 + deltaX,
        movementY: 0 + deltaY,

    }));
    document.querySelector("canvas").dispatchEvent(new PointerEvent("pointerup", {
        button: 2,
        buttons: 0,
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

        screenY: cursorPosition.y + 110,
        pageY: cursorPosition.y,
        clientY: cursorPosition.y,
        y: cursorPosition.y,
        layerY: cursorPosition.y - 56,
        movementX: 0,
        movementY: 0,
    }))
}