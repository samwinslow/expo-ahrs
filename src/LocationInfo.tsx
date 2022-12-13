import { useState, useEffect, useMemo, FC } from 'react'

import * as Location from 'expo-location'
import { Alert, Text, View } from 'react-native'
import { KNOTS_TO_MPH, MPERSEC_TO_KNOTS } from './Constants'
import HeadingIndicator from './HeadingIndicator'
import { isDefined } from './utils'

const LocationInfo: FC = () => {
  const [location, setLocation] = useState<Location.LocationObject | null>(null)
  const [heading, setHeading] = useState<number | null>(null)
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
    Location.watchHeadingAsync((hdg) => {
      setHeading(hdg.magHeading)
    })
  }, [permissionStatus])

  const groundSpeedKnots = useMemo(() => {
    const rawSpeed = location?.coords?.speed
    if (!isDefined(rawSpeed) || rawSpeed === -1) {
      return null
    }
    return rawSpeed * MPERSEC_TO_KNOTS
  }, [location?.coords?.speed])

  const groundSpeedStatute = useMemo(() =>
    groundSpeedKnots ? groundSpeedKnots * KNOTS_TO_MPH : null
  , [groundSpeedKnots])

  const track = useMemo(() => {
    // NB: coords.heading is a misnomer, it's actually the track
    const rawTrack = location?.coords?.heading
    if (!isDefined(rawTrack) || rawTrack === -1) {
      return null
    }
    return rawTrack
  }, [location?.coords?.heading])

  return (
    <View>
      {/* <Text>Location: {JSON.stringify(location)}</Text>
      <Text>GS (kt): {groundSpeedKnots}</Text>
      <Text>GS (mph): {groundSpeedStatute}</Text> */}
      <HeadingIndicator heading={heading ?? 0} track={track ?? 0} />
    </View>
  )
}

export default LocationInfo
