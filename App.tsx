import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import LocationInfo from './src/LocationInfo'

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <LocationInfo />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
