import { AxiosResponse } from "axios";
import ApiService from "./api";
import { MoneyInterface } from "../interfaces /UserInterface";

class MonederoService {
  //Fetch all items from the list
  async fetchMoneda(): Promise<AxiosResponse<any>> {
    try {
        const response = await ApiService.api.get('/Moneda');
        return response;
    } catch (error) {
         //@ts-ignore
         throw new Error(error.message)

        
    }
  }

  async addcantiadadMonedero(cantidad:MoneyInterface): Promise<AxiosResponse<any>> {
    try {
        const response = await ApiService.api.post('/Moneda', {cantidad});
        return response;
    } catch (error) {
         //@ts-ignore
         throw new Error(error.message)
    }
}

async deletecantiadadMonedero(id:string|number): Promise<AxiosResponse<any>> {
    try {
        const response = await ApiService.api.delete(`/Moneda/${id}`);
        return response;
    } catch (error) {
         //@ts-ignore
         throw new Error(error.message)
    }
}
}
const singleton = new MonederoService();
export default singleton;
