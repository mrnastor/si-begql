const { employeeById } = require("../resolvers/employee.resolver");

const EmployeeType = `
        type Employee {
            _id: ID!
            firstName: String!
            lastName: String!
            email: String!
            password: String!
            capabilityId:String!
            createdAt: String!
            manager: Manager!
            capability: Metadata!
            primarySkill:Metadata
            secondarySkill:Metadata
            skills:[EmployeeSkill]
            userId:String!
        }
    `;
const MetadataType = `
        type Metadata {
            _id: ID!
            name: String!
            type: String!
            description: String!
            createdAt: String!
        }
    `;
const ManagerType = `
        type Manager {
            _id: ID!
            firstName: String!
            lastName: String!
            email: String!
            password: String!
            createdAt: String!
            userId:String!
        }
    `;
const EmployeeSkillType = `
        type EmployeeSkill {
            _id: String
            employeeId: String
            skill: Metadata
            rate: Int,
            yearsExperience: Int
        }
  `

const DeleteMessage = `
    type DeleteMessage {
        success: Boolean
        message: String
    }
`
module.exports = {
    EmployeeType: EmployeeType,
    MetadataType: MetadataType,
    ManagerType: ManagerType,
    EmployeeSkillType: EmployeeSkillType,
    DeleteMessage:DeleteMessage,
    allTypes: ''.concat(
        MetadataType,
        ManagerType,
        EmployeeType,
        EmployeeSkillType,
        DeleteMessage,
    )
}