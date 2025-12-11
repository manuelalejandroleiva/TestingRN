import { CheckBox } from "react-native-elements";
import React, { useState } from "react";
import { View } from "react-native";

import { tw } from "@/lib";

interface Props {
  title: string[] | number[];
  subtitle?: string;
  filter?: string;
  getValue?: (value: string | number, index?: number) => void;
}

export const CustomCheckBoxs = ({
  title = [], // Default value for title
  getValue = () => {}, // Default value for getValue
}: Props) => {
  const [selectedOption, setSelectedOption] = useState<string | undefined>();

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    getValue(option);
  };

  return (
    <View style={tw`flex flex-row`}>
      {title.map((options, index) => (
        <CheckBox
          checked={selectedOption === options}
          key={`option-${index}`}
          onPress={() => handleOptionSelect(options.toString())}
          iconType="material-community"
          checkedIcon="radiobox-marked"
          checkedColor="#000000"
          uncheckedIcon="radiobox-blank"
          title={options.toString()}
          containerStyle={{
            paddingHorizontal: 1,
            paddingVertical: 6,
            marginHorizontal: 2,
            marginVertical: 6,
            borderWidth: 0,
            backgroundColor: "transparent",
          }}
          textStyle={{ marginLeft: 1, paddingRight: 1 }} // Ajustar el margen del texto para alinear con el checkbox
        />
      ))}
    </View>
  );
};
