import { StyleSheet, Text, View } from 'react-native'
import React, { ReactNode } from 'react'
import { tw } from '@/lib'



interface Props{
    children?:ReactNode,
    width:number,
    height:number,
}

const Circles = ({children,width,height}:Props) => {
  return (
    <View style={tw`flex w-[${width}px] h-[${height}px] rounded bg-white border-0.5 items-center justify-center  rounded-full shadow-md`}>
      { children}
    </View>
  )
}

export default Circles

const styles = StyleSheet.create({})