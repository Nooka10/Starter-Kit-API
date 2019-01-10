const merge = require('lodash/merge');
const path = require('path');
const { fileLoader, mergeTypes } = require('merge-graphql-schemas');

const Users = require('./resolvers/users.resolvers');
const Movies = require('./resolvers/movies.resolvers');
const TokenValidationEmail = require('./resolvers/tokens.resolvers');


const resolvers = merge(
  Users,
  Movies,
  TokenValidationEmail
);

const typesArray = fileLoader(path.join(__dirname, './schemas'));
const schema = mergeTypes(typesArray, { all: true });

module.exports = {
  resolvers,
  schema
};
