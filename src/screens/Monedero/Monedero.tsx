import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { use } from 'react'
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

const Monedero = () => {
    const params=useRoute()
    const {id}=params.params as {id:string}
    const {handlegoBack}=useGoBack()
    const {monedero}=useCoins(+id)


    const MoneyList=({item}:any)=>{ 
        const formatted = item.createdAt
            ? new Date(item.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
                })
            : "No date";


        const color_cuenta=item.tipo.includes("tipo 1")?
                    colorpallet.blue:
                    item.tipo.includes("tipo 2")?
                    colorpallet.orange:
                    item.tipo.includes("tipo 3")?colorpallet.white:colorpallet.gray;    
        return (
            <View style={tw`flex w-full px-4 mb-4 items-center justify-between`}>
                <Cards type={'Source'} color={color_cuenta}  >
                    <Text style={tw`text-black font-bold`}>Fecha:{formatted}</Text>
                    <Text style={tw`text-black font-bold`}>Depositado:{item.cantidad} USD</Text>
                    
                </Cards>
        </View>
        )
    }
    
  return (
    <><LayoutHeader

          text="Monedero de la cuenta"

          leftIcon={<TouchableOpacity onPress={handlegoBack} style={tw`flex flex-row items-center justify-between pt-4`}>
          <ArrowBack color='#D9D9D9' 
           />
      </TouchableOpacity>}
            rightIcon={<TouchableOpacity style={tw`flex items-center justify-end mt-4`} 
            onPress={() => navigates('Notificaciones')}>            
    <Plus color='white' />
</TouchableOpacity>} />

          <InfinityScroll
          style={tw`mt-4`}
              Component={MoneyList}
              data={monedero} />
              
              
              
              
              </>
          
  )
}

export default Monedero

const styles = StyleSheet.create({})