import { AxiosError } from "axios";
import { httpClient } from "../../services/http/httpClient";

type LoginProps = {
  cpf: string;
  password: string;
  device: {
    osName: string;
    osVersion: string;
    modelName: string
    androidId: string;
  }
}

type LoginResponse = {
  success: boolean;
  data: unknown;
}

class LoginService {
  private readonly loginPath = "/auth/user";

  async login({ cpf, password, device }: LoginProps) : Promise<LoginResponse> {
    try {
      const { data, status } = await httpClient.post(this.loginPath, {
        cpf,
        password,
        deviceInfo: device
      });
      const success = status == 201;

      return {
        success,
        data
      }
    }catch(error){
      const { response } = error as AxiosError;
      
      console.error({
        response: response?.data
      });
      
      const responseContent = response?.data as any

      const messageFormatted = responseContent.message as string[]

      return {
        success: false,
        data: messageFormatted ?? null
      }
    }
  }
}

export default new LoginService();