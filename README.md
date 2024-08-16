## ChainIndexChat

ChainIndexChat is a natural language to SQL chat interface for Cardano. There are two major components of the system, the chat application, and an on chain JWT authentication scheme.

ChainIndexChat is a chat application that enables you to query the blockchain using natural language. The frontend is backed by a custom koios instance, open source LLMs, db-sync, and cardano-node. The prototype maps SQL from simple questions like, What network am I on? To more complex questions like, how many transactions were processed by a script within a timeframe? For the hackathon, the SQL is reported directly in the chat, although a data explorer interface Is coming soon.