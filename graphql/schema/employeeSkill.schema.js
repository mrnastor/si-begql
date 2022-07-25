const { makeExecutableSchema } = require('@graphql-tools/schema');

let employeeSkillSchema = makeExecutableSchema({
  typeDefs: /* GraphQL */ `
    type EmployeeSkill {
      _id: ID
      employeeId: String,
      metadataId: String,
      rate: Int,
      yearsExperience: Int
      name: String
      description: String
      skillId: String
    }
    input EmployeeSkillInput{
      employeeId: String!,
      metadataId: String!,
      rate: Int!,
      yearsExperience: Int!
    }
    type Query {
      employeeSkills:[EmployeeSkill]
      skillsPerEmployee(employeeId:String!):[EmployeeSkill]
      skillById(employeeSkillId: String!): EmployeeSkill
    }
    type Mutation{
      addEmployeeSkills(
        employeeId: String!,
        skillId: String!,
        rate: Int!,
        yearsExperience: Int!
      ):EmployeeSkill
    }
  `
})

module.exports = makeExecutableSchema({
  typeDefs: employeeSkillSchema,
})