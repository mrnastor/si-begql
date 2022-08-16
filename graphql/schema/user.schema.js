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
      managerId:String
      employeeId:String
      isAdmin: Boolean
    }
    type DeleteMessage {
      message:String!
      success: Boolean
    }
    input UserUpdateFields {
      firstName: String
      lastName: String
      email: String
    }
    type Mutation {
      addUser(user:UserInput): User
      addAdmin(user:UserInput): User
      signup(email: String!, password: String!, name: String!): AuthPayload
      login(email: String!, password: String!): AuthPayload
      deleteUser(id:String!): DeleteMessage
      updateUser(id:String!, user:UserUpdateFields!): User
    }
  `
})

module.exports = makeExecutableSchema({
  typeDefs: userSchema,
})