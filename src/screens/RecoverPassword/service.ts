import { AxiosError } from "axios";
import { httpClient } from "../../services/http/httpClient";

type RecoverPasswordProps = {
  email: string;
}

type RecoverPasswordResponse = {
  success: boolean;
  data: unknown;
}

class RecoverPasswordService {
  private readonly recoverPasswordPath = "/auth/user/recover-password";

  async recoverPassword({ email }: RecoverPasswordProps) : Promise<RecoverPasswordResponse> {
    try {
      const { data, status } = await httpClient.post(this.recoverPasswordPath, {
        email
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
      
      return {
        success: false,
        data: null
      }
    }
  }
}

export default new RecoverPasswordService();