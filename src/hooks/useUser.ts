import { useCallback, useEffect, useState } from "react";
import ListService from "@/src/services/List.service";
import { AccountInterface } from "../interfaces /AccountInterface";
import { useAuth } from "./useAuth";
import { Alert } from "react-native";

export const useUSer = () => {
  const [listAccounts, setListAccounts] = useState<any[]>([]);
  const [load,setLoad]=useState<boolean>(false);
  const [flag, setFlag] = useState<boolean>(false);
  const { showToast } = useAuth();

  const addbankAccount = async (data: AccountInterface) => {
    try {
        setLoad(true)
      const response = await ListService.PostAccount(data);
      showToast("Cuenta agregada correctamente", "success");
      setFlag(!flag);
      setLoad(false)
    } catch (error) {
      console.error("Error posting account:", error);
    }
  };

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
                    const response = await ListService.deleteAccount(id);
                    showToast("Cuenta eliminada correctamente", "success");
                    setFlag((prev) => !prev); // actualizar estado
                    setLoad(false);
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

  const fetchAccount = useCallback(async () => {
    try {
    setLoad(true);
      const response = await ListService.fetchList();
      setListAccounts(response.data);
      setLoad(false);
    } catch (error) {
      console.error("Error fetching accounts:", error);
    }
  }, [flag]);

  useEffect(() => {
    fetchAccount();
  }, [fetchAccount]);

  return {
    listAccounts,
    fetchAccount,
    flag,
    addbankAccount,
    deletebankAccount,
    load
  };
};


