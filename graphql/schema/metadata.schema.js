const { makeExecutableSchema } = require('@graphql-tools/schema');
const { allTypes } = require('./master.schema');

let metadatachema = makeExecutableSchema({
  typeDefs: /* GraphQL */ `
  ${allTypes}
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
      metadataList(options:AdvancedListInput) : AdvancedMetadataList
    }
    type DeleteMessage {
      message:String!
      success: Boolean
    }
    input MetadataUpdateFields {
      name: String
      type: String
      description: String
    }
    type Mutation {
      addMetadata(metadata:MetadataInput): Metadata
      deleteMetadata(id:String!): DeleteMessage
      updateMetadata(id:String!, metadata:MetadataUpdateFields): Metadata
    }
  `
})

module.exports = makeExecutableSchema({
  typeDefs:metadatachema,
})