import { StyleSheet, Text, View, Modal, SafeAreaView } from 'react-native'
import React, { ReactNode, useState } from 'react'
import { tw } from '@/lib'
import { colorpallet } from '../color/color'


interface Props {

    stateappear: boolean
    title?: string
    heigt: string,
    margin?: string
    children: ReactNode
}
export const Modals = ({ heigt, children, stateappear, margin, title }: Props) => {

    //    tw`flex w-[${width}px] h-[${heigt}px] items-start w-full  mt-[${margin ? margin :550}px]  justify-around bg-white rounded-lg
    return (
        <Modal
            transparent={true}
            visible={stateappear}
            animationType='slide'
            
        >

            <View style={tw`flex-1 justify-end`}>

                <View style={tw`flex bg-white flex items-center justify-center w-full  h-[${heigt}] px-4 rounded-lg shadow-lg`}>
                    <View style={tw`flex w-full items-start justify-start px-4`}>
                        <Text style={tw`font-bold text-2xl text-[${colorpallet.primary}]`}>{title}</Text>

                    </View>
                    {children}
                </View>



            </View>
        </Modal>
    )
}

export default Modal

const styles = StyleSheet.create({
    modalContainerstyles: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    modalStyle: {
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        width: 'auto',
        height: 250,
        paddingHorizontal: 15,

        borderRadius: 16,


        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        elevation: 5

    }
})