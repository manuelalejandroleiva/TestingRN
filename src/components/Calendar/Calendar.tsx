import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import DateTimePicker from "@react-native-community/datetimepicker"
import { tw } from '@/lib'
import { useRoute } from '@react-navigation/native'
import { colorpallet } from '../color/color'
import { useFieldControl } from '@/lib/Forms'
import { useAuth } from '@/src/Hooks/useAuth'

interface Props {
    formatted?: (s: string) => void,
    text?: string,
    bool?:boolean,
    disable?: boolean,
    errorMessage?: string,
    textbottom?: string,
    resetKey?: number, // <-- nueva prop para reiniciar
}

const CalendarPicker = ({ formatted, text, disable, textbottom, errorMessage, resetKey,bool }: Props) => {
    const [date, setDate] = useState<Date | null>(null)
    const [dateFormatted, setDateFormatted] = useState<string>("")
    const [showPicker, setShowPicker] = useState<boolean>(false)
    const route = useRoute()
    const { showToast } = useAuth()
   

    const toggleDatePicker = () => {
        setShowPicker(!showPicker)
    }

    const onChange = ({ type }: any, selectedDate?: Date) => {
        if (type === 'set' && selectedDate) {
            setDate(selectedDate)
            toggleDatePicker()
        }
        setShowPicker(false)
    }

    useEffect(() => {
        if (date) {
            const year = date.getFullYear()
            const month = (date.getMonth() + 1).toString().padStart(2, '0')
            const day = date.getDate().toString().padStart(2, '0')
            const formattedDate = `${year}/${month}/${day}`
            if (date <= new Date()) {
                setDateFormatted(formattedDate)
                formatted && formatted(formattedDate)
            } else {
                showToast(errorMessage as string, 'danger')
            }
        }
    }, [date, route.name])

    // Reinicia el estado cuando resetKey cambia
    useEffect(() => {
        setDate(null)
        setDateFormatted("")
        formatted && formatted("") // también limpia el campo en el padre
    }, [resetKey])

    return (
        <View style={tw`flex ${bool?`w-[400px]`:`w-[320px]`} ${disable ? `flex-col` : `flex-row`} border-b ${disable ? `border-b-[${colorpallet.gray}]` : `border-b-[#000000]`} items-start justify-start`}>
            <View style={tw`w-[290px] flex ${disable ? `flex-col` : ``}`}>
                <Text style={tw`${disable ? 'text-gray-400' : 'text-black'}`}>
                    {text}
                </Text>
                <Text style={tw`${disable ? 'text-gray-400' : 'text-black'}`}>
                    {dateFormatted || textbottom}
                </Text>
            </View>

            {!disable && (
                <TouchableOpacity onPress={toggleDatePicker} style={tw`w-10 h-10 items-center justify-center pt-4`}>
                    <Image source={require('@/assets/img/calendar_month.png')} />
                </TouchableOpacity>
            )}

            {showPicker && (
                <DateTimePicker
                    mode='date'
                    display='spinner'
                    value={date || new Date()}
                    onChange={onChange}
                />
            )}
        </View>
    )
}

export default CalendarPicker

const styles = StyleSheet.create({})
