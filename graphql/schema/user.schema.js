const { makeExecutableSchema } = require('@graphql-tools/schema');
const UserResolver = require( "../resolvers/user.resolver"); 

let userSchema = makeExecutableSchema({
  typeDefs: /* GraphQL */ `
    type User {
      _id: ID!
      firstName: String!
      lastName: String!
      email: String!
      password: String!
      createdAt: String!
    }
    input UserInput{
      firstName: String!
      lastName: String!
      email: String!
      password: String!
    }
    type Query {
      users:[User!]
      userByFristName(firstName: String!):User!
    }
    type Mutation {
      addUser(user:UserInput): User
    }
  `
})

module.exports = makeExecutableSchema({
  typeDefs:userSchema,
})