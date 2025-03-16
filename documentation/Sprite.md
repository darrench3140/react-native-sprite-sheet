# Sprite

Sprite component can be used to show an exact frame in your spritesheet.

## Input spritesheet

![image](../example/assets/spritesheet/elf-skill/elf-skill-sprite.png)

### Image Property:

Image size: `5120 x 2560`

Size of each frame: `512 x 512`

## Component:

```ts
import { Sprite, type SpriteType } from '@darrench3140/react-native-sprite-sheet'

const Component = () => {
    const ref = useRef<SpriteType>(null)

    // ...

    return (
        <Sprite
            ref={ref}
            source={require('../assets/spritesheet/elf-skill/elf-skill-sprite.png')}
            spriteSheetSize={{ width: 5120, height: 2560 }}
            frameSize={{ width: 512, height: 512 }}
            size={{ width: 300, height: 300 }}
            columnRowMapping={[10, 10, 10, 10, 10]}
            defaultFrame={currentFrame}
        />
    )
}
```

## Props

| Name             | Type                                                                                         | Required | Description                                                                                                                                    | Default value  |
| ---------------- | -------------------------------------------------------------------------------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| ref              | React.RefObject\<SpriteType\>                                                                | no       | Reference to the Sprite component instance for programmatic access                                                                             | null           |
| source           | ImageSourcePropType                                                                          | yes      | Path to the sprite sheet image file                                                                                                            | -              |
| spriteSheetSize  | { width: number, height: number }                                                            | yes      | the full width and height of the sprite sheet                                                                                                  | -              |
| size             | { width: number, height: number }                                                            | yes      | the width and height of the displayed sprite                                                                                                   | -              |
| offset           | { x: number, y: number}                                                                      | no       | Offset position of the sprite within its container.                                                                                            | { x: 0, y: 1 } |
| columnRowMapping | number[]                                                                                     | yes      | Array specifying the number of columns in each line                                                                                            | -              |
| frames           | { <br>"frame": { <br>"x": number,<br> "y": number,<br> "w": number,<br> "h": number<br> }}[] | no       | Array specifying the exact location (x, y axis, width and height) of each frame                                                                | -              |
| frameSize        | { width: number, height: number }                                                            | no       | the width and height of each frame in the sprite sheet. If not provided, the component auto calcuates the frame size based on columnRowMapping | -              |
| defaultFrame     | number                                                                                       | yes      | Default frame to be played when the sprite is initialized                                                                                      | -              |

## Methods

`setCurrentFrameIndex(frameIndex: number)`: Sets the frame to be displayed based on the frame index.

#### Example Usage

```js
ref.current?.setCurrentFrameIndex(2)
```
