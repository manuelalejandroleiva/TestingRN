import { useCallback, useEffect, useState } from "react";
import ListService from "@/src/services/List.service";
import { AccountInterface } from "../interfaces /AccountInterface";
import { useAuth } from "./useAuth";
import { Alert } from "react-native";
import { convertToISO, convertToSpanishDate } from "@/lib/Output";

export const useUSer = () => {
  const [listAccounts, setListAccounts] = useState<any[]>([]);
  const [visibleAccount,setVisibleAccounts]=useState<any[]>([])
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
  
  
  const filtrarFecha = (fechaSeleccionada: Date | string) => {
    if (!fechaSeleccionada) {
        // Si no hay fecha, mostramos la lista completa
        setVisibleAccounts([...listAccounts]); 
        return;
    }

    const selectedDateObj = new Date(fechaSeleccionada);
    const targetYear = selectedDateObj.getFullYear();
    const targetMonth = selectedDateObj.getMonth();
    const targetDay = selectedDateObj.getDate();

    // 3. Filtrar sobre la lista ORIGINAL completa
    const filtered = listAccounts.filter(item => {
        const itemDate = new Date(item.createdAt);

        // La lógica de comparación es correcta (&&)
        return (
            itemDate.getFullYear() === targetYear &&
            itemDate.getMonth() === targetMonth &&
            itemDate.getDate() === targetDay
        );
    });

    // 4. Actualizar la lista visible
    setVisibleAccounts(filtered);
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
    visibleAccount,
    addbankAccount,
    deletebankAccount,
    load,filtrarFecha
  };
};


