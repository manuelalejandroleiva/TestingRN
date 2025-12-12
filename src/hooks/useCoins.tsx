import { useCallback, useEffect, useState } from "react"
import MonederoService from '@/src/services/Monedero.service'
import { MoneyInterface } from "../interfaces /UserInterface";

export const useCoins = (id:number) => {

    const [monedero,setMonedero]=useState<any[]>([])
    const [flag, setFlag] = useState<boolean>(false);


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

    useEffect(() => {
        fetchMonedero();
    }, [fetchMonedero]);    
    return {
        monedero,
        fetchMonedero,
        addMoney
    }
}