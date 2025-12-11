import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import tw from '../../lib/tailwind';
import Login from '../screens/Login/Login';
import Home from '../screens/Home/Home';
import { colorpallet } from '../components/color/color';
import { Avatar } from 'react-native-elements';
import { useAppDispatch, useAppSelector } from '../store/hooks /hooks';
import { RootState } from '../store/store';
import { setRoute } from '../store/Route.store';
import Monedero from '../screens/Monedero/Monedero';


const Route = () => {
    const Drawer = createDrawerNavigator();

    const dispatch = useAppDispatch()
    const data = useAppSelector((state: RootState) => state.RouteSlice);
    const listRoute=['Login'];


    //Function to set the current route on the store and manage the back navigation
    const handleSetRoute = (name: string) => {

        if (!data.routes.length) {
            dispatch(
                setRoute({ routes: [name], name_route: name }));
        } else {
            dispatch(
                setRoute({ routes: [...data.routes, name], name_route: name }));
        }
    };

    const CustomDrawerContent = (props: any) => {
        return (
            <DrawerContentScrollView {...props}>
                <View style={tw`flex flex-row w-full items-center justify-between mt-8`}>
                <Avatar
                    size={20}
                    rounded
                    containerStyle={[tw`w-[114px] h-[114px] pb-4 `, { zIndex: 15 }]}
                    source={require('@/assets/img/logo_removed.png')}
                    avatarStyle={{ resizeMode: 'contain',tintColor: colorpallet.white,
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                   }}
                />
    
                    <View style={tw`flex  items-center justify-around `}>
                        <Text style={tw` text-white text-lg uppercase mx-1 `}>Testing</Text>
                        
                    </View>
    
    
    
    
    
                </View>
    
                <DrawerItemList {...props} />
    
                
    
    
    
    
    
            </DrawerContentScrollView>
        );
    };


    
  return (
    <Drawer.Navigator id="main-drawer"
        screenOptions={{
        drawerStyle: { backgroundColor: colorpallet.blue_orange, width: 250,zIndex:9999  },
      }}
      drawerContent={(props) => {
        // props.state.index te dice qué screen está activo
        const activeRoute = props.state.routeNames[props.state.index];
        return !listRoute.includes(activeRoute) ? <CustomDrawerContent {...props} /> : null;
      }}>
      <Drawer.Screen name="Login" component={Login} options={{
            headerShown: false,
           
            drawerItemStyle: { display: 'none' },
            swipeEnabled: true,
        }} />



        <Drawer.Screen
            name="Home"
            component={Home}
            listeners={{
                focus: () => handleSetRoute('Home'),
            }}
            options={{
                headerShown: false,
                drawerLabelStyle: {
                    color: 'white'
                },
                drawerItemStyle: { marginVertical: 8 },
                
                swipeEnabled: true


            }}
        />
         <Drawer.Screen
            name="Monedero"
            component={Monedero}
            listeners={{
                focus: () => handleSetRoute('Monedero'),
            }}
            options={{
                headerShown: false,
                drawerLabelStyle: {
                    color: 'white'
                },
                drawerItemStyle: { marginVertical: 8 },
                
                swipeEnabled: true


            }}
        />

        
    </Drawer.Navigator>
    
  )
}

export default Route