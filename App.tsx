import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import LocationInfo from './src/LocationInfo'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { useCallback } from 'react'

SplashScreen.preventAutoHideAsync()

export default function App() {
  const [fontsLoaded] = useFonts({
    'PTSans-Regular': require('./assets/PT_Sans/PTSans-Regular.ttf'),
  })

  const onLayout = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync()
    }
  }, [fontsLoaded])

  if (!fontsLoaded) {
    return null
  }

  return (
    <View style={styles.container} onLayout={onLayout}>
      <StatusBar style="auto" />
      <LocationInfo />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
