import CreateKafkaConsumerService from './CreateKafkaConsumerService'

/**
 * @throws inner/EnvVariableNotFoundException
 */
class GetKafkaMessagesService {
  constructor(private readonly createKafkaConsumerService = new CreateKafkaConsumerService()) {}

  public async handle(groupIdPrefix: string, topicName: string): Promise<string[]> {
    const kafkaConsumer = await this.createKafkaConsumerService.handle(groupIdPrefix)

    await kafkaConsumer.connect()
    await kafkaConsumer.subscribe({ topic: topicName, fromBeginning: true })

    const kafkaMessages: string[] = []
    let messageReceived = false

    const runConsumer = async () => {
      await kafkaConsumer.run({
        eachMessage: async ({ message }) => {
          if (message.value) {
            kafkaMessages.push(JSON.parse(message.value?.toString()).value.url)
          }
          messageReceived = true
        },
      })
    }

    await runConsumer()

    const waitForMessages = async (timeout: number) => {
      return new Promise<void>((resolve) => {
        const interval = setInterval(() => {
          if (!messageReceived) {
            clearInterval(interval)
            resolve()
          } else {
            messageReceived = false
          }
        }, timeout)
      })
    }

    await waitForMessages(2500)

    await kafkaConsumer.disconnect()

    return kafkaMessages
  }
}

export default GetKafkaMessagesService
