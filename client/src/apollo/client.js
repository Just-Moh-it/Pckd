import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";

import { setContext } from "@apollo/client/link/context";
import { getBackendURL } from "../utils";
import toast from "react-hot-toast";

const httpLink = createHttpLink({
  uri: `${getBackendURL()}/graphql`,
});

const defaultOptions = {
  // watchQuery: {
  //   fetchPolicy: "no-cache",
  //   errorPolicy: "ignore",
  // },
  // query: {
  //   fetchPolicy: "no-cache",
  //   errorPolicy: "all",
  // },
};

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? token : "",
    },
  };
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      toast.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );

  if (networkError) toast.error(`[Network error]: ${networkError}`);
});

const client = new ApolloClient({
  link: from([authLink.concat(httpLink), errorLink]),
  cache: new InMemoryCache(),
  defaultOptions,
  // link: authLink.concat(httpLink),
});

export default client;
