import { Image, StyleSheet, Text, View } from 'react-native'
import { useRef, useState } from 'react'
import { Sprite, type SpriteType } from '@darrench3140/react-native-sprite-sheet'
import Slider from '@react-native-community/slider'

const SpriteExample = () => {
  const ref = useRef<SpriteType>(null)
  const [currentFrame, setCurrentFrame] = useState(33)

  const setFrame = (value: number) => {
    setCurrentFrame(value)
    ref.current?.setCurrentFrameIndex(value)
  }

  return (
    <View style={styles.screenContainer}>
      <Sprite
        ref={ref}
        source={require('../assets/spritesheet/elf-skill/elf-skill-sprite.png')}
        spriteSheetSize={{ width: 5120, height: 2560 }}
        frameSize={{ width: 512, height: 512 }}
        size={{ width: 300, height: 300 }}
        columnRowMapping={[10, 10, 10, 10, 10]}
        defaultFrame={currentFrame}
      />
      <View style={styles.settingsContainer}>
        <Text style={styles.labelText}>Frame</Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={49}
          step={1}
          minimumTrackTintColor="lightblue"
          maximumTrackTintColor="lightblue"
          value={currentFrame}
          onValueChange={setFrame}
        />
        <Text style={styles.labelText}> {currentFrame}</Text>
      </View>
      <Text style={styles.imageLabel}>Spritesheet: </Text>
      <Image source={require('../assets/spritesheet/elf-skill/elf-skill-sprite.png')} style={styles.image} resizeMode="contain" />
    </View>
  )
}

export default SpriteExample

const styles = StyleSheet.create({
  screenContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  slider: { width: 200, height: 40 },
  settingsContainer: {
    justifyContent: 'flex-start',
    width: '100%',
    marginTop: 50,
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
    width: '100%',
  },
  image: {
    width: '100%',
    height: 180,
  },
})
