import { tw } from "@/lib";
import React, { ReactNode, useEffect, useRef, useState } from "react";

import {
  View,
  Platform,
  NativeSyntheticEvent,
  Pressable,

  TextInputChangeEventData,
  Text,
} from "react-native";
import { Input, InputProps } from "react-native-elements";
import { useDeviceContext } from "twrnc";
import { colorpallet } from "../color/color";




const TextInput = (
  props: InputProps & {
    padding?: boolean;
    clearable?: boolean;
    multiline?:boolean
    scrollenable?:boolean
    clear?: () => void;
    type?: "email" | "number" | "letters" | "lettersdots" | "extension" | "user" | "date";
    align?: "center";
    enableError?: boolean;
    isFocus?: boolean;
  }) => {

  useDeviceContext(tw);
  const [state, setState] = useState<{
    isFocused: null | boolean;
    wasActive: boolean;
  }>({
    isFocused: null,
    wasActive: false,
  });

  const focus = (e: any) => {
    if (props.onFocus)
      //@ts-ignore
      props.onFocus(e);
    setState({ ...state, isFocused: true });
  };
  const blur = (e: any) => {
    if (props.onBlur)
      //@ts-ignore
      props.onBlur(e);
    setState({ isFocused: false, wasActive: true });
  };

  const showError = state.wasActive || props.enableError;

  const icon = useRef<any>(null);
  const inputRef = useRef<HTMLInputElement | undefined>(null);

  const [innerValue, setInnerValue] = useState(props.value);

  const { maxLength, isFocus = false } = props;
  useEffect(() => {
    setInnerValue(props.value);
    if (maxLength != undefined && props.value != undefined) {
      setWords(maxLength - props.value.length);
    }
  }, [props.value]);

  useEffect(() => {
    if (isFocus) {
      inputRef.current?.focus();
    } else {
      inputRef.current?.blur();
    }
  }, [isFocus]);

  if (icon.current && icon.current.children?.length > 0) {
    icon.current.children[0].setAttribute("tabindex", "-1");
  }
  const onClear = () => {
    //@ts-ignore
    (props.clear && props.clear()) ||
      (props.onChangeText && props.onChangeText(""));

    inputRef.current?.focus();
  };

  const onChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    let _value = e.nativeEvent.text;
    let _e = e;
    switch (props.type) {
      case "email":
        _value = _value.toLowerCase();
        //_value=[..._value].filter((e)=>e.match(regEmail)).join("").toLowerCase()
        break;
      case "number":
        _value = [..._value].filter((e) => e.match(/\d/)).join("");
        break;
      case "letters":
        _value = [..._value].filter((e) => e.match(/[a-zA-Z\s]/)).join("");
        break;
      case "extension":
        _value = [..._value]
          .filter((e) => e.match(/\d/))
          .join("")
          .slice(0, 4);
        break;
      case "date":
        _value = [..._value].filter((e) => e.match(/^(0[1-9]|1[0-2])\/(0[1-9]|[12]\w|3[01])\/\w{4}$/)).join("")
        break;

      default:
        break;
    }
    setInnerValue(_value);
    props.onChange &&
      props.onChange({
        ...e,
        nativeEvent: { ...e.nativeEvent, text: _value.toLowerCase() },
      });
  };

  const onChangeText = (e: string) => {
    let _value = e;
    const lines = _value.split('\n');
    switch (props.type) {
      case "email":
        _value = _value.toLowerCase();
        break;
      case "number":
        _value = [..._value].filter((e) => e.match(/\d/)).join("");
        const numericValue = parseFloat(_value !== '' ? _value : "0");
        _value = numericValue > 1000 ? numericValue.toLocaleString("en", {
          currency: "USD"
        }) : numericValue.toString()
        break;
      case "letters":

        _value = [..._value].filter((e) => e.match(/[a-zA-Z\s]/)).join("");
        break;
      case "extension":
        _value = [..._value]
          .filter((e) => e.match(/\d/))
          .join("")
          .slice(0, 4);
        break;
      case "date":
        _value = [..._value].filter((e) => e.match(/^(0[1-9]|1[012])(\/)(\d{2})$/)).join("")
        break;

      default:
        break;
    }
    
      setInnerValue(_value);
      props.onChangeText && props.onChangeText(_value);
    
    
  };

  const appendIcon = (
    <View ref={icon} focusable={false}>
      {props.rightIcon && (
        <Pressable onPress={onClear} focusable={false}>
          
          {props.rightIcon as any}
        </Pressable>
      )}
    </View>
  );

  const [words, setWords] = useState(0);
  return (
    <View style={tw`flex relative `}>
      <Text style={tw`text-[${colorpallet.gray}]   px-5 bottom-1`}>{props.label}</Text>

      <Input
        {...{
          ...props,
          style: null,
          label: undefined,
          errorMessage: undefined,
        }}
        value={innerValue}
        multiline={props.multiline}
        
        //@ts-ignore
        ref={inputRef}
        autoCompleteType={undefined}
        containerStyle={tw`w-full px-0 h-auto  `}
        errorStyle={tw`m-0 p-0`}
        inputContainerStyle={[
          (props.type !== 'user' && props.type !== 'email') ? tw.style(
            "w-full",
            // "h-input",
            "border",
            "border-gray-300",
            "rounded-3",
            "h-[54px]",
            "px-2",
            "bg-[#F3F6F9]",
            "border-b-4",
            

          ) : tw.style(
            "w-full",
            // "h-input",
           "border",
            "rounded-lg",
            "px-2",
            "border-[#F3F6F9]",
            "border-b-4",
            


          ),
          {
            backgroundColor: props.disabled
              ? '#A1A1A9'
              : '#F3F6F9',
          },
          props.style,
        ]}


        inputStyle={[
          Platform.select({
            web: {
              outline: "none",

              fontSize: 14,
            },
          }),
          tw`overflow-hidden`,
          props.inputStyle,
        ]}
        rightIcon={appendIcon}
        onFocus={focus}
        onBlur={blur}
        onChange={onChange}
        onChangeText={onChangeText}
        autoComplete="off"
        clearButtonMode="never"
        inputMode="text"
      />
     

    </View>
  )
}

export default TextInput