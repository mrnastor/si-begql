const UserResolver = require('./user.resolver')
const MetadataResolver = require('./metadata.resolver')

module.exports = {
    ...UserResolver,
    ...MetadataResolver
}