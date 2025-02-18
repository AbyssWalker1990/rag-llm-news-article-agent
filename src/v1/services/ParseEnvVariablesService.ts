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

    const kafka = {
      broker: getOrFail(env, 'KAFKA_BROKER'),
      username: getOrFail(env, 'KAFKA_USERNAME'),
      password: getOrFail(env, 'KAFKA_PASSWORD'),
    }

    const openai = {
      apiKey: getOrFail(env, 'OPENAI_API_KEY'),
    }

    const pinecone = {
      apiKey: getOrFail(env, 'PINECONE_API_KEY'),
      index: getOrFail(env, 'PINECONE_INDEX'),
    }

    return {
      app,
      kafka,
      openai,
      pinecone,
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
