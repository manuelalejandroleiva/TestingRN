import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Svg, { Path, Circle, G } from "react-native-svg";

 interface Props{
    color:string
 }

const Cross = ( {color} :Props) => {
    return (
        <Svg width="26" height="24" viewBox="0 0 26 24" fill="none" >
            <Path d="M19 6L6.52003 18" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <Path d="M6.52003 6L19 18" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </Svg>
    )
}

export default Cross

const styles = StyleSheet.create({})
