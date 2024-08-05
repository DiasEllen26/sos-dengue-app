import axios from "axios";

export default function setupApiClient(){
  const api = axios.create({
    baseURL: 'http://localhost:3000'
  });
  
  return api;
}