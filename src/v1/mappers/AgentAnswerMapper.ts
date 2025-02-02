import AgentAnswerType from '../types/AgentAnswerType'
import ExtractedFromAgentAnswerMetadataType from '../types/ExtractedFromAgentAnswerMetadataType'
import PineconeMetadataType from '../types/PineconeMetadataType'

class AgentAnswerMapper {
  public map({ answer, metadata }: { answer: string; metadata: PineconeMetadataType }): AgentAnswerType {
    return {
      answer,
      sources: [
        {
          title: metadata.title || '',
          url: metadata.link || '',
          date: metadata.date || '',
        },
      ],
    }
  }
}

export default AgentAnswerMapper
