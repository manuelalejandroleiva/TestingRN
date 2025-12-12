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
    route?:()=>void,
    color?:string
    height?:number

}

const Cards = ({ image, name, type, children,route,height=150,color }: Props) => {

    const PostLinks = () => {
        route && route()
    }
    return (
        <TouchableOpacity style={tw`flex w-full h-[${height}px] bg-[${color}] rounded-lg  border-black shadow-lg items-center justify-center`} 
        onPress={PostLinks}>
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