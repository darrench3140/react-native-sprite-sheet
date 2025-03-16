import { Button, Image, StyleSheet, Switch, Text, View } from 'react-native'
import { useRef, useState } from 'react'
import { AnimatedSprite, getFrames, type AnimatedSpriteType } from '@darrench3140/react-native-sprite-sheet'
import SpritSheetNinjaJSON from '../assets/spritesheet/ninja/spritesheet.json'
import Slider from '@react-native-community/slider'

const AnimatedExample1 = () => {
  const animatedRef = useRef<AnimatedSpriteType>(null)
  const [loop, setLoop] = useState(true)
  const [fps, setFps] = useState(20)

  const playAnimation = (animationName: string, needLoop: boolean = true, rate: number = 10) => {
    animatedRef.current?.startAnimation(animationName, needLoop, rate)
    setLoop(needLoop)
    setFps(rate)
  }

  return (
    <View style={styles.screenContainer}>
      <AnimatedSprite
        ref={animatedRef}
        source={require('../assets/spritesheet/ninja/spritesheet.png')}
        spriteSheetSize={{ width: 14690, height: 601 }}
        size={{ width: 200, height: 300 }}
        frames={SpritSheetNinjaJSON.frames}
        defaultAnimationName="ATTACK"
        animations={{
          ATTACK: getFrames(0, 9),
          CLIMB: getFrames(10, 19),
          DEAD: getFrames(20, 29),
        }}
        inLoop={loop}
        fps={fps}
        autoPlay={true}
      />
      <View style={styles.btnContainer}>
        <Button onPress={() => playAnimation('ATTACK', true, 20)} title="ATTACK" />
        <Button onPress={() => playAnimation('CLIMB', true, 10)} title="CLIMB" />
        <Button onPress={() => playAnimation('DEAD', false)} title="DEAD" />
        <Button onPress={() => animatedRef.current?.stopAnimation()} title="Pause" />
        <Button onPress={() => animatedRef.current?.startAnimation()} title="Restart" />
      </View>
      <View style={styles.settingsContainer}>
        <Text style={styles.labelText}>FPS</Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={60}
          step={5}
          minimumTrackTintColor="lightblue"
          maximumTrackTintColor="lightblue"
          value={fps}
          onValueChange={(value) => setFps(value)}
        />
        <Text style={styles.labelText}> {fps}</Text>
      </View>
      <View style={styles.settingsContainer}>
        <Text style={styles.labelText}>Loop</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={'#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={() => setLoop((prev) => !prev)}
          value={loop}
        />
      </View>
      <Text style={styles.imageLabel}>Spritesheet: </Text>
      <Image source={require('../assets/spritesheet/ninja/spritesheet.png')} style={styles.image} resizeMode="contain" />
    </View>
  )
}

export default AnimatedExample1

const styles = StyleSheet.create({
  screenContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  btnContainer: {
    marginTop: 50,
    flexDirection: 'row',
  },
  slider: { width: 200, height: 40 },
  settingsContainer: {
    justifyContent: 'flex-start',
    width: '100%',
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelText: {
    fontSize: 15,
    fontWeight: '500',
    marginRight: 12,
  },
  imageLabel: {
    width: '100%',
    marginTop: 20,
    fontSize: 15,
    fontWeight: '500',
  },
  image: {
    width: '100%',
    height: 50,
  },
})
