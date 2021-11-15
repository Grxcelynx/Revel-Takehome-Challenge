import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";

import Resume from "./resume-pages/";
import EditResume from "./resume-pages/edit";

let client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <Route path="/" exact component={Resume} />
      <Route path="/edit" exact component={EditResume} />
    </Router>
  </ApolloProvider>,
  document.getElementById("root")
);
