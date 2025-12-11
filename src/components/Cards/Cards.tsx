import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { ReactNode } from 'react'
import { tw } from '@/lib'
import { colorpallet } from '../color/color'
import { navigates } from '@/RootNavigation'


interface Props {
    image?: ReactNode,
    name?: string,
    type: 'Image' | 'Source',
    children?: ReactNode,
    route?:string,
    width?:number,
    height?:number

}

const Cards = ({ image, name, type, children,route,width=150,height=150 }: Props) => {

    const PostLinks = () => {
        navigates(route as string)
    }
    return (
        <TouchableOpacity style={tw`flex w-[${width}px] h-[${height}px] bg-white rounded-lg  border-black shadow-lg`} onPress={PostLinks}>
            {/* Your content here */}
            {type === 'Image' ? <View style={tw`flex-1 w-[140px] items-center justify-center`}>
                {image && image}
                <Text style={tw`font-bold text-[${colorpallet.primary}]`} >{name}</Text>



            </View> : children}
        </TouchableOpacity>

    )
}

export default Cards

const styles = StyleSheet.create({})