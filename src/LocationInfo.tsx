import { useState, useEffect, useMemo, FC } from 'react'

import * as Location from 'expo-location'
import { Alert, Text, useWindowDimensions, View } from 'react-native'
import { KNOTS_TO_MPH, MPERSEC_TO_KNOTS, METERS_TO_FEET } from './Constants'
import HeadingIndicator from './HeadingIndicator'
import { formatFeet, isDefined, roundToNearestMultiple } from './utils'
import { BaseText, SmallText } from './components/Text'
import { styles } from './styles'

const LocationInfo: FC = () => {
  const { width } = useWindowDimensions()

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

  const deviceAltitude = useMemo(() => {
    const rawAltitude = location?.coords?.altitude
    if (!isDefined(rawAltitude) || rawAltitude === -1) {
      return null
    }
    return rawAltitude * METERS_TO_FEET
  }, [location?.coords?.altitude])

  const altitudeTolerance = useMemo(() => {
    const rawAccuracy = location?.coords?.altitudeAccuracy
    if (!isDefined(rawAccuracy) || rawAccuracy === -1) {
      return null
    }
    return rawAccuracy * METERS_TO_FEET
  }, [location?.coords?.accuracy])

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
      <HeadingIndicator heading={heading ?? 0} track={track ?? 0} />
      <View style={[styles.indicators, { width }]}>
        <BaseText style={[styles.indicator, styles.left]}>
          <SmallText>GS</SmallText>
            {`\n${groundSpeedKnots?.toFixed(1) ?? '--'} `}
          <SmallText>kt</SmallText>
        </BaseText>
        <BaseText style={[styles.indicator, styles.right]}>
          <SmallText>EST. ALT</SmallText>
          {`\n${deviceAltitude ? formatFeet(deviceAltitude) : '--'} `}
          <SmallText>{altitudeTolerance ? `±${roundToNearestMultiple(altitudeTolerance, 5)} ft` : 'ft'}</SmallText>
        </BaseText>
      </View>
    </View>
  )
}

export default LocationInfo
