import { useSQLiteContext } from "expo-sqlite"
import { AuthPayload } from "../interfaces /UserInterface";
import { drizzle } from "drizzle-orm/expo-sqlite"
import *  as schema from '@/db/schema'
import { navigates } from "@/RootNavigation";


export const useAuth = () => { 


    const db = useSQLiteContext()
    const dri = drizzle(db, { schema })
    const handleAuth = async (username: string, password: string) => {
        const authpayload: AuthPayload = {
            email:username,
            password
        };
        const username_check="admin";
        const password_check="admin";
        if(authpayload.email===username_check &&
             authpayload.password===password_check){
            navigates('Home');
        }else{
            alert('Credenciales incorrectas');
        }
    
        
    };    
    
    
    return { handleAuth }; 
}


