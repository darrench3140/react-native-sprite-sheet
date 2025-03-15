import { forwardRef, useCallback, useEffect, useImperativeHandle, useState } from 'react'
import { StyleSheet, View, Image } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated'
import type { Frame, SpriteProps, SpriteType } from '..'

const AnimatedImage = Animated.createAnimatedComponent(Image)

const Sprite = forwardRef<SpriteType, SpriteProps>((props, ref) => {
  const { source, spriteSheetSize, size, offset = { x: 0, y: 1 }, columnRowMapping, frameSize, frames, defaultFrame, styles } = props

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

    const scaleX = size.width / frame.w
    const scaleY = size.height / frame.h

    return {
      width: spriteSheetSize.width * scaleX,
      height: spriteSheetSize.height * scaleY,
      transform: [{ translateX: -frame.x * scaleX }, { translateY: -frame.y * scaleY }],
    }
  })

  useEffect(() => {
    if (!frames) {
      if (!columnRowMapping || columnRowMapping.length === 0) throw new Error('columnRowMapping is not set.')
      const w = frameSize?.width ?? spriteSheetSize.width / Math.max(...columnRowMapping)
      const h = frameSize?.height ?? spriteSheetSize.height / columnRowMapping.length

      const calcFrames = columnRowMapping.flatMap((noOfColumn, rowIndex) => {
        return Array.from(
          { length: noOfColumn },
          (_, colIndex) =>
            ({
              frame: {
                h: h,
                w: w,
                x: colIndex * w + (offset?.x ?? 0),
                y: rowIndex * h + (offset?.y ?? 0),
              },
            }) as Frame
        )
      })
      setAllFrames(calcFrames)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const containerStyle = StyleSheet.compose(StyleSheet.compose(defaultStyles.container, size), styles)

  return (
    <View style={containerStyle}>
      <AnimatedImage source={source} style={animatedStyle} resizeMode="contain" />
    </View>
  )
})

const defaultStyles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
})

export default Sprite
