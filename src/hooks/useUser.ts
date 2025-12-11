import { useCallback, useEffect, useState } from "react";
import ListService from '@/src/services/List.service'
import { AccountInterface } from "../interfaces /AccountInterface";

export const useUSer= () => {
   
    const [listAccounts, setListAccounts] = useState<any[]>([]);

    const [flag,setFlag]=useState<boolean>(false)
    const addbankAccount=async(data:AccountInterface)=>{
        try {
            const response = await ListService.PostAccount(data);
            console.log('Account added successfully:', response.data);
            setFlag(!flag)
        } catch (error) {
            console.error('Error posting account:', error);
            
        }
    }
    const fetchAccount = useCallback(async () => {
        try {
            const response = await ListService.fetchList();
            setListAccounts(response.data);
        } catch (error) {
          console.error('Error fetching accounts:', error);
        }
      }, [flag]);


      useEffect(() => {
        fetchAccount();
    }, [fetchAccount]);


    return {  
        listAccounts,
        fetchAccount,
        flag,
        addbankAccount
    }
}