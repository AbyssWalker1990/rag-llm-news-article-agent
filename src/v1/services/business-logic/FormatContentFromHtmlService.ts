import FormatContentFromHtmlServiceException from '../../exceptions/inner/FormatContentFromHtmlServiceException'
import ExtractedFromAgentAnswerMetadataType from '../../types/ExtractedFromAgentAnswerMetadataType'
import CreateCompletionService from './CreateCompletionService'
import { ChatCompletion } from 'openai/resources'

/**
 * @throws inner/FormatContentFromHtmlServiceException
 */
class FormatContentFromHtmlService {
  constructor(private readonly createCompletionService = new CreateCompletionService()) {}

  public async handle(
    scrapedData: string,
  ): Promise<{ answer: string; extractedMetadata: ExtractedFromAgentAnswerMetadataType }> {
    try {
      const devMessage = `Extract and format human readable information about article from this raw data from scraped HTML provided by user
                          and add json in the end of your answer. Structure: { "title": "find title in additional info", "date": "find publication date in additional info and format to YYYY-MM-DD" }`
      const completionChoice = await this.createCompletionService.handle(scrapedData, devMessage)
      const extractedJson = this.extractJsonFromText(completionChoice.message.content!)

      return { answer: completionChoice.message.content!, extractedMetadata: extractedJson }
    } catch (e) {
      throw new FormatContentFromHtmlServiceException(e)
    }
  }

  private extractJsonFromText(text: string): any {
    const jsonRegex = /```json\n([\s\S]*?)\n```/
    const match = text.match(jsonRegex)
    if (match && match[1]) {
      try {
        return JSON.parse(match[1])
      } catch (error) {
        console.error('Failed to parse JSON:', error)
        return null
      }
    }
    return null
  }
}

export default FormatContentFromHtmlService
