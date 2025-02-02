import { Consumer, Kafka } from 'kafkajs'
import ParseEnvVariablesService from '../ParseEnvVariablesService'

/**
 * @throws inner/EnvVariableNotFoundException
 */
class CreateKafkaConsumerService {
  constructor(private readonly parseEnvVariablesService = new ParseEnvVariablesService()) {}

  public async handle(groupIdPrefix: string): Promise<Consumer> {
    const {
      kafka: { broker, username, password },
    } = this.parseEnvVariablesService.handle(process.env)
    const kafka = new Kafka({
      clientId: 'test-task-consume',
      brokers: [broker],
      ssl: true,
      sasl: {
        mechanism: 'plain',
        username,
        password,
      },
    })

    const uniqueGroupId = `${groupIdPrefix}${Date.now()}`

    return kafka.consumer({ groupId: uniqueGroupId })
  }
}

export default CreateKafkaConsumerService
