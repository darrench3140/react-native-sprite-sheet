import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import type { TouchableOpacityProps } from 'react-native'

export type ButtonProps = TouchableOpacityProps & {
  title: string
}

const Button: React.FC<ButtonProps> = ({ title, style, ...props }) => (
  <TouchableOpacity style={[styles.button, style]} {...props}>
    <Text style={styles.text}>{title}</Text>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  text: {
    color: 'dodgerblue',
    fontSize: 16,
    fontWeight: '500',
  },
})

export default Button
