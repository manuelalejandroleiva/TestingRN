import React, { lazy, useEffect, useRef, useState } from "react";
import {
  View,
  Platform,
  Pressable,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
  ScrollView,
  ActivityIndicator,
  Keyboard,
} from "react-native";
import { useDeviceContext } from "twrnc";
import Icon from "react-native-vector-icons/FontAwesome";
import { tw } from "@/lib";
import { Input, InputProps } from "react-native-elements";
import { Text } from "react-native";
import { colorpallet } from "../color/color";

export interface DropDownItem {
  label: string;
  value: string;
  image?: string;
  metaInfo?: any;
}

export const CustomDropdown = (
  props: InputProps & {
    lazy?: boolean;
    loading?: boolean;
    border?: boolean,
    correct?: boolean,
    save?:boolean

    widthbottom: number,
    data?: DropDownItem[];
    onSelect?: (input: DropDownItem, metaInfo?: any) => void;
  }
) => {
  useDeviceContext(tw);

  const menu = useRef<any>(null);
  const icon = useRef<any>(null);
  const input = useRef<any>(null);

  const { data } = props;

  const [filtering, setFiltering] = useState<boolean>(true);
  const [state, setState] = useState({ isFocused: false, onEdit: false });
  const [value, setValue] = useState({ value: props.value || "" });
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [dataOptions, setDataOptions] = useState<DropDownItem[] | undefined>();
  const [selectedItem, setSelectedItem] = useState<DropDownItem | undefined>(undefined);
  const [itemSelected, setItemSelected] = useState(false); // Track if item is selected

  useEffect(() => {
    setValue({
      value:
        data?.find((e) => e.value == props.value)?.label || props.value || "",
    });
  }, [props.value]);

  const focus = () => {
    setState({ isFocused: true, onEdit: false });
    input.current?.focus();
  };

  const blur = () => {
    setState({ isFocused: false, onEdit: false });
    input.current?.blur();
  };

  const onEditValue = () => setState({ ...state, onEdit: true });

  const onUpdateValue = (input: string) => {
    setValue({ value: input });
    if (props.onChangeText) {
      props.onChangeText(input);
    }
  };

  const keyHandled = (e: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
    switch (e.nativeEvent.key) {
      case "ArrowDown":
        setSelectedIndex(Math.min(selectedIndex + 1, dataOptions!.length - 1));
        e.preventDefault();
        break;
      case "ArrowUp":
        setSelectedIndex(Math.max(selectedIndex - 1, 0));
        e.preventDefault();
        break;
      case "Enter":
        if (selectedIndex > -1) {
          const item = dataOptions![selectedIndex];
          onUpdateValue(item.label);
          setSelectedItem(item);
          if (props.onSelect) {
            props.onSelect({
              label: item.label,
              value: item.value,
              image: item.image
            }, item.metaInfo);
          }
          blur();
        }
        setSelectedIndex(-1);
        break;
      default:
        setSelectedIndex(-1);
        break;
    }
  };

  const loadDataOptions = () => {
    setFiltering(true);
    if (state.onEdit) {
      const info = data?.filter((e: DropDownItem) => {
        return e.label.includes(value.value);
      });
      setDataOptions(info);
    } else {
      setDataOptions(data);
    }
    setFiltering(false);
  };

  useEffect(() => {
    loadDataOptions();
  }, [value.value, state.onEdit, data]);

  const itemRenderer = ({
    item,
    onSelect,
  }: {
    item: DropDownItem;
    onSelect: (item: DropDownItem) => void;
  }) => {
    if (props.loading) {
      return (
        <View style={tw`my-4`}>
          <ActivityIndicator size="large" />
        </View>
      );
    } else {
      return (
        <Pressable
          key={item.value}
          style={tw.style("py-2", "px-2", "border-b-2")}
          onTouchEndCapture={() => {
            setItemSelected(true); // Track item selection

            setState({ isFocused: false, onEdit: false });
            setValue({ value: item.label });
            setSelectedItem(item); // Set the selected item immediately

            if (props.onSelect) props.onSelect({ label: item.label, value: item.value, image: item.image }, item.metaInfo);
            blur()
            Keyboard.dismiss();
          }}
          focusable={false}
        >
          <Text>{item.label}</Text>
        </Pressable>
      );

    }

  };

  // Refactored onBlur handler
  const onBlur = (e: any) => {
    // Prevent the dropdown from closing if an item was selected
    if (itemSelected) {
      setItemSelected(false); // Reset item selection state
      return;
    }

    // Otherwise, close the dropdown if focus was lost
    let noBlur = false;

    if (menu.current && menu.current._children) {
      menu.current._children.forEach((i: any) => {
        if (i == e.relatedTarget) noBlur = true;
      });
      noBlur = noBlur || e.relatedTarget == icon.current;

    } else {
      setItemSelected(false); // Reset item selection state

      setState({ isFocused: false, onEdit: false });
      return;

    }



  };

  const showInsideContent = () => {

    if (props.loading) {
      return (
        <View style={tw`my-4`}>
          <ActivityIndicator size="large" />
        </View>
      );
    }

    if (data != undefined) {


      if (data.length > 0) {
        return data.map((item: DropDownItem) =>
          itemRenderer({
            item,
            onSelect: (input) => {
              setValue({ value: input.label });
              setSelectedItem(input);
              if (props.onSelect) props.onSelect({ label: item.label, value: item.value, image: item.image }, input.metaInfo);
              blur();
            },
          })
        );
      } else {
        return <Text>Ninguna opcion encontrada</Text>;
      }
    }

  };

  return (
    <Pressable style={[tw`w-full`, { zIndex: 4 }]} focusable={false} ref={icon}>
      <Input
        ref={input}
        {...{ ...props, style: null }}
        value={value.value}
        rightIcon={
          //@ts-ignore
          <Icon
            name={state.isFocused ? "chevron-up" : "chevron-down"}
            //@ts-ignore
            type="font-awesome"
            color="#9CA3AF"
            onPress={state.isFocused ? blur : focus}
          />
        }
        labelStyle={tw`font-normal text-input-label text-gray-500`}
        inputContainerStyle={[
          tw.style(
            "w-full",
            "h-input",
            "border",


            "px-2",
            "bg-white",
            state.isFocused ? "rounded-b-0" : ""
          ),
          props.style,
        ]}
        inputStyle={Platform.select({
          web: {
            outline: "none",
            fontFamily: "Roboto_400Regular",
            fontSize: 14,
          },
        })}
        containerStyle={tw`h-[88px] px-2`}
        onFocus={focus}
        onBlur={onBlur} // Updated onBlur handler
        onChangeText={onUpdateValue}
        onChange={onEditValue}
        onKeyPress={keyHandled}
      />

      {!props.border && <View style={tw`${state.isFocused ? `flex-1` : `hidden`} px-2 z-50`}>
        <View style={tw`relative w-[${props.widthbottom}px] ${props.save ? `px-4`:``}`}>
          <ScrollView
            ref={menu}
            scrollToOverflowEnabled
            nestedScrollEnabled
            style={tw.style([
              `bg-[${colorpallet.white}]`,
              state.isFocused ? "relative max-h-[250px]" : "hidden",
              `w-[${props.widthbottom}px]`,

              "border",

              props.correct ? "-top-9" : "top-[-4]",
            ])} 
          >
            {showInsideContent()}
          </ScrollView>
        </View>
      </View>}
    </Pressable>
  );
};
