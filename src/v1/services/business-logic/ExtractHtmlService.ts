import assert from 'assert'
import CreateAxiosClientService from './CreateAxiosClientService'

class ExtractHtmlService {
  constructor(private readonly createAxiosInstanceService = new CreateAxiosClientService()) {}

  public async handle(url: string): Promise<string> {
    try {
      const client = this.createAxiosInstanceService.handle()

      const { data, status } = await client.get(url)

      assert(data != null && status < 399)

      return data
    } catch (e) {
      return ''
    }
  }
}

export default ExtractHtmlService
