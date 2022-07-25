const UserResolver = require('./user.resolver')
const MetadataResolver = require('./metadata.resolver')
const ManagerResolver = require('./manager.resolver')

module.exports = {
    ...UserResolver,
    ...MetadataResolver,
    ...ManagerResolver,
}