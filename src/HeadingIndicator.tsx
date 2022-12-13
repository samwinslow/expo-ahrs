import { Canvas, Circle, Group, Line, Points, SkPoint, Skia, TextPath, useComputedValue, useFont, useValue, vec } from '@shopify/react-native-skia'
import { FC, useMemo } from 'react'
import { StyleSheet, useWindowDimensions, View } from 'react-native'
import { cosd, degToRad, sind } from './utils'
import { range as _range } from 'lodash'
import { BaseText } from './components/Text'

type HeadingIndicatorProps = {
  heading: number
  track: number
}

const getTick = (origin: SkPoint, radius: number, angle: number) => {
  const length = getTickLength(angle)
  const x1 = origin.x + radius * sind(angle)
  const y1 = origin.y - radius * cosd(angle)
  const x2 = origin.x + (radius - length) * sind(angle)
  const y2 = origin.y - (radius - length) * cosd(angle)
  return [vec(x1, y1), vec(x2, y2)]
}

const getTickLength = (angle: number) => {
  switch (true) {
    case angle % 90 === 0:
      return 32
    case angle % 30 === 0:
      return 24
    case angle % 10 === 0:
      return 18
    case angle % 5 === 0:
      return 8
    default:
      return 4
  }
}

const getLabelStart = (angle: number, correction = 0) =>
  degToRad(angle + correction - 90)

const HeadingIndicator: FC<HeadingIndicatorProps> = ({ heading, track = 0 }) => {
  const { width } = useWindowDimensions()

  const viewStyle = useMemo(() => ({
    width,
    height: width,
    backgroundColor: '#000'
  }), [width])

  const size = useValue({ width, height: width })

  const origin = useComputedValue(() =>
    vec(size.current.width / 2, size.current.height / 2)
  , [size.current.width, size.current.height])

  const radius = useComputedValue(() => size.current.width / 2 - 16, [size.current.width])

  const headingPoint = useComputedValue(() => {
    const x = origin.current.x + radius.current * sind(heading)
    const y = origin.current.y - radius.current * cosd(heading)
    return vec(x, y)
  }, [heading, radius.current, origin.current])

  const trackPoint = useComputedValue(() => {
    const x = origin.current.x + radius.current * sind(track)
    const y = origin.current.y - radius.current * cosd(track)
    return vec(x, y)
  }, [track, radius.current, origin.current])

  const cardinalPoints = useMemo(() => 
    _range(0, 360, 5).flatMap(angle => getTick(origin.current, radius.current, angle)),
    [origin.current, radius.current]
  )

  const path = Skia.Path.Make();
  path.addCircle(origin.current.x, origin.current.y, radius.current - 64);

  const font = useFont(require('../assets/PT_Sans/PTSans-Regular.ttf'), 24)
  if (!font) {
    return null
  }

  return (
    <View style={styles.container}>
      <BaseText style={{ fontSize: 24 }}>{Math.round(heading) + '˚'}</BaseText>
      <View style={viewStyle}>
        <Canvas style={{ flex: 1 }}>
          <Group origin={origin} transform={[{ rotate: degToRad(-heading) }]}>
          <Circle
            cx={origin.current.x}
            cy={origin.current.y}
            r={radius}
            color="#000"
          />
          <Line
            p1={origin}
            p2={trackPoint}
            color="#FF00AA"
            style="stroke"
            strokeWidth={2}
          />
          <Line
            p1={origin}
            p2={headingPoint}
            color="#22FF00"
            style="stroke"
            strokeWidth={2}
          />
          <Points
            points={cardinalPoints}
            mode="lines"
            color="#FFF"
            style="stroke"
            strokeWidth={1}
          />
          <Group origin={origin} transform={[{ rotate: getLabelStart(0, -4) }]}>
            <TextPath font={font} path={path} text="N" color="#FFF" />
          </Group>
          <Group origin={origin} transform={[{ rotate: getLabelStart(30, -3) }]}>
            <TextPath font={font} path={path} text="3" color="#FFF" />
          </Group>
          <Group origin={origin} transform={[{ rotate: getLabelStart(60, -3) }]}>
            <TextPath font={font} path={path} text="6" color="#FFF" />
          </Group>
          <Group origin={origin} transform={[{ rotate: getLabelStart(90, -3) }]}>
            <TextPath font={font} path={path} text="E" color="#FFF" />
          </Group>
          <Group origin={origin} transform={[{ rotate: getLabelStart(120, -6) }]}>
            <TextPath font={font} path={path} text="12" color="#FFF" />
          </Group>
          <Group origin={origin} transform={[{ rotate: getLabelStart(150, -6) }]}>
            <TextPath font={font} path={path} text="15" color="#FFF" />
          </Group>
          <Group origin={origin} transform={[{ rotate: getLabelStart(180, -3) }]}>
            <TextPath font={font} path={path} text="S" color="#FFF" />
          </Group>
          <Group origin={origin} transform={[{ rotate: getLabelStart(210, -6) }]}>
            <TextPath font={font} path={path} text="21" color="#FFF" />
          </Group>
          <Group origin={origin} transform={[{ rotate: getLabelStart(240, -6) }]}>
            <TextPath font={font} path={path} text="24" color="#FFF" />
          </Group>
          <Group origin={origin} transform={[{ rotate: getLabelStart(270, -4) }]}>
            <TextPath font={font} path={path} text="W" color="#FFF" />
          </Group>
          <Group origin={origin} transform={[{ rotate: getLabelStart(300, -6) }]}>
            <TextPath font={font} path={path} text="30" color="#FFF" />
          </Group>
          <Group origin={origin} transform={[{ rotate: getLabelStart(330, -6) }]}>
            <TextPath font={font} path={path} text="33" color="#FFF" />
          </Group>
          </Group>
        </Canvas>
      </View>
    </View>
  )
}

export default HeadingIndicator

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
