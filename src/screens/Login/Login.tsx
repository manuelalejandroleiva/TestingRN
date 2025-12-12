import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useState } from 'react'
import tw from '../../../lib/tailwind';
import TextInput from '../../components/TextInput/TextInput';
import { colorpallet } from '../../components/color/color';
import { useFieldControl } from '../../../lib/Forms';
import { Icon } from 'react-native-elements';
import { CustomButton as Button } from '../../components/Button/Button'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '@/src/hooks/useAuth';

const Login = () => {

  const [isSecureEntry, setIsSecureEntry] = useState(true);
  const { handleAuth } = useAuth();

  const userData = {
    email: useFieldControl<string>("admin", []),
    password: useFieldControl<string>("admin", []),
    error: useFieldControl<boolean>(false, [])
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={[tw`flex-1 items-center justify-center bg-white`]}
        keyboardShouldPersistTaps="handled"
      >
        <View style={[tw`flex items-center justify-center`]}>
          <Image
            source={require('@/assets/img/logo.jpg')}
            style={tw`w-[150px] h-[150px]`}
          />
        </View>

        <View style={[tw`w-[350px] items-center justify-center`]}>

          <TextInput
            type='email'
            style={[tw`border-2 rounded w-full mb-4 px-2 py-3`]}
            placeholder="Usuario"
            placeholderTextColor={colorpallet.primary}
            value={userData.email.value}
            onChangeText={userData.email.handleInputValue}
          />

          <TextInput
            type='email'
            style={[tw`border-2 rounded w-full mb-4 px-2 py-3`]}
            placeholder="Contraseña"
            placeholderTextColor={colorpallet.primary}
            secureTextEntry={isSecureEntry}
            value={userData.password.value}
            onChangeText={userData.password.handleInputValue}
            rightIcon={
              <TouchableOpacity>
                <Icon
                  name={isSecureEntry ? "lock" : "eye"}
                  size={20}
                  type="font-awesome"
                  color={colorpallet.primary}
                  onPress={() => setIsSecureEntry(prev => !prev)}
                />
              </TouchableOpacity>
            }
          />

          <Button
            text="Iniciar sesión"
            color={colorpallet.primary}
            style={tw`w-full h-12`}
            onPress={() => handleAuth(userData.email.value, userData.password.value)}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({});
