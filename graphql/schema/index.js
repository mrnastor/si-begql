const { buildSchema } = require("graphql");
const {stitchSchemas} = require('@graphql-tools/stitch');

const UserSchema = require('./user.schema');
const MetadataSchema = require('./metadata.schema');
const ManagerSchema = require('./manager.schema');
const IndustryExperienceSchema = require('./industryExperience.schema');
const EmployeeSkillSchema = require('./employeeSkill.schema');
const EmployeeSchema = require('./employee.schema');

const gatewaySchema =  stitchSchemas({
  subschemas: [
    UserSchema,
    MetadataSchema,
    ManagerSchema,
    IndustryExperienceSchema,
    EmployeeSkillSchema,
    EmployeeSchema,
  ]
});

module.exports = gatewaySchema;


// module.exports = buildSchema(`
//   type User {
//     _id: ID!
//     firstName: String!
//     lastName: String!
//     email: String!
//     password: String!
//     createdAt: String!
//   }
//   input UserInput{
//     firstName: String!
//     lastName: String!
//     email: String!
//     password: String!
//   }
//   type Query {
//     users:[User!]
//     userByFristName(firstName: String!):User!
//   }
//   type Mutation {
//     addUser(user:UserInput): User
//   }
//   schema {
//     query: Query
//     mutation: Mutation
//   }
// `)