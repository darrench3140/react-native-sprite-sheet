import type { ImageSourcePropType } from 'react-native'

export interface Frame {
  frame: {
    x: number
    y: number
    w: number
    h: number
  }
}

export interface AnimatedSpriteType {
  startAnimation: (animationName?: string, loop?: boolean, customFrameRate?: number) => void
  stopAnimation: () => void
  getCurrentAnimationName: () => string
}

export interface AnimatedSpriteProps {
  source: ImageSourcePropType
  spriteSheetWidth: number
  spriteSheetHeight: number
  fps?: number
  width: number
  height: number
  columnRowMapping?: number[]
  frameWidth?: number
  frameHeight?: number
  frames?: Frame[]
  defaultAnimationName: string
  animations: Record<string, number[]>
  inLoop?: boolean
  autoPlay?: boolean
}

export interface SpriteProps {
  source: ImageSourcePropType
  spriteSheetWidth: number
  spriteSheetHeight: number
  width: number
  height: number
  columnRowMapping?: number[]
  frameWidth?: number
  frameHeight?: number
  frames?: Frame[]
  defaultFrame: number
}

export interface SpriteType {
  setCurrentFrameIndex: (frameIndex: number) => void
}
