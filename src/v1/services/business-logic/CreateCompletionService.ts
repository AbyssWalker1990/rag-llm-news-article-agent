import { ChatCompletion } from 'openai/resources/chat/completions'
import CreateOpenAIClientService from './CreateOpenAIClientService'

/**
 * @throws inner/EnvVariableNotFoundException
 */
class CreateCompletionService {
  constructor(private readonly createOpenAIClientService = new CreateOpenAIClientService()) {}

  public async handle(userMessage: string, devMessage: string): Promise<ChatCompletion.Choice> {
    const client = await this.createOpenAIClientService.handle()

    const completion = await client.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'user',
          content: userMessage,
        },
        {
          role: 'developer',
          content: devMessage,
        },
      ],
    })

    return completion.choices[0]
  }
}

export default CreateCompletionService
