const UserResolver = require('./user.resolver')
const MetadataResolver = require('./metadata.resolver')
const ManagerResolver = require('./manager.resolver')
const IndustryExperience = require('./industryExperience.resolver')
const EmployeeSkill = require('./employeeSkill.resolver')
const Employee = require('./employee.resolver')

module.exports = {
    ...UserResolver,
    ...MetadataResolver,
    ...ManagerResolver,
    ...IndustryExperience,
    ...EmployeeSkill,
    ...Employee,
}