const { makeExecutableSchema } = require('@graphql-tools/schema');

let employeeSchema = makeExecutableSchema({
  typeDefs: /* GraphQL */ `
    type Employee {
      _id: ID!
      firstName: String!
      lastName: String!
      email: String!
      password: String!
      capabilityId:String!
      createdAt: String!
      manager: ManagerPerEmployee!
      capability: capabilityPerEmployee!
      primarySkill:Skill
      secondarySkill:Skill
      skills:[Skill]
    }
    type Skill{
      _id:ID
      name:String
      rate:Int
      yearsExperience: Int
      description:String
      skillId: String!
    }
    type ManagerPerEmployee {
      _id: ID!
      firstName: String!
      lastName: String!
      email: String!
    }
    type capabilityPerEmployee{
      _id: ID!
      name: String!
      description: String!
    }
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