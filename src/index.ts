import Event from 'eventemitter3'

const event = new Event()

export function useDrag(target: PIXI.Container) {
    let isMoving = false
    let startLocal: any
    target.interactive = true
    target.on('touchstart', (e: any) => {
        isMoving = true
        startLocal = target.toLocal(e.data.global)
    })
    target.on('touchmove', (e: any) => {
        if (!isMoving) return
        const position = target.parent?.toLocal(e.data.global)
        if (position) {
            target.x = position.x - startLocal.x * target.scale.x
            target.y = position.y - startLocal.y * target.scale.y
            // fix pivot offset
            fix(target)
        }
    })
    target.on('touchend', (e: any) => {
        isMoving = false
        event.emit('drop', e)
    })
}

export function useDrop(target: PIXI.Container) {
    target.interactive = true
    event.on('drop', (e: any) => {
        const position = e.data.global
        const globalPosition = target.parent.toGlobal(target.position)
        const xOK = position.x > globalPosition.x && position.x < globalPosition.x + target.width
        const yOK = position.y > globalPosition.y && position.y < globalPosition.y + target.height
        if (xOK && yOK) target.emit('drop', e)
    })
}

export default function draggify({ Container }: any) {
    Container.prototype.draggify = function() {
        useDrag(this)
    }

    Container.prototype.droppify = function() {
        useDrop(this)
    }
}

function fix(target: any) {
    target.x += target.pivot.x * target.scale.x
    target.y += target.pivot.y * target.scale.y
    if (target.anchor) {
        target.x += target.width * target.anchor.x
        target.y += target.height * target.anchor.y
    }
}
