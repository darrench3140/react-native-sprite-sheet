import Button from './Button'
import { Image, StyleSheet, Switch, Text, View } from 'react-native'
import { useRef, useState } from 'react'
import { AnimatedSprite, getFrames, type AnimatedSpriteType } from '@darrench3140/react-native-sprite-sheet'
import Slider from '@react-native-community/slider'

const AnimatedExample2 = () => {
  const animatedRef = useRef<AnimatedSpriteType>(null)
  const [loop, setLoop] = useState(true)
  const [fps, setFps] = useState(10)
  const [flip, setFlip] = useState(false)
  const [offset, setOffset] = useState({ x: 0, y: 1 })

  const playAnimation = (animationName: string, needLoop: boolean = true, rate: number = 10) => {
    if (['attack1', 'attack3'].includes(animationName)) {
      setOffset({ x: 20, y: 1 })
    } else {
      setOffset({ x: 0, y: 1 })
    }
    animatedRef.current?.startAnimation(animationName, needLoop, rate)
    setLoop(needLoop)
    setFps(rate)
  }

  return (
    <View style={styles.screenContainer}>
      <AnimatedSprite
        ref={animatedRef}
        source={require('../assets/spritesheet/samurai/Samurai_Archer_Spritelist.png')}
        spriteSheetSize={{ width: 2816, height: 1280 }}
        size={{ width: 200, height: 200 }}
        offset={offset}
        columnRowMapping={[9, 8, 8, 5, 5, 6, 14, 9, 3, 5]}
        frameSize={{ width: 128, height: 128 }}
        defaultAnimationName='idle'
        animations={{
          idle: getFrames(0, 8),
          walk: getFrames(9, 16),
          run: getFrames(17, 24),
          attack1: getFrames(25, 29),
          attack2: getFrames(30, 34),
          attack3: getFrames(35, 40),
          shot: getFrames(41, 54),
          jump: [...getFrames(55, 63), 0],
          hurt: getFrames(64, 66),
          dead: getFrames(67, 71),
        }}
        inLoop={loop}
        fps={fps}
        autoPlay={true}
        styles={{ transform: [{ scaleX: flip ? -1 : 1 }] }}
      />
      <View style={styles.btnContainer}>
        <Button onPress={() => playAnimation('idle')} title='idle' />
        <Button onPress={() => playAnimation('walk')} title='walk' />
        <Button onPress={() => playAnimation('run', true, 20)} title='run' />
        <Button onPress={() => playAnimation('attack1')} title='attack1' />
        <Button onPress={() => playAnimation('attack2')} title='attack2' />
        <Button onPress={() => playAnimation('attack3')} title='attack3' />
        <Button onPress={() => playAnimation('shot', true)} title='shot' />
        <Button onPress={() => playAnimation('jump', false)} title='jump' />
        <Button onPress={() => playAnimation('hurt', false)} title='hurt' />
        <Button onPress={() => playAnimation('dead', false, 4)} title='dead' />
      </View>
      <View style={styles.btnContainer2}>
        <Button onPress={() => animatedRef.current?.stopAnimation()} title='Pause' />
        <Button onPress={() => animatedRef.current?.startAnimation()} title='Restart' />
      </View>
      <View style={styles.flexBox}>
        <Text style={styles.labelText}>FPS</Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={60}
          step={5}
          minimumTrackTintColor='lightblue'
          maximumTrackTintColor='lightblue'
          value={fps}
          onValueChange={value => setFps(value)}
        />
        <Text style={styles.labelText}> {fps}</Text>
      </View>
      <View style={styles.settingsContainer}>
        <View style={styles.flexBox}>
          <Text style={styles.labelText}>Loop</Text>
          <Switch
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={'#f4f3f4'}
            ios_backgroundColor='#3e3e3e'
            onValueChange={() => setLoop(prev => !prev)}
            value={loop}
          />
        </View>
        <View style={styles.flexBox}>
          <Text style={styles.labelText}>Flip </Text>
          <Switch
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={'#f4f3f4'}
            ios_backgroundColor='#3e3e3e'
            onValueChange={() => setFlip(prev => !prev)}
            value={flip}
          />
        </View>
      </View>
      <Text style={styles.imageLabel}>Spritesheet: </Text>
      <Image source={require('../assets/spritesheet/samurai/Samurai_Archer_Spritelist.png')} style={styles.image} resizeMode='contain' />
    </View>
  )
}

export default AnimatedExample2

const styles = StyleSheet.create({
  screenContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  btnContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  btnContainer2: {
    marginVertical: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  btn: {
    backgroundColor: 'none',
  },
  slider: { width: 200, height: 40 },
  settingsContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
    gap: 30,
  },
  flexBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelText: {
    fontSize: 15,
    fontWeight: '500',
    marginRight: 12,
  },
  imageLabel: {
    fontSize: 15,
    fontWeight: '500',
    marginTop: 20,
  },
  image: {
    width: '100%',
    height: 150,
  },
})
