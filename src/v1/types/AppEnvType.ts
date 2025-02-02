type AppEnvType = {
  app: {
    port: number
  }

  kafka: {
    broker: string
    username: string
    password: string
  }

  openai: {
    apiKey: string
  }

  pinecone: {
    apiKey: string
    index: string
  }
}

export default AppEnvType
