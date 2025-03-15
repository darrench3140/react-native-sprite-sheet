import Sprite from './components/Sprite'
import AnimatedSprite from './components/AnimatedSprite'

import type { ImageSourcePropType, StyleProp } from 'react-native'

export interface Frame {
  frame: {
    x: number
    y: number
    w: number
    h: number
  }
}

type Dimension = { width: number; height: number }

export interface AnimatedSpriteType {
  startAnimation: (animationName?: string, loop?: boolean, customFrameRate?: number) => void
  stopAnimation: () => void
  getCurrentAnimationName: () => string
}

interface BaseSpriteProps {
  source: ImageSourcePropType
  spriteSheetSize: Dimension
  size: Dimension
  offset?: { x: number; y: number }
  columnRowMapping?: number[]
  frameSize?: Dimension
  frames?: Frame[]
  styles?: StyleProp<any>
}

export interface AnimatedSpriteProps extends BaseSpriteProps {
  fps?: number
  defaultAnimationName: string
  animations: Record<string, number[]>
  inLoop?: boolean
  autoPlay?: boolean
}

export interface SpriteProps extends BaseSpriteProps {
  defaultFrame: number
}

export interface SpriteType {
  setCurrentFrameIndex: (frameIndex: number) => void
}

export const getFrames = (start: number, end: number) => {
  return Array.from({ length: end - start + 1 }, (_, i) => i + start)
}

export { Sprite, AnimatedSprite }
