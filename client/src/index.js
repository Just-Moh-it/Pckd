import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import client from "./apollo/client";
import { ApolloProvider } from "@apollo/client";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { Toaster } from "react-hot-toast";

import { Provider } from "react-redux";
import store from "./app/store";

ReactDOM.render(
  <Provider store={store}>
    <ApolloProvider client={client}>
      <ThemeProvider>
        <BrowserRouter basename="/manage">
          <App />

          {/* Notifications - Toast Provider */}
          <Toaster
            toastOptions={{
              className: "",
              style: {
                border: "1px solid #7F5EE4",
                padding: "16px",
                color: "#7F5EE4",
              },
            }}
          />
        </BrowserRouter>
      </ThemeProvider>
    </ApolloProvider>
  </Provider>,
  document.getElementById("root")
);
