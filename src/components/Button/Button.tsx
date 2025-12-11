import React, { ReactNode } from "react";
import {
  TouchableOpacity,
  View,
  ViewProps,
  TouchableOpacityProps,
  Text,

} from "react-native";

import { useDeviceContext } from "twrnc";

import tw from "@/lib/tailwind";
import { colorpallet } from "../color/color";




export const CustomButton = (
  props: ViewProps &
    TouchableOpacityProps & {
      type?: "outlined" | "button" | "approve" | "reject" | "modal" | 'square' | 'primary';
      disabled?: boolean;
      loading?: boolean;
      color?: string;
      text_color?: string;
      text: string;
      icon?: ReactNode;
    }
) => {
  useDeviceContext(tw);

  const { color = colorpallet.white, text_color = colorpallet.blue } = props;

  let btnStyle;

  let textStyle;

  switch (props.type) {
    case "button":

      btnStyle = [tw`border border-1 bg-[${color}] h-[50px] `, { borderRadius: 0 }];
      textStyle = tw` text-base font-semibold text-white`;

      break;

    case "square":
      btnStyle = tw`border border-[${color}] bg-[${color}] h-[49px] w-full  `;
      textStyle = tw`text-base font-semibold text-white`;
      break;

    case "modal":
      btnStyle = tw`border border-[${color}] bg-[${color}] h-[49px] rounded-none`;
      textStyle = tw`text-base font-semibold text-white`;
      break;

    case "reject":

      btnStyle = tw`border border-[${color}] border-2 bg-[#FFFFFF] h-[43px] rounded-full`;
      textStyle = tw`text-[#000000] text-base`;

      break;
    case "approve":

      btnStyle = tw`border border-[${color}] border-1 bg-[${color}] h-[43px] rounded-full`;
      textStyle = tw` text-base`;

      break;
    case "primary":
      btnStyle = tw`border border-[${color}] border-1 bg-[${color}] h-[43px] `
      textStyle = tw`text-base`;



    default:

    btnStyle = tw`items-center justify-around h-[43px] bg-[${color}] border border-[#1A5E9C]`;



      textStyle = tw`${color === colorpallet.white ? `text-blue-600` : `text-white`} text-lg font-bold`;
      break;
  }

  return (
    <View style={[tw`px-2 w-full`, props.style]}>
      <TouchableOpacity
        {...{ ...props, style: null }}
        style={[
          !props.disabled ? btnStyle : tw` bg-[${colorpallet.white}]  border-[${colorpallet.blue}]  h-[43px] rounded-full`,

          tw`  flex flex-row justify-center items-center`,
        ]}
      >

        <View style={tw`flex w-full flex-row items-center justify-center    `}>
          <View style={tw`flex items-start justify-start  `}>
            {props.icon}
          </View>
          <Text style={textStyle}>{props.text}</Text>



        </View>
      </TouchableOpacity>
    </View>
  );
};
