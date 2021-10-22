const { ApolloServer } = require("apollo-server");
const schema = require("./schema");
const { PrismaClient } = require("@prisma/client");
const helpers = require("./helpers");
require("dotenv").config();

const prisma = new PrismaClient();

const PORT = process.env.PORT || 4000;

const server = new ApolloServer({
  schema,
  context: ({ req }) => ({
    ...req,
    prisma,
  }),
});

server.listen(PORT).then(async ({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
