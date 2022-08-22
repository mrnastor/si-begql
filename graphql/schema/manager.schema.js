const { makeExecutableSchema } = require('@graphql-tools/schema');
const { allTypes } = require('./master.schema');

let managerSchema = makeExecutableSchema({
  typeDefs: /* GraphQL */ `
    ${allTypes}
    type Manager {
      _id: ID!
      firstName: String!
      lastName: String!
      email: String!
      password: String!
      createdAt: String!
      userId:String!
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
      deleteManager(id:String):DeleteMessage
    }
  `
})

module.exports = makeExecutableSchema({
  typeDefs: managerSchema,
})