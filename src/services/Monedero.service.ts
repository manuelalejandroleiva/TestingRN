import { AxiosResponse } from "axios";
import ApiService from "./api";

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
}
const singleton = new MonederoService();
export default singleton;
