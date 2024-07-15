import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import { View, StyleSheet, Image } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
  Easing,
  cancelAnimation,
} from 'react-native-reanimated';
import type {
  AnimatedSpriteType,
  AnimatedSpriteProps,
  Frame,
} from '../types/SpriteTypes';

const AnimatedImage = Animated.createAnimatedComponent(Image);

const AnimatedSprite = forwardRef<AnimatedSpriteType, AnimatedSpriteProps>(
  (props, ref) => {
    const {
      source,
      spriteSheetWidth,
      spriteSheetHeight,
      fps = 60,
      width,
      height,
      columnRowMapping,
      frameWidth,
      frameHeight,
      frames,
      inLoop = false,
      autoPlay = false,
      animations,
      defaultAnimationName,
    } = props;
    const [allFrames, setAllFrames] = useState<Frame[]>(frames ?? []);

    const currentAnimationName = useSharedValue(defaultAnimationName);
    const frameIndex = useSharedValue<number>(0);

    const toggleAnimation = useCallback(
      (animationName: string, loop: boolean, customFps: number) => {
        if (!animations[animationName]) {
          console.warn(`Invalid animation name: ${animationName}`);
          return;
        }
        currentAnimationName.value = animationName;
        const selectedFramesIndices = animations[animationName];

        const animationsSequence = selectedFramesIndices.map((_, index) =>
          withTiming(index, {
            duration: 1000 / customFps,
            easing: Easing.linear,
          })
        );

        const numberOfReps = loop ? -1 : 1;
        frameIndex.value = withRepeat(
          withSequence(...animationsSequence),
          numberOfReps,
          false
        );
      },
      [animations, currentAnimationName, frameIndex]
    );

    useImperativeHandle(
      ref,
      () => ({
        startAnimation: (
          animationName = currentAnimationName.value,
          loop = inLoop,
          customFps = fps
        ) => {
          toggleAnimation(animationName, loop, customFps);
        },
        stopAnimation: () => {
          cancelAnimation(frameIndex);
        },
        getCurrentAnimationName: () => currentAnimationName.value,
      }),
      [toggleAnimation, inLoop, fps, frameIndex, currentAnimationName.value]
    );

    const animatedStyle = useAnimatedStyle(() => {
      const selectedFrames =
        animations[currentAnimationName.value]?.map(
          (index) => allFrames[index]
        ) ?? [];
      const index = Math.floor(frameIndex.value ?? 0);
      const frame = selectedFrames[index]?.frame;
      if (!frame) {
        return {};
      }
      // Calculate the scale factors
      const scaleX = width / frame.w;
      const scaleY = height / frame.h;

      return {
        width: spriteSheetWidth * scaleX, // The scaled sprite sheet width
        height: spriteSheetHeight * scaleY, // The scaled sprite sheet height
        transform: [
          // Translate to the position of the frame
          { translateX: -frame.x * scaleX },
          { translateY: -frame.y * scaleY },
        ],
      };
    });

    useEffect(() => {
      if (autoPlay) {
        toggleAnimation(currentAnimationName.value, inLoop, fps);
      }
    }, [toggleAnimation, autoPlay, currentAnimationName, inLoop, fps, ref]);

    useEffect(() => {
      // if prop 'frames' is undefined, calculate frames manually
      if (!frames) {
        if (!columnRowMapping || columnRowMapping.length === 0)
          throw new Error('columnRowMapping is not set.');
        const w =
          frameWidth ?? spriteSheetWidth / Math.max(...columnRowMapping);
        const h = frameHeight ?? spriteSheetHeight / columnRowMapping.length;
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
          );
        });
        setAllFrames(calcFrames);
      }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const containerStyle = StyleSheet.compose(styles.container, {
      width,
      height,
    });

    return (
      <View style={containerStyle}>
        <AnimatedImage
          source={source}
          style={animatedStyle}
          resizeMode={'contain'}
        />
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
});

export default React.memo(AnimatedSprite);
