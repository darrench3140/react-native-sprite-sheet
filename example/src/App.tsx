import { useState } from 'react'
import Button from './Button'
import { Platform, SafeAreaView, StatusBar, StyleSheet, View } from 'react-native'
import AnimatedExample1 from './AnimatedExample1'
import AnimatedExample2 from './AnimatedExample2'
import SpriteExample from './SpriteExample'

export default function App() {
  const [active, setActive] = useState('ANIMATED')

  return (
    <SafeAreaView style={styles.androidSafeArea}>
      <View style={styles.container}>
        <Button onPress={() => setActive('ANIMATED')} title='Animated' />
        <Button onPress={() => setActive('ANIMATED2')} title='Animated2' />
        <Button onPress={() => setActive('SPRITE')} title='Sprite' />
      </View>
      {active === 'ANIMATED' ? <AnimatedExample1 /> : active === 'ANIMATED2' ? <AnimatedExample2 /> : <SpriteExample />}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 30,
  },
  androidSafeArea: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  screenContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnContainer: {
    marginTop: 50,
  },
})
