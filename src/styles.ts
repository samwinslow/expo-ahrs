import { StyleSheet } from 'react-native'
import { Colors } from './Constants'

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicators: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  indicator: {
    fontSize: 24,
    width: 60,
  },
  main: {
    textAlign: 'center',
  },
  left: {
    textAlign: 'left',
    paddingLeft: 12,
    flexGrow: 1,
  },
  right: {
    textAlign: 'right',
    paddingRight: 12,
    flexGrow: 1,
  },
  hdg: {
    color: Colors.YELLOW,
  },
  trk: {
    color: Colors.MAGENTA,
  },
})
