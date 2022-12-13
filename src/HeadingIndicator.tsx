import { Canvas, Circle, Line, useComputedValue, useValue, vec } from '@shopify/react-native-skia'
import { FC, useMemo } from 'react'
import { useWindowDimensions, View } from 'react-native'
import { cosd, sind } from './utils'

type HeadingIndicatorProps = {
  heading: number
}

const HeadingIndicator: FC<HeadingIndicatorProps> = ({ heading = 0 }) => {
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

  return (
    <View style={viewStyle}>
      <Canvas style={{ flex: 1 }}>
        <Circle
          cx={origin.current.x}
          cy={origin.current.y}
          r={radius}
          color="#AAA"
        />
        <Line
          p1={origin}
          p2={headingPoint}
          color="#FFF"
          style="stroke"
          strokeWidth={2}
        />
      </Canvas>
    </View>
  )
}

export default HeadingIndicator
