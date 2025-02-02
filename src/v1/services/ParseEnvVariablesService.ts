import EnvVariableNotFoundException from '../exceptions/inner/EnvVariableNotFoundException'
import AppEnvType from '../types/AppEnvType'

class ParseEnvVariablesService {
  /**
   * @throws inner/EnvVariableNotFoundException
   */
  public handle(env: NodeJS.ProcessEnv): AppEnvType {
    const { getOrFail } = this

    const app = {
      port: Number(getOrFail(env, 'API_INSIDE_PORT')),
    }

    return {
      app,
    }
  }

  /**
   * @throws inner/EnvVariableNotFoundException
   */
  private getOrFail(env: NodeJS.ProcessEnv, name: string): string {
    const value = env[name]
    if (value === undefined) {
      throw new EnvVariableNotFoundException()
    }

    return value
  }
}

export default ParseEnvVariablesService
