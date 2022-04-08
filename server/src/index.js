// Apollo Server imports
const { ApolloServer } = require("apollo-server-express");
const { ApolloServerPluginDrainHttpServer } = require("apollo-server-core");
const express = require("express");
const { getUserId } = require("./utils/auth");
const path = require("path");
const http = require("http");
const handleAll = require("./routes/all");

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

  // Trust proxy if behind a reverse proxy
  if(process.env.TRUST_PROXY && process.env.TRUST_PROXY !== "false") {
    app.set('trust proxy', 
      process.env.TRUST_PROXY === "true" ? 
        true /* Convert true as string to boolean */
        : process.env.TRUST_PROXY /* process.env.TRUST_PROXY can also be a list of IPs */
    );
  }

  const server = new ApolloServer({
    schema,
    connectToDevTools: true,
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

  const appRouter = express.Router();
  app.use(express.static("../../client/build"));

  // Redirect from basepath to UI
  appRouter.get("/", (req, res) => res.redirect("/manage"));

  // Handle all manage paths
  appRouter.route(["/manage", "/manage/*"]).get((req, res) => {
    // Send index.html
    // res.render("test", { html: html });
    const buildPath = path.normalize(__dirname + "/../../client/build");
    res.sendFile(path.join(buildPath, "index.html"));
  });

  // app.use(['/manage', '/manage/*'], express.static('../../client/build/'))
  app.use("/manage", express.static(__dirname + "/../../client/build"));

  // Get all routes
  appRouter.get("*", (req, res) => handleAll(req, res, prisma));

  app.use(appRouter);

  await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));
  console.log(
    process.env.node_env === "production"
      ? `Server started at <URL>:${PORT}${server.graphqlPath}`
      : `🚀 Server started at http://localhost:${PORT}${server.graphqlPath}`
  );
})();
