// Apollo Server imports
const { ApolloServer } = require("apollo-server-express");
const { ApolloServerPluginDrainHttpServer } = require("apollo-server-core");
const express = require("express");
const { getUserId } = require("./utils/auth");
const path = require("path");
const http = require("http");

// Config Imports
require("dotenv").config();

// Apollo Server utils
const schema = require("./schema");
const PORT = process.env.PORT || 4000;

// Database
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Main Function
(async () => {
  // Creating express server for static assets
  const app = express();
  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    schema,
    context: ({ req }) => ({
      request: req,
      prisma,
      getUserId,
    }),
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  // Start the server
  await server.start();
  server.applyMiddleware({ app });

  app.use("/static", express.static("static"));

  // Serve react app
  const rootRouter = express.Router();
  /*
   * all your other routes go here
   */
  const buildPath = path.normalize(
    path.join(__dirname + "../../../client/build")
  );
  app.use(express.static(buildPath));

  rootRouter.get("(/*)?", async (req, res, next) => {
    res.sendFile(path.join(buildPath, "index.html"));
  });
  app.use(rootRouter);

  await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));
  console.log(
    process.env.node_env === "production"
      ? `Server started at <URL>:${PORT}${server.graphqlPath}`
      : `🚀 Server started at http://localhost:${PORT}${server.graphqlPath}`
  );
})();
