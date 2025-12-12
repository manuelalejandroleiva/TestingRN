import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { use, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { InfinityScroll } from '@/src/components/InfinityScroll'
import LayoutHeader from '@/src/Layout/LayoutHeader'
import { tw } from '@/lib'
import Cards from '@/src/components/Cards/Cards'
import ArrowBack from '@/src/Icons/ArrowBack'
import useGoBack from '@/src/hooks/useGoBack'
import { useCoins } from '@/src/hooks/useCoins'
import { colorpallet } from '@/src/components/color/color'
import Plus from '@/src/Icons/Plus'
import { navigates } from '@/RootNavigation'
import { Modals } from '@/src/components/Modal'
import Cross from '@/src/Icons/Cross'
import TextInput from '@/src/components/TextInput/TextInput'
import { useFieldControl } from '@/lib/Forms'
import { CustomButton as Button } from '../../components/Button/Button'
import {  isPositive, required } from '@/lib/Rules'

const Monedero = () => {
    const params=useRoute()
    const {id}=params.params as {id:string}
    const {handlegoBack}=useGoBack()
    const {monedero,addMoney}=useCoins(+id)
    const [visibility,setVisibility]=useState<boolean>(false)
    const [error,setError]=useState<string>('')

    const data={
        cantidad: useFieldControl<string>("", [required, isPositive]),
        

    }
    const changeVisibility=()=>{ 
        setVisibility(!visibility)
    }

    const MoneyList = ({ item }: any) => {
        const formatted = item.createdAt
          ? new Date(item.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })
          : "No date";
      
        const cantidadValue = item.cantidad ? item.cantidad.cantidad : item.cantiad?.cantidad ?? 0;
        const fechaCantidad = item.cantidad
          ? new Date(item.cantidad.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })
          : "No date";
      
        return (
          <View style={tw`flex w-full px-4 mb-4 items-center justify-between`}>
            <Cards type={"Source"} color={colorpallet.orange}>
              <Text style={tw`text-black font-bold`}>Fecha registro: {formatted}</Text>
              <Text style={tw`text-black font-bold`}>Fecha cantidad: {fechaCantidad}</Text>
              <Text style={tw`text-black font-bold`}>Depositado: {cantidadValue} USD</Text>
            </Cards>
          </View>
        );
      };
      
    
  return (
    <><LayoutHeader

          text="Monedero de la cuenta"

          leftIcon={<TouchableOpacity onPress={handlegoBack} style={tw`flex flex-row items-center justify-between pt-4`}>
          <ArrowBack color='#D9D9D9' 
           />
      </TouchableOpacity>}
            rightIcon={<TouchableOpacity style={tw`flex items-center justify-end mt-4`} 
            onPress={changeVisibility}>            
         <Plus color='white' />
        </TouchableOpacity>} />

          <InfinityScroll
          style={tw`mt-4`}
              Component={MoneyList}
              data={monedero} />

<Modals heigt='90' stateappear={visibility}  >
          <View style={tw`flex-1 w-full justify-between pt-4`}>
            <View style={tw`flex flex-row w-full justify-around  `}>


              <View style={tw`flex w-full  items-center flex-row justify-between`}>
                

                <View style={tw`flex items-start justify-start`}>
                  <Text style={tw`font-bold uppercase `}>Registro de Cantidad</Text>
                </View>
                <View style={tw`flex w-[100px]`}></View>
                <TouchableOpacity style={tw`flex items-center justify-end `} onPress={changeVisibility}>
                  <Cross color="black" />

                </TouchableOpacity>

           

               

              </View>

            </View>
            <ScrollView
 
            contentContainerStyle={tw`w-full items-center justify-between pt-4 pb-20`}
            showsVerticalScrollIndicator={false}
            >
            <View style={tw`flex w-full  items-center justify-between px-4`}>


                <View style={tw`flex   w-full  my-4`} >  
                     

                   
                    <View style={tw`flex w-full mb-4`}>     
                    <TextInput
                    label='Ingrese la cantidad a depositar'
                    type='email'
                    style={[tw`border-2 rounded w-full mb-4 px-2 py-3`]}
                    errorMessage={data.cantidad.error}
                    placeholderTextColor={colorpallet.primary}
                    value={data.cantidad.value.toString()}
                    onChangeText={(s) => {
                        // Mantiene solo números
                        const numbersOnly = s.replace(/[^0-9]/g, "");
                      
                        // Actualiza el valor
                        data.cantidad.handleInputValue(numbersOnly);
                      
                        // Validar si lo escrito es válido
                        if (s !== numbersOnly) {
                          setError("Solo se permiten números");
                        } else {
                          setError(""); // limpia error si es válido
                        }
                      }}/>
                    </View>
                        {error ? <Text style={tw`text-red-500 mb-2`}>{error}</Text> : null}
                       

                   

                     <Button
                          text="Registrar Cantidad"
                          color={colorpallet.primary}
                          style={tw`w-full h-12`}
                        onPress={() => {
                            if(data.cantidad.error) return;
                            addMoney({
                            cantidad: +data.cantidad.value,
                            cuenta_bancaria: +id,
                            createdAt: new Date(),
                          });
                          changeVisibility();
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

export default Monedero

const styles = StyleSheet.create({})