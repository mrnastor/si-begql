const { makeExecutableSchema } = require('@graphql-tools/schema');

let industryExperienceSchema = makeExecutableSchema({
  typeDefs: /* GraphQL */ `
    type IndustryExperience {
      _id: ID!
      employeeId: String!,
      metadataId: String!,
      yearsExperience: Int!
    }
    input IndustryExperienceInput{
      employeeId: String!,
      metadataId: String!,
      yearsExperience: Int!
    }
    type Query {
      industryExperiences:[IndustryExperience!]
    }
  `
})

module.exports = makeExecutableSchema({
  typeDefs:industryExperienceSchema,
})