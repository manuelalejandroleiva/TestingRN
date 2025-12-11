import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import tw from '../../../lib/tailwind';
import TextInput from '../../components/TextInput/TextInput';
import { colorpallet } from '../../components/color/color';
import { useFieldControl } from '../../../lib/Forms';
import { Icon } from 'react-native-elements';
import { CustomButton as Button } from '../../components/Button/Button'
import { SafeAreaView } from 'react-native-safe-area-context';

const Login = () => {

  const [isSecureEntry, setIsSecureEntry] = useState(true);
  const userData = {
    email: useFieldControl<string>("eduardos", []),
    password: useFieldControl<string>("12345678", []),
    error: useFieldControl<boolean>(false, [])
  };
  return (
    <SafeAreaView
  style={[tw`flex-1 items-center justify-center bg-white`]} // flex-1 fills screen
>
    <View style={[tw`flex items-center justify-center `]}>
          <Image source={require('@/assets/img/logo.jpg')} style={tw`w-[150px] h-[150px]`} />
        </View>
  <View style={[tw`w-[350px] items-center justify-center`]}>
    <TextInput
      style={[tw`border-2 rounded w-full mb-4 px-2 py-3`]}
      placeholder="Usuario"
      placeholderTextColor={colorpallet.primary}
      value={userData.email.value}
      onChangeText={(s) => userData.email.handleInputValue(s)}
    />

    <TextInput
      style={[tw`border-2 rounded w-full mb-4 px-2 py-3`]}
      placeholder="Contraseña"
      placeholderTextColor={colorpallet.primary}
      rightIcon={<TouchableOpacity>
        <Icon
          name={isSecureEntry ? "lock" : "eye"}
          size={20}
          type="font-awesome"
          color={colorpallet.primary}
          onPress={() => setIsSecureEntry((prev) => !prev)} />
      </TouchableOpacity>}
      secureTextEntry={isSecureEntry}
      value={userData.password.value}
      onChangeText={(s) => userData.password.handleInputValue(s)}
    />

    <Button
      text="Iniciar sesión"
      color={colorpallet.primary}
      style={tw`w-full h-12`}
      onPress={() => {
        // login logic
      }}
    />
  </View>
</SafeAreaView>

  )
}

export default Login

const styles = StyleSheet.create({})