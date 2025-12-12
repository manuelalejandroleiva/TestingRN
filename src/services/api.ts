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

    //Interceptor to handle responses globally and if 401 redirect to login
    this.api.interceptors.response.use(
        (res) => {
          return res;
        },
        async (err) => {
          const originalConfig = err.config;
          if (err.response) {          
            if (err.response.status == 401 && !originalConfig._retry) {
              originalConfig._retry = true;
              
              navigates('Login');
  
            }
  
          }
  
          return Promise.reject(err);
        }
      );
  
    
  }

  //Check if the email can be used for register

}

const singleton = new ApiService();
export default singleton;

