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
    input MetadataInput{
      name: String!
      type: String!
      description: String!
    }
    type Query {
      metadata:[Metadata!]
      metadataByName(name: String!):Metadata!
    }
    type Mutation {
      addMetadata(metadata:MetadataInput): Metadata
    }
  `
})

module.exports = makeExecutableSchema({
  typeDefs:metadatachema,
})