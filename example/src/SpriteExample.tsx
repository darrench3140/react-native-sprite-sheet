import { StyleSheet, Text, View } from 'react-native'
import { useRef, useState } from 'react'
import { Sprite } from '@darrench3140/react-native-sprite-sheet'
import type { SpriteType } from '@darrench3140/react-native-sprite-sheet'
import Slider from '@react-native-community/slider'

const SpriteExample = () => {
  const ref = useRef<SpriteType>(null)
  const [currentFrame, setCurrentFrame] = useState(9)

  const setFrame = (value: number) => {
    setCurrentFrame(value)
    ref.current?.setCurrentFrameIndex(value)
  }

  return (
    <View style={styles.screenContainer}>
      <Sprite
        ref={ref}
        source={require('../assets/spritesheet/skeleton/spritesheet.png')}
        size={{ width: 300, height: 300 }}
        spriteSheetSize={{ width: 4420, height: 130 }}
        columnRowMapping={[34]}
        defaultFrame={currentFrame}
      />
      <View style={styles.settingsContainer}>
        <Text style={styles.labelText}>Frame</Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={33}
          step={1}
          minimumTrackTintColor="lightblue"
          maximumTrackTintColor="lightblue"
          value={currentFrame}
          onValueChange={setFrame}
        />
        <Text style={styles.labelText}> {currentFrame}</Text>
      </View>
    </View>
  )
}

export default SpriteExample

const styles = StyleSheet.create({
  screenContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  slider: { width: 200, height: 40 },
  settingsContainer: {
    justifyContent: 'flex-start',
    width: '100%',
    marginLeft: 80,
    marginTop: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelText: {
    fontSize: 15,
    fontWeight: '500',
    marginRight: 12,
  },
})
