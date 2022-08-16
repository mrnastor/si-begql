const { makeExecutableSchema } = require('@graphql-tools/schema');
const { allTypes } = require('./master.schema');
let employeeSkillSchema = makeExecutableSchema({
  typeDefs: /* GraphQL */ `
    ${allTypes}
    type EmployeeSkill {
      _id: String
      employeeId: String
      skill: Metadata
      rate: Int,
      yearsExperience: Int
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
    type DeleteMessage {
      message:String!
      success: Boolean
    }
    type Mutation{
      addEmployeeSkills(
        employeeId: String!,
        skillId: String!,
        rate: Int!,
        yearsExperience: Int!
      ):EmployeeSkill
      deleteEmployeeSkill (id: String!) : DeleteMessage
    }
  `
})

module.exports = makeExecutableSchema({
  typeDefs: employeeSkillSchema,
})