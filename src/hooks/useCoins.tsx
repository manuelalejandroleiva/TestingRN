import { useCallback, useEffect, useState } from "react"
import MonederoService from '@/src/services/Monedero.service'

export const useCoins = (id:number) => {

    const [monedero,setMonedero]=useState<any[]>([])

    const fetchMonedero = useCallback(async () => {
        try {
          const { data } = await MonederoService.fetchMoneda();
      
          if (!Array.isArray(data)) {
            console.warn("fetchMoneda did not return an array");
            return;
          }
      
          const filtered = data.filter((item: any) => item.cuenta_bancaria === id);
      
          setMonedero(filtered);
        } catch (error) {
          console.error("Error fetching coins:", error);
        }
      }, [id]);

    useEffect(() => {
        fetchMonedero();
    }, [fetchMonedero]);    
    return {
        monedero,
        fetchMonedero
    }
}