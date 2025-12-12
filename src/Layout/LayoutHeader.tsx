import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { ReactNode, useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { tw } from '@/lib'


import { colorpallet } from '../components/color/color'
import RNDateTimePicker from '@react-native-community/datetimepicker'
import { useUSer } from '../hooks/useUser'
import { date } from 'drizzle-orm/mysql-core'


interface Props {
  text?: string,
  children?: ReactNode,
  leftIcon?: ReactNode,
  change?:boolean,

  rightIcon?: ReactNode
}

const LayoutHeader = ({ text, children, rightIcon, leftIcon,change=false }: Props) => {
    const [dateValue, setDateValue] = useState(new Date());
    const {filtrarFecha}=useUSer()
  
  return (
    <View style={tw`flex w-full items-center justify-between z-0`}>
      <View style={tw`flex flex-row w-full bg-[${!change?colorpallet.primary:colorpallet.white}] h-[100px] items-center justify-between px-4 pt-4`}>
        {leftIcon}
        <View style={tw`flex-grow items-start justify-start px-8 pt-3`}>
          <Text style={tw`font-bold text-xl ${!change?`text-white`:`text-[${colorpallet.blue}]` } px-2`}>{text && text}</Text>
        </View>
        {rightIcon}
      </View>
      <View style={tw`flex flex-row w-full items-center justify-between px-4 pt-4 pb-2`}>
        <Text style={tw`font-bold text-lg `}>Selecciona la fecha:</Text>
        <RNDateTimePicker
        value={dateValue}
        onChange={(event, selectedDate) => {
            if (selectedDate) {
                
                const adjustedDate = new Date(selectedDate);
                adjustedDate.setDate(selectedDate.getDate());
                setDateValue(adjustedDate);
                
            }
        }} />
        <TouchableOpacity
        onPress={()=>filtrarFecha(dateValue.toISOString())}
        style={tw`bg-blue-500 px-4 py-2 rounded-full shadow-lg`}
        activeOpacity={0.7} // efecto al presionar
    >
      <Text style={tw`text-white font-bold text-base`}>Filtrar</Text>
    </TouchableOpacity>


      </View>
      <View style={tw`flex-grow-1 w-full bg-[${colorpallet.primary}] items-center justify-start bottom-4 `}>
        {children}
      </View>

    </View>


  )
}

export default LayoutHeader

const styles = StyleSheet.create({})