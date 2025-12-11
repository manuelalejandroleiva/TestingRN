import axios, { AxiosInstance } from "axios";


import { navigates } from "@/RootNavigation";





const baseURL = process.env.API_URL_LOGIN 


class ApiService {
  api: AxiosInstance;
  
  constructor() {

    this.api = axios.create({
      baseURL: baseURL,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        
      },
    });
    
  }

  //Check if the email can be used for register

}

const singleton = new ApiService();
export default singleton;

