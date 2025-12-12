
import { ActivityIndicator, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { use, useCallback, useEffect, useMemo, useState } from 'react'
import { InfinityScroll } from '@/src/components/InfinityScroll'
import Cards from '@/src/components/Cards/Cards'
import LayoutHeader from '@/src/Layout/LayoutHeader'
import { navigates } from '@/RootNavigation'
import { tw } from '@/lib'
import Plus from '@/src/Icons/Plus'
import { useUSer } from '@/src/hooks/useUser'
import { colorpallet } from '@/src/components/color/color'
import { Modals } from '@/src/components/Modal'
import RNDateTimePicker from '@react-native-community/datetimepicker'
import { useFieldControl } from '@/lib/Forms'
import TextInput from '@/src/components/TextInput/TextInput'
import { CustomButton as Button } from '../../components/Button/Button'
import { CustomDropdown as Dropdown, DropDownItem } from '@/src/components/DropDown/Dropdown'
import Cross from '@/src/Icons/Cross'
import { useAppSelector } from '@/src/store/hooks /hooks'
import { RootState } from '@/src/store/store'



const Home = () => {

    const {listAccounts,addbankAccount,deletebankAccount,load,visibleAccount,filtrarFecha}=useUSer()
     const {instance} = useAppSelector((state: RootState) => state.InstanceSlice);
     
    
    const [visibility,setVisibility]=useState<boolean>(false)
    
    const [dataDropDown,setDataDropDown]=useState([
        {label:'Insumos',value:'insumos'},
        {label:'Inversiones',value:'Inversiones'},
        {label:'Gastos',value:'Gastos'},
    ])

    const [moneda,setMoneda]=useState([
        {label:'BSD',value:'bsd'},
        {label:'USD',value:'usd'},
        {label:'CAD',value:'cad'},

    ])

    const dataToShow = useMemo(() => {
        return visibleAccount.length > 0 ? visibleAccount : listAccounts;
      }, [visibleAccount, listAccounts]);

    
  
    const [dateValue, setDateValue] = useState(new Date().toISOString());
    
    const data={
        fecha:useFieldControl<string>(dateValue, []),
        nombre: useFieldControl<string>("", []),
        cuenta_type: useFieldControl<string>("", []),
        moneda:useFieldControl<string>("",[])
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
        item.tipo_cuenta.includes("Gastos")?colorpallet.white:colorpallet.orange;    
      
        return (
            <>
          <View style={tw`flex w-full px-4 mb-4`}>
                <Cards
                    type={'Source'}
                    color={color_cuenta}
                    route={() => navigates('Monedero', { id: item.id })}
                >
                    {/* Contenedor interno: fila con texto a la izquierda y cruz a la derecha */}
                    <View style={tw`flex-row w-full items-center justify-between`}>
                    
                    {/* Columna de información */}
                    <View style={tw`flex   flex-col items-center px-8`}>
                        <Text style={tw`text-black font-bold`}>Fecha: {formatted}</Text>
                        <Text style={tw`text-black font-bold`}>Nombre: {item.nombre ?? item.name}</Text>
                        <Text style={tw`text-black font-bold`}>Tipo de cuenta: {item.tipo_cuenta ?? item.tipoCuenta}</Text>
                        <Text style={tw`text-black font-bold`}> Moneda: {item.moneda}</Text>
                    </View>

                    {/* Icono Cross al final */}
                    <TouchableOpacity
                        onPress={()=>deletebankAccount(item.id)}
                    >
                        <Cross color="black" />
                    </TouchableOpacity>

                    </View>
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

                    {!load ? (
            <InfinityScroll 
                style={tw`mt-4`}
                Component={UserList}
                data={dataToShow} 
            />
            ) : (
            <View style={tw`flex-1 items-center justify-center`}>
                <ActivityIndicator size="large" color={colorpallet.primary} style={tw`mt-10`} />
            </View>
            )}

              
              
              
              <Modals heigt='200' stateappear={visibility}>
                      <View style={tw`flex-1 w-full justify-between pt-4`}>
                          <View style={tw`flex flex-row w-full justify-around  `}>


                              <View style={tw`flex w-full  items-center flex-row justify-between`}>


                                  <View style={tw`flex items-start justify-start`}>
                                      <Text style={tw`font-bold uppercase `}>Registro de Cuentas Bancarias</Text>
                                  </View>
                                  <View style={tw`flex w-[100px]`}></View>
                                  <TouchableOpacity style={tw`flex items-center justify-end `} onPress={changeVisibilit}>
                                      <Cross color="black" />

                                  </TouchableOpacity>





                              </View>

                          </View>
                          <ScrollView

                              contentContainerStyle={tw`w-full items-center justify-between pt-4 pb-20`}
                              showsVerticalScrollIndicator={false}
                          >
                              <View style={tw`flex w-full  items-center justify-between px-4`}>


                                  <View style={tw`flex   w-full  my-4`}>
                                      


                                      <View style={tw`flex w-full mb-4`}>
                                          <TextInput
                                              label='Nombre de la cuenta'
                                              type='email'
                                              style={[tw`border-2 rounded w-full mb-4 px-2 py-3`]}

                                              placeholderTextColor={colorpallet.primary}
                                              value={data.nombre.value}
                                              onChangeText={(s) => data.nombre.handleInputValue(s)} />
                                      </View>


                                      <View style={tw`flex w-full mb-4`}>
                                          <Dropdown data={dataDropDown}
                                              widthbottom={Platform.OS=='ios'?350:315}
                                              label="Tipo de cuenta"
                                              onSelect={(item: DropDownItem) => {
                                                  return data.cuenta_type.handleInputValue(item.value)
                                              } } />
                                      </View>
                                      <View style={tw`flex w-full mb-4`}>
                                          <Dropdown data={moneda}
                                              widthbottom={Platform.OS=='ios'?350:315}
                                              label="Moneda de la Cuenta bancaria"
                                              onSelect={(item: DropDownItem) => {
                                                  return data.moneda.handleInputValue(item.value)
                                              } } />
                                      </View>


                                      <Button
                                          text="Registrar Cuenta"
                                          color={colorpallet.primary}
                                          style={tw`w-full h-12`}
                                          onPress={() => {
                                              addbankAccount({
                                                  createdAt: new Date(),
                                                  nombre: data.nombre.value,
                                                  tipoCuenta: data.cuenta_type.value,
                                                  moneda:data.moneda.value.toUpperCase()
                                              })
                                              changeVisibilit()
                                          } } />
                                  </View>



                              </View>
                          </ScrollView>






                      </View>

                  </Modals></>

                                        

    
  )
}

export default Home

const styles = StyleSheet.create({})