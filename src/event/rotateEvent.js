
const correctionContant = -0.2;

export function rotateInitialize() {
    document.querySelector("canvas").dispatchEvent(
        new PointerEvent("pointermove", {
            bubbles: true,
            composed: true,
            isTrusted: true,
            isPrimary: true,
            screenX: 500,
            pageX: 500,
            clientX: 500,
            x: 500,
            offsetX: 500 - 12,
            layerX: 500 - 12,

            screenY: 500 + 110,
            pageY: 500,
            clientY: 500,
            y: 500,
            layerY: 500 - 56,
            movementX: 0,
            movementY: 0,

        })
    )
}

export function rotateEvent(deltaX, deltaY){
    deltaX *= correctionContant;
    deltaY *= correctionContant;
    document.querySelector("canvas").dispatchEvent(new PointerEvent("pointerdown"))
    rotateInitialize();
    document.querySelector("canvas").dispatchEvent(
        new PointerEvent("pointermove", {
            bubbles: true,
            composed: true,
            isTrusted: true,
            isPrimary: true,
            screenX: 500 + deltaX,
            pageX: 500 + deltaX,
            clientX: 500 + deltaX,
            x: 500 + deltaX,
            offsetX: 500 - 12 + deltaX,
            layerX: 500 - 12 + deltaX,

            screenY: 500 + 110 + deltaY,
            pageY: 500 + deltaY,
            clientY: 500 + deltaY,
            y: 500 + deltaY,
            layerY: 500 - 56 + deltaY,

            movementX: 0 + deltaX,
            movementY: 0 + deltaY,

        })
    )
    document.querySelector("canvas").dispatchEvent(new PointerEvent("pointerup"))
}