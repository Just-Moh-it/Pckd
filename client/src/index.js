import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import client from "./apollo/client";
import { ApolloProvider } from "@apollo/client";
import { BrowserRouter } from 'react-router-dom'

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById("root")
);
