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
    type AllManagerStatType {
        count: Int
        noEmployee: Int
      }
    type SpecificManagerStatType {
      employeeCount: Int
      industryCount: Int
      capabilityCount: Int
      skillCount: Int      
      }
    type Query {
      managers:[Manager!]
      managerById(id: String!):Manager!
      allManagerStat: AllManagerStatType!
      specificManagerStat(id:String!): SpecificManagerStatType!
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