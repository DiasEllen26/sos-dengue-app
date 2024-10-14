import axios from "axios";

export default function setupApiClient(){
  const api = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_URL
  });
  
  return api;
}