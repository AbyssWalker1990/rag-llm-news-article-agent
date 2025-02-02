import { RecordMetadata } from '@pinecone-database/pinecone'

type PineconeMetadataType = RecordMetadata & {
  content?: string
  link?: string
  title?: string
  date?: string
}

export default PineconeMetadataType
