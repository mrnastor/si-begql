const { makeExecutableSchema } = require('@graphql-tools/schema');

let managerSchema = makeExecutableSchema({
  typeDefs: /* GraphQL */ `
    type Manager {
      _id: ID!
      firstName: String!
      lastName: String!
      email: String!
      password: String!
      createdAt: String!
    }
    input ManagerInput{
      firstName: String!
      lastName: String!
      email: String!
      password: String!
    }
    type Query {
      managers:[Manager!]
      managerById(id: String!):Manager!
    }
    type Mutation {
      addManager(manager:ManagerInput): Manager
    }
  `
})

module.exports = makeExecutableSchema({
  typeDefs:managerSchema,
})