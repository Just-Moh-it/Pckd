const path = require("path");
const { loadFilesSync } = require("@graphql-tools/load-files");
const { mergeTypeDefs, mergeResolvers } = require("@graphql-tools/merge");
const { makeExecutableSchema } = require('@graphql-tools/schema');

const typeDefs = loadFilesSync(path.join(__dirname, "/api/**/*.graphql"));
const resolvers = loadFilesSync(path.join(__dirname, "/api/**/*.js"));

const schemaWithResolvers = makeExecutableSchema({
  typeDefs: mergeTypeDefs(typeDefs),
  resolvers: mergeResolvers(resolvers),
});

module.exports = schemaWithResolvers;
