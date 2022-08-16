const { makeExecutableSchema } = require('@graphql-tools/schema');
const {allTypes} = require('./master.schema');

let employeeSchema = makeExecutableSchema({
  typeDefs: /* GraphQL */ `
    ${allTypes}
    input EmployeeInput{
      firstName: String!
      lastName: String!
      email: String!
      password: String!
      managerId:String!
      capabilityId:String!
    }
    input PrimarySkillInput{
      employeeId: String!
      skillId: String!
    }
    type ApiFeedback{
      status: Boolean!
      description: String!
    }
    type Query {
      elist:[Employee]
      employees:[Employee!]
      employeeById(employeeId: String!):Employee!
      employeesPerManager(mangerId: String!):[Employee!]
      setPrimarySkill(employeeId: String, skillId: String):ApiFeedback!
      setSecondarySkill(employeeId: String, skillId: String):ApiFeedback!
    }
    type Mutation {
      addEmployee(employee:EmployeeInput): Employee
      tempSignUp(
        firstName: String!
        lastName: String!
        email: String!
        password: String!
      ): Employee
    }
  `
})

module.exports = makeExecutableSchema({
  typeDefs: employeeSchema,
})