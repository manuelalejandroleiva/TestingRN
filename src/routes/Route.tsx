import { View, Text } from 'react-native'
import React from 'react'
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import tw from '../../lib/tailwind';
import Login from '../screens/Login/Login';

const Route = () => {
    const Drawer = createDrawerNavigator();
    const CustomDrawerContent = (props: any) => {
        return (
            <DrawerContentScrollView {...props}>
                <View style={tw`flex flex-row w-full items-center justify-between mt-8`}>
                   
    
                    <View style={tw`flex  items-center justify-around `}>
                        <Text style={tw` text-white text-lg uppercase mx-1 `}>grupo</Text>
                        <Text style={tw`font-bold text-white text-xl uppercase mx-1 `}>Camacho Fire</Text>
                    </View>
    
    
    
    
    
                </View>
    
                <DrawerItemList {...props} />
    
                <View style={tw`flex flex-row w-full items-center justify-between mt-8`}>
                    
    
                    <View style={tw`flex  items-center justify-start `}>
    
                        <Text style={tw`font-bold text-white text-lg uppercase mx-1 `}>Nombre Apellido</Text>
                    </View>
    
    
    
    
    
                </View>
    
    
    
    
    
            </DrawerContentScrollView>
        );
    };
  return (
    <Drawer.Navigator id="main-drawer" drawerContent={(props: any) => <CustomDrawerContent {...props} />} >
      <Drawer.Screen name="Login" component={Login} options={{
            headerShown: false,
            drawerLabel: () => null, // Oculta el ítem en el drawer
            drawerItemStyle: { display: 'none' },
            swipeEnabled: false,


        }} />
    </Drawer.Navigator>
    
  )
}

export default Route