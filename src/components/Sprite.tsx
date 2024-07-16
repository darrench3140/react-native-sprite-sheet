import { forwardRef, useCallback, useEffect, useImperativeHandle, useState } from 'react'
import { StyleSheet, View, Image } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated'
import type { Frame, SpriteProps, SpriteType } from '../types/SpriteTypes'

const AnimatedImage = Animated.createAnimatedComponent(Image)

const Sprite = forwardRef<SpriteType, SpriteProps>((props, ref) => {
  const { source, spriteSheetWidth, spriteSheetHeight, width, height, columnRowMapping, frameWidth, frameHeight, frames, defaultFrame } = props

  const [allFrames, setAllFrames] = useState<Frame[]>(frames ?? [])

  const currentFrameIndex = useSharedValue(defaultFrame)

  const setCurrentFrameIndex = useCallback(
    (frameIndex: number) => {
      if (frameIndex < 0 || frameIndex >= allFrames.length) {
        console.warn(`Invalid frame index: ${frameIndex}`)
        return
      }
      currentFrameIndex.value = frameIndex
    },
    [currentFrameIndex, allFrames.length]
  )

  useImperativeHandle(
    ref,
    () => ({
      setCurrentFrameIndex,
    }),
    [setCurrentFrameIndex]
  )

  const animatedStyle = useAnimatedStyle(() => {
    const frame = allFrames[currentFrameIndex.value]?.frame
    if (!frame) return {}

    const scaleX = width / frame.w
    const scaleY = height / frame.h

    return {
      width: spriteSheetWidth * scaleX,
      height: spriteSheetHeight * scaleY,
      transform: [{ translateX: -frame.x * scaleX }, { translateY: -frame.y * scaleY }],
    }
  })

  useEffect(() => {
    if (!frames) {
      if (!columnRowMapping || columnRowMapping.length === 0) throw new Error('columnRowMapping is not set.')
      const w = frameWidth ?? spriteSheetWidth / Math.max(...columnRowMapping)
      const h = frameHeight ?? spriteSheetHeight / columnRowMapping.length

      const calcFrames = columnRowMapping.flatMap((noOfColumn, rowIndex) => {
        return Array.from(
          { length: noOfColumn },
          (_, colIndex) =>
            ({
              frame: {
                h: h,
                w: w,
                x: colIndex * w,
                y: rowIndex * h,
              },
            }) as Frame
        )
      })
      setAllFrames(calcFrames)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const containerStyle = StyleSheet.compose(styles.container, {
    width,
    height,
  })

  return (
    <View style={containerStyle}>
      <AnimatedImage source={source} style={animatedStyle} resizeMode="contain" />
    </View>
  )
})

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
})

export default Sprite
