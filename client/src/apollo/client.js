import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri:
    process.env.NODE_ENV === "development"
      ? process.env.REACT_APP_DEV_BACKEND_ENDPOINT
      : process.env.REACT_APP_PROD_BACKEND_ENDPOINT,
  cache: new InMemoryCache(),
});

export default client;
