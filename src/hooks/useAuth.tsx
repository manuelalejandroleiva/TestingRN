import { useSQLiteContext } from "expo-sqlite"
import { AuthPayload } from "../interfaces /UserInterface";
import { drizzle } from "drizzle-orm/expo-sqlite"

import { navigates } from "@/RootNavigation";
import { useToast } from "react-native-toast-notifications";
import { colorpallet } from "../components/color/color";
import FontAwesome from "react-native-vector-icons/FontAwesome";


export const useAuth = () => { 

    const toast = useToast()
   
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
    const showToast = (msg: string, type: string) => {
        toast.show(msg, {
            placement: "bottom",
            type: type,
            duration: 3000,
            successColor: colorpallet.green,
            //@ts-ignore
            successIcon: <FontAwesome name="check" size={18} color={"white"} />,
        });
    };
    
    
    return { handleAuth,showToast }; 
}


