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
    target.on('touchend', () => {
        isMoving = false
    })
}

export default function draggify({ Container }: any) {
    Container.prototype.draggify = function() {
        useDrag(this)
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
