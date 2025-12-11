
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { use, useCallback, useEffect, useState } from 'react'
import { InfinityScroll } from '@/src/components/InfinityScroll'
import { AuthPayload } from '@/src/interfaces /UserInterface'
import { useSQLiteContext } from 'expo-sqlite'
import { drizzle } from 'drizzle-orm/expo-sqlite'
import *  as schema from '@/db/schema'

import Cards from '@/src/components/Cards/Cards'
import LayoutHeader from '@/src/Layout/LayoutHeader'
import { navigates } from '@/RootNavigation'
import { tw } from '@/lib'
import Plus from '@/src/Icons/Plus'
import { useUSer } from '@/src/hooks/useUser'
import { colorpallet } from '@/src/components/color/color'
import { Modals } from '@/src/components/Modal'
import DateTimePicker from '@react-native-community/datetimepicker'
import RNDateTimePicker from '@react-native-community/datetimepicker'
import { useFieldControl } from '@/lib/Forms'
import TextInput from '@/src/components/TextInput/TextInput'
import { CustomButton as Button } from '../../components/Button/Button'
import { CustomDropdown as Dropdown, DropDownItem } from '@/src/components/DropDown/Dropdown'
import { AccountInterface } from '@/src/interfaces /AccountInterface'


const Home = () => {

    const {listAccounts,addbankAccount}=useUSer()
    
    const [visibility,setVisibility]=useState<boolean>(false)
    const [dataDropDown,setDataDropDown]=useState([
        {label:'Insumos',value:'insumos'},
        {label:'Inversiones',value:'Inversiones'},
        {label:'Gastos',value:'Gastos'},
    ])
  
    const [dateValue, setDateValue] = useState(new Date().toISOString());
    const data={
        fecha:useFieldControl<string>(dateValue, []),
        nombre: useFieldControl<string>("", []),
        cuenta_type: useFieldControl<string>("", []),
    }
    const changeVisibilit=()=>{
        setVisibility(!visibility)
    }

    const UserList=({item}:any)=>{
        const formatted = item.createdAt
            ? new Date(item.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
                })
            : "No date";

        const color_cuenta=item.tipo_cuenta.includes("insumos")?
        colorpallet.blue:
        item.tipo_cuenta.includes("Inversiones")?
        colorpallet.orange:
        item.tipo_cuenta.includes("Gastos")?colorpallet.white:``;    
      
        return (

            <>
          <View style={tw`flex w-full px-4 mb-4 items-center justify-between`}>
                <Cards type={'Source'} color={color_cuenta} route={()=>navigates('Monedero',{
                    id:item.id
                })}  >
                    <Text style={tw`text-black font-bold`}>Fecha:{formatted}</Text>
                    <Text style={tw`text-black font-bold`}>Nombre:{item.nombre?? item.name}</Text>
                    <Text style={tw`text-black font-bold`}>Tipo de cuenta:{item.tipo_cuenta?? item.tipoCuenta}</Text>
                </Cards>
        </View>
            
            </>
        )
       

    }

   
  return (


    <><LayoutHeader
          text='Lista de Cuentas Bancarias'
          rightIcon={<TouchableOpacity style={tw`flex items-center justify-end mt-4`} 
          onPress={()=>changeVisibilit()}>
              <Plus color='white' />
          </TouchableOpacity>} />
          <InfinityScroll 
          style={tw`mt-4`}
          Component={UserList}
           data={listAccounts} />





        <Modals heigt='90' stateappear={visibility}  >
          <View style={tw`flex-1 w-full justify-between pt-4`}>
            <View style={tw`flex flex-row w-full justify-around  `}>


              <View style={tw`flex w-full  items-center flex-row justify-between`}>
                

                <View style={tw`flex items-start justify-start`}>
                  <Text style={tw`font-bold uppercase `}>Registro de Cuentas Bancarias</Text>
                </View>
                <View style={tw`flex w-[100px]`}></View>
               

              </View>

            </View>
            <ScrollView
 
            contentContainerStyle={tw`w-full items-center justify-between pt-4 pb-20`}
            showsVerticalScrollIndicator={false}
            >
            <View style={tw`flex w-full  items-center justify-between px-4`}>


                <View style={tw`flex   w-full  my-4`} >  
                     <View style={tw`flex w-full flex-row items-center justify-between mb-4`}>
                     <Text style={tw`font-bold`}>Selecciona la fecha:</Text>
                    <View style={tw`ml-4`}>     
                            <RNDateTimePicker
                        value={new Date(dateValue)} 
                        onChange={(event, selectedDate) => {
                            if (selectedDate) {
                                const isoDate = selectedDate.toISOString();
                                setDateValue(isoDate); 
                                
                            }
                        }}
                />
                    </View>
                        
                     </View>
               

                   
                    <View style={tw`flex w-full mb-4`}>     
                    <TextInput
                    label='Nombre de la cuenta'
                    type='email'
                    style={[tw`border-2 rounded w-full mb-4 px-2 py-3`]}
                    
                    placeholderTextColor={colorpallet.primary}
                    value={data.nombre.value}
                    onChangeText={(s) => data.nombre.handleInputValue(s)}
                    />
                    </View>


                    <View style={tw`flex w-full mb-4`}>     
                            <Dropdown  data={dataDropDown} 
                                widthbottom={350} 
                              label="Tipo de cuenta" 
                              onSelect={(item: DropDownItem) => {
                                return data.cuenta_type.handleInputValue(item.value);
                              }}
                                     />
                    </View>


                     <Button
                          text="Registrar Cuenta"
                          color={colorpallet.primary}
                          style={tw`w-full h-12`}
                        onPress={() => {
                          addbankAccount({
                            createdAt: new Date(dateValue),
                            nombre: data.nombre.value,
                            tipoCuenta: data.cuenta_type.value,
                          });
                          changeVisibilit();
                        }}
                        />
</View>


                
            </View>
            </ScrollView>
                    





          </View>

        </Modals>

          </>

    
  )
}

export default Home

const styles = StyleSheet.create({})