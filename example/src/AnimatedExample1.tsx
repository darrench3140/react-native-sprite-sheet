import { Button, StyleSheet, Switch, Text, View } from 'react-native';
import { useRef, useState } from 'react';
import { AnimatedSprite } from 'react-native-sprite-sheet';
import type { AnimatedSpriteType } from '../../src/types/SpriteTypes';
import SpritSheetNinjaJSON from '../assets/spritesheet/ninja/spritesheet.json';
import Slider from '@react-native-community/slider';

const AnimatedExample1 = () => {
  const animatedRef = useRef<AnimatedSpriteType>(null);
  const [loop, setLoop] = useState(false);
  const [fps, setFps] = useState(10);

  return (
    <View style={styles.screenContainer}>
      <AnimatedSprite
        ref={animatedRef}
        source={require('../assets/spritesheet/ninja/spritesheet.png')}
        spriteSheetWidth={14690}
        spriteSheetHeight={601}
        width={200}
        height={300}
        frames={SpritSheetNinjaJSON.frames}
        defaultAnimationName="ATTACK"
        animations={{
          ATTACK: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
          CLIMB: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
          DEAD: [20, 21, 22, 23, 24, 25, 26, 27, 28, 29],
        }}
        inLoop={loop}
        fps={fps}
        autoPlay={true}
      />
      <View style={styles.btnContainer}>
        <Button
          onPress={() => animatedRef.current?.startAnimation('ATTACK', true)}
          title="ATTACK"
        />
        <Button
          onPress={() => animatedRef.current?.startAnimation('CLIMB')}
          title="CLIMB"
        />
        <Button
          onPress={() => animatedRef.current?.startAnimation('DEAD')}
          title="DEAD"
        />
        <Button
          onPress={() => animatedRef.current?.stopAnimation()}
          title="Pause"
        />
        <Button
          onPress={() => animatedRef.current?.startAnimation()}
          title="Restart"
        />
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
    </View>
  );
};

export default AnimatedExample1;

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
});
