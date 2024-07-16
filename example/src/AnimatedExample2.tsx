import { Button, StyleSheet, Switch, Text, View } from 'react-native'
import { useRef, useState } from 'react'
import { AnimatedSprite } from 'react-native-sprite-sheet'
import type { AnimatedSpriteType } from '../../src/types/SpriteTypes'
import Slider from '@react-native-community/slider'

const AnimatedExample2 = () => {
  const animatedRef = useRef<AnimatedSpriteType>(null)
  const [loop, setLoop] = useState(false)
  const [fps, setFps] = useState(20)
  const [flip, setFlip] = useState(false)

  return (
    <View style={styles.screenContainer}>
      <View style={{ transform: [{ scaleX: flip ? -1 : 1 }] }}>
        <AnimatedSprite
          ref={animatedRef}
          source={require('../assets/spritesheet/mummy/spritesheet.png')}
          spriteSheetWidth={1665}
          spriteSheetHeight={1680}
          width={198.2}
          height={300}
          columnRowMapping={[9, 9, 9, 9, 9, 9]}
          frameWidth={185}
          frameHeight={281}
          defaultAnimationName="walk"
          animations={{
            walk: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
            appear: Array.from({ length: 15 }, (_, i) => i + 18),
            die: Array.from({ length: 21 }, (_, i) => i + 33),
          }}
          inLoop={loop}
          fps={fps}
          autoPlay={true}
        />
      </View>
      <View style={styles.btnContainer}>
        <Button onPress={() => animatedRef.current?.startAnimation('walk')} title="walk" />
        <Button onPress={() => animatedRef.current?.startAnimation('appear')} title="appear" />
        <Button onPress={() => animatedRef.current?.startAnimation('die')} title="die" />
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
      <View style={styles.settingsContainer}>
        <Text style={styles.labelText}>Flip </Text>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={'#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={() => setFlip((prev) => !prev)}
          value={flip}
        />
      </View>
    </View>
  )
}

export default AnimatedExample2

const styles = StyleSheet.create({
  screenContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnContainer: {
    marginTop: 50,
    flexDirection: 'row',
  },
  slider: { width: 200, height: 40 },
  settingsContainer: {
    justifyContent: 'flex-start',
    width: '100%',
    marginLeft: 80,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelText: {
    fontSize: 15,
    fontWeight: '500',
    marginRight: 12,
  },
})
