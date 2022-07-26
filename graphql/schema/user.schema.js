const { makeExecutableSchema } = require('@graphql-tools/schema');

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
    type AuthPayload {
      token: String
      user: User
    }
    type Mutation {
      addUser(user:UserInput): User
      signup(email: String!, password: String!, name: String!): AuthPayload
      login(email: String!, password: String!): AuthPayload
    }
  `
})

module.exports = makeExecutableSchema({
  typeDefs: userSchema,
})