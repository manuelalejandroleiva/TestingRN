import { useCallback, useEffect, useState } from "react"
import MonederoService from '@/src/services/Monedero.service'
import { MoneyInterface } from "../interfaces /UserInterface";
import { useAuth } from "./useAuth";
import { Alert } from "react-native";

export const useCoins = (id:number) => {

    const [monedero,setMonedero]=useState<any[]>([])
    const [flag, setFlag] = useState<boolean>(false);
    const {showToast}=useAuth();
    const [load,setLoad]=useState<boolean>(false);


    //Visualizar las monedas en el monedero
    const fetchMonedero = useCallback(async () => {
        try {
          const { data } = await MonederoService.fetchMoneda();
      
          if (!Array.isArray(data)) {
            console.warn("fetchMoneda did not return an array");
            return;
          }
      
          const filtered = data.filter((item: any) => item.cantidad.cuenta_bancaria === id ||
           item.cuenta_bancaria === id);
          setMonedero(filtered);
        } catch (error) {
          console.error("Error fetching coins:", error);
        }
      }, [id]);




      //Adicionar una nueva cantiad a el monedero
      const addMoney=async (cantidad:MoneyInterface)=>{ 

        try {
            await MonederoService.addcantiadadMonedero(cantidad);
            fetchMonedero();
        } catch (error) {
            console.error("Error adding money:", error);
        }
      }


      const deletebankAccount = async (id: number | string) => {
        try {
            Alert.alert(
                "Eliminar cuenta",
                "¿Estás seguro de que deseas eliminar esta cuenta bancaria?",
                [
                  {
                    text: "Cancelar",
                    style: "cancel",
                  },
                  {
                    text: "Sí, eliminar",
                    style: "destructive",
                    onPress: async () => {
                      // Aquí va la eliminación real
                      try {
                        setLoad(true);
                        await MonederoService.deletecantiadadMonedero(id);
                        showToast("Cuenta eliminada correctamente", "success");
                        fetchMonedero()
                      } catch (error) {
                        console.error("Error deleting account:", error);
                        showToast("Error al eliminar la cuenta", "error");
                      }
                    },
                  },
                ],
                { cancelable: true }
              );
         
        } catch (error) {
          console.error("Error deleting account:", error);
        }
      };

    useEffect(() => {
        fetchMonedero();
    }, [fetchMonedero]);    
    return {
        monedero,
        fetchMonedero,
        addMoney,
        deletebankAccount
    }
}