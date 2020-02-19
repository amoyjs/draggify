# @amoy/draggify

pixi.js draggable extension

## Usage

```ts
import { use, Scene } from '@amoy/scene'
import draggify from '@amoy/draggify'

use(draggify)

// @scenes/home/index.ts
class Home extends Scene {
    create() {
        const ball = Sprite.from('ball')
        ball.draggify()
        // now `ball` can be dragged.
    }
}
```