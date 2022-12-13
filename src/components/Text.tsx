import React, { FC } from 'react'
import { StyleSheet, Text, TextProps } from 'react-native'

export const BaseText: FC<TextProps> = ({ children, style = {}, ...props }) => {
  return (
    <Text style={[styles.text, style]} {...props}>{children}</Text>
  )
}

export const SmallText: FC<TextProps> = ({
  children,
  style = { fontSize: 16 },
  ...props
}) => {
  return (
    <Text style={[styles.text, style]} {...props}>{children}</Text>
  )
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'PTSans-Regular',
    color: '#fff'
  },
})
