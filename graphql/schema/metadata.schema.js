const { makeExecutableSchema } = require('@graphql-tools/schema');

let metadatachema = makeExecutableSchema({
  typeDefs: /* GraphQL */ `
    type Metadata {
      _id: ID!
      name: String!
      type: String!
      description: String!
      createdAt: String!
    }
    input MetadataInput {
      name: String!
      type: String!
      description: String!
    }
    type Query {
      metadatas:[Metadata!]
      metadataByType(type: String!):[Metadata!]
      capabilityById(id:String!):Metadata!
    }
    type DeleteMessage {
      message:String!
      success: Boolean
    }
    type Mutation {
      addMetadata(metadata:MetadataInput): Metadata
      deleteMetadata(id:String!):DeleteMessage
    }
  `
})

module.exports = makeExecutableSchema({
  typeDefs:metadatachema,
})