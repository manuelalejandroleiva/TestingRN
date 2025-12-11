import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { ReactNode } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { tw } from '@/lib'


import { colorpallet } from '../components/color/color'


interface Props {
  text?: string,
  children?: ReactNode,
  leftIcon?: ReactNode,
  change?:boolean,

  rightIcon?: ReactNode
}

const LayoutHeader = ({ text, children, rightIcon, leftIcon,change=false }: Props) => {
  return (
    <View style={tw`flex w-full items-center justify-between z-0`}>
      <View style={tw`flex flex-row w-full bg-[${!change?colorpallet.primary:colorpallet.white}] h-[100px] items-center justify-between px-4 pt-4`}>
        {leftIcon}
        <View style={tw`flex-grow items-start justify-start px-8 pt-3`}>
          <Text style={tw`font-bold text-xl ${!change?`text-white`:`text-[${colorpallet.blue}]` } px-2`}>{text && text}</Text>
        </View>
        {rightIcon}
      </View>
      <View style={tw`flex-grow-1 w-full bg-[${colorpallet.primary}] items-center justify-start bottom-4 `}>
        {children}
      </View>

    </View>


  )
}

export default LayoutHeader

const styles = StyleSheet.create({})