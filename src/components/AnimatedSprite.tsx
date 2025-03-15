import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useState } from 'react'
import { View, StyleSheet, Image } from 'react-native'
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withRepeat, withSequence, Easing, cancelAnimation } from 'react-native-reanimated'
import type { AnimatedSpriteProps, AnimatedSpriteType, Frame } from '..'

const AnimatedImage = Animated.createAnimatedComponent(Image)

const AnimatedSprite = forwardRef<AnimatedSpriteType, AnimatedSpriteProps>((props, ref) => {
  const {
    source,
    spriteSheetSize,
    fps = 60,
    size,
    offset = { x: 0, y: 1 },
    columnRowMapping,
    frameSize,
    frames,
    inLoop = false,
    autoPlay = false,
    animations,
    defaultAnimationName,
    styles,
  } = props
  const [allFrames, setAllFrames] = useState<Frame[]>(frames ?? [])
  const [currentAnimationName, setCurrentAnimationName] = useState(defaultAnimationName)
  const frameIndex = useSharedValue<number>(0)

  const toggleAnimation = useCallback(
    (animationName: string, loop: boolean, customFps: number) => {
      if (!animations[animationName]) {
        console.warn(`Invalid animation name: ${animationName}`)
        return
      }
      frameIndex.value = 0 // quick frame reset
      setCurrentAnimationName(animationName)
      const selectedFramesIndices = animations[animationName]

      const animationsSequence = selectedFramesIndices.map((_, index) =>
        withTiming(index, {
          duration: 1000 / customFps,
          easing: Easing.linear,
        })
      )

      const numberOfReps = loop ? -1 : 1
      frameIndex.value = withRepeat(withSequence(...animationsSequence), numberOfReps, false)
    },
    [animations, frameIndex]
  )

  useImperativeHandle(
    ref,
    () => ({
      startAnimation: (animationName = currentAnimationName, loop = inLoop, customFps = fps) => {
        toggleAnimation(animationName, loop, customFps)
      },
      stopAnimation: () => {
        cancelAnimation(frameIndex)
      },
      getCurrentAnimationName: () => currentAnimationName,
    }),
    [toggleAnimation, inLoop, fps, frameIndex, currentAnimationName]
  )

  const animatedStyle = useAnimatedStyle(() => {
    const selectedFrames = animations[currentAnimationName]?.map((index) => allFrames[index]) ?? []
    const index = Math.floor(frameIndex.value ?? 0)
    const frame = selectedFrames[index]?.frame
    if (!frame) return {}
    // Calculate the scale factors
    const scaleX = size.width / frame.w
    const scaleY = size.height / frame.h

    return {
      width: spriteSheetSize.width * scaleX, // The scaled sprite sheet width
      height: spriteSheetSize.height * scaleY, // The scaled sprite sheet height
      transform: [
        // Translate to the position of the frame
        { translateX: -(frame.x + (offset?.x ?? 0)) * scaleX },
        { translateY: -(frame.y + (offset?.y ?? 0)) * scaleY },
      ],
    }
  })

  useEffect(() => {
    if (autoPlay) {
      toggleAnimation(currentAnimationName, inLoop, fps)
    }
  }, [toggleAnimation, autoPlay, currentAnimationName, inLoop, fps, ref])

  useEffect(() => {
    // if prop 'frames' is undefined, calculate frames manually
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
                x: colIndex * w,
                y: rowIndex * h,
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
      <AnimatedImage source={source} style={animatedStyle} resizeMode={'contain'} />
    </View>
  )
})

const defaultStyles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
})

export default React.memo(AnimatedSprite)
