const { employeeById } = require("../resolvers/employee.resolver");

const EmployeeType = `
"""
Employee
"""
        type Employee {
            _id: ID!
            firstName: String!
            lastName: String!
            email: String!
            password: String!
            capabilityId:String
            createdAt: String!
            manager: Manager!
            capability: Metadata
            primarySkill:Metadata
            secondarySkill:Metadata
            skills:[EmployeeSkill]
            userId:String!
        }
    `;

const MetadataType = `
"""
Metadata
"""
        type Metadata {
            _id: ID!
            name: String!
            type: String!
            description: String!
            createdAt: String!
        }
    `;

const ManagerType = `
"""
Manager
"""
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
"""
EmployeeSkill
"""
        type EmployeeSkill {
            _id: String
            employeeId: String
            skill: Metadata
            rate: Int,
            yearsExperience: Int
        }
  `;

const DeleteMessage = `
"""
Delete Message template to show user if request is success or not.
"""
  type DeleteMessage {
      success: Boolean
      message: String
  }
`

const PaginatedListInput = `
    "The page number user wants to view. Starts with 0 as first page."
    page: Int
    "Number of items showed per page. Will be used to calculate totalPages."
    itemsPerPage: Int
    "Search keyword for all attributes."
    searchKeyword: String
    "Field/s of the table to search in."
    filterFields: [String]
`

const AdvancedListInput = `
"""
Input Object to filter, search, and paginate the list
"""
    input AdvancedListInput {
        ${PaginatedListInput}
        "specific type of metadata"
        type: String!
    }
`;

const AdvancedEmployeeListInput = `
"""
Input Object to filter, search, and paginate the list
"""
    input AdvancedEmployeeListInput {
        ${PaginatedListInput}
        "Manager to filter the with the request"
        managerId: String
        "List of Capabilities to filter with the request"
        capabilities: [String]
        "List of Skills to filter with the request"
        skills: [String]
        "List of PrimarySkill to filter with the request"
        primarySkills: [String]
        "List of SecondarySkill to filter with the request"
        secondarySkills: [String]
        "Rate of skill you want to filter. Works only if 'Skills' is populated"
        skillRate: Int
        "Year Experience of skill you want to filter. Works only if 'Skills' is populated"
        skillYearExperience: Int
    }
`;

const AdvancedList = `
        "Current Page"
        currentPage: Int
        "Total Pages computed by total items divided by itemsPerPage"
        totalPages: Int
        "Total items returned according to the filter"
        totalItems: Int
`;

const AdvancedMetadataList = `
"""
Metadata object list that provides the filtered, searched, and paginated list.
"""
    type AdvancedMetadataList {
        ${AdvancedList}
        " Paginated list shows the list i items according to the currentPage and itemsPerPage "
        paginatedList: [Metadata]
    }
`;

const AdvancedEmployeeList = `
"""
Employee object list that provides the filtered, searched, and paginated list.
"""
    type AdvancedEmployeeList {
        ${AdvancedList}
        " Paginated list shows the list of items according to the currentPage and itemsPerPage "
        paginatedList: [Employee]
    }
`;

const AdvancedManagerList = `
"""
Manager object list that provides the filtered, searched, and paginated list.
"""
    type AdvancedManagerList {
        ${AdvancedList}
        " Paginated list shows the list of items according to the currentPage and itemsPerPage "
        paginatedList: [Manager]
    }
`;

module.exports = {
    EmployeeType: EmployeeType,
    MetadataType: MetadataType,
    ManagerType: ManagerType,
    EmployeeSkillType: EmployeeSkillType,
    DeleteMessage: DeleteMessage,
    AdvancedListInput: AdvancedListInput,
    AdvancedEmployeeList: AdvancedEmployeeList,
    AdvancedManagerList: AdvancedManagerList,
    AdvancedMetadataList: AdvancedMetadataList,
    AdvancedEmployeeListInput: AdvancedEmployeeListInput,
    allTypes: ''.concat(
        MetadataType,
        ManagerType,
        EmployeeType,
        EmployeeSkillType,
        DeleteMessage,
        AdvancedListInput,
        AdvancedEmployeeList,
        AdvancedManagerList,
        AdvancedEmployeeListInput,
        AdvancedEmployeeList,
        AdvancedMetadataList
    )
}