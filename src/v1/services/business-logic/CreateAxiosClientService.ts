import axios from 'axios'
import { AxiosInstance } from 'axios'

class CreateAxiosClientService {
  public handle(): AxiosInstance {
    const axiosInstance = axios.create()

    return axiosInstance
  }
}

export default CreateAxiosClientService
