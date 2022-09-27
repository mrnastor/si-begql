const { makeExecutableSchema } = require('@graphql-tools/schema');
const { allTypes } = require('./master.schema');

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
      employeesPerManager(managerId: String!):[Employee!]
      setPrimarySkill(employeeId: String, skillId: String):ApiFeedback!
      setSecondarySkill(employeeId: String, skillId: String):ApiFeedback!
      employeeByUserId(id:String!):Employee!
      employeeList(options:AdvancedEmployeeListInput!) : AdvancedEmployeeList!
    }
    type Mutation {
      updateEmployee(
        firstName:String!
        # user:User!
        # employee:Employee!
      ):DeleteMessage
      addEmployee(
        firstName: String!
        lastName: String!
        email: String!
        password: String!
        managerId:String!
        capabilityId:String,
        primarySkillId:String,
        secondarySkillId:String,
        ): Employee
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