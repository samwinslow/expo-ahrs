import { useState, useEffect, useMemo, FC } from 'react'

import * as Location from 'expo-location'
import { Alert, Text, View } from 'react-native'
import { KNOTS_TO_MPH, MPERSEC_TO_KNOTS } from './Constants'
import HeadingIndicator from './HeadingIndicator'

const LocationInfo: FC = () => {
  const [location, setLocation] = useState<Location.LocationObject | null>(null)
  const [permissionStatus, setPermissionStatus] = useState<Location.PermissionStatus | null>(null)

  const requestLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync()
    setPermissionStatus(status)
    if (status !== 'granted') {
      Alert.alert('Location access is recommended to use this app. This information will not leave your device.')
    }
  }

  useEffect(() => {
    requestLocationPermission()
  }, [])

  useEffect(() => {
    if (permissionStatus !== 'granted') {
      return
    }
    Location.watchPositionAsync({
      accuracy: Location.Accuracy.BestForNavigation,
      timeInterval: 500,
      distanceInterval: 1
    }, (loc) => {
      setLocation(loc)
    })
  }, [permissionStatus])

  const groundSpeedKnots = useMemo(() =>
    location?.coords.speed ? location.coords.speed * MPERSEC_TO_KNOTS : null
  , [location?.coords])

  const groundSpeedStatute = useMemo(() =>
    groundSpeedKnots ? groundSpeedKnots * KNOTS_TO_MPH : null
  , [groundSpeedKnots])


  return (
    <View>
      <Text>Location: {JSON.stringify(location)}</Text>
      <Text>GS (kt): {groundSpeedKnots}</Text>
      <Text>GS (mph): {groundSpeedStatute}</Text>
      { location?.coords?.heading != null && <HeadingIndicator heading={location.coords.heading} />
      }
    </View>
  )
}

export default LocationInfo
