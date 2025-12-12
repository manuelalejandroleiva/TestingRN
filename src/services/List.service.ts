import { AxiosResponse } from "axios";
import ApiService from "./api";
import { AccountInterface } from "../interfaces /AccountInterface";

class ListService {
  //Fetch all items from the list
  async fetchList(): Promise<AxiosResponse<any>> {
    try {
        const response = await ApiService.api.get('/accounts');
        return response;
    } catch (error) {
         //@ts-ignore
         throw new Error(error.message)

        
    }
  }

  async PostAccount(data:AccountInterface): Promise<AxiosResponse<any>> {
    try {
        const response = await ApiService.api.post('/accounts',data);
        return response;
    } catch (error) {
         //@ts-ignore
         throw new Error(error.message)
    }
  }
  async deleteAccount(id:number|string): Promise<AxiosResponse<any>> {
    try {
        const response = await ApiService.api.delete(`/accounts/${id}`);
        return response;
    } catch (error) {
         //@ts-ignore
         throw new Error(error.message)
    }
  }
}

const singleton = new ListService();
export default singleton;

