# RAG/LLM News Article Agent

## Getting Started

To start the project using Docker:

1. Create a `.env` file with the following content:

```env
API_INSIDE_PORT=3000
API_OUTSIDE_PORT=3001
USER_NAME=1000
UID=1000

KAFKA_BROKER=
KAFKA_USERNAME=
KAFKA_PASSWORD=

OPENAI_API_KEY=

PINECONE_API_KEY=
PINECONE_INDEX=
```

2. Run the following command:

```sh
docker compose up
```

## Live demo:

POST https://rag-llm-news-article-agent.onrender.com/api/v1/agent

!!! Your free instance will spin down with inactivity, which can delay requests by 50 seconds or more. !!!
