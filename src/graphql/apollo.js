// apollo.js

import Vue from "vue";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
//import { onError } from "apollo-link-error"
import { InMemoryCache } from "apollo-cache-inmemory";
import VueApollo from "vue-apollo";

const httpLink = new HttpLink({
  uri: "https://api.hireflix.com/me",
  headers: { "x-api-key": "58b327ff-2d3d-40df-9826-138e916af950" },
});

// Error Handling
/*const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
        graphQLErrors.map(({ message, locations, path }) =>
            console.log(
                `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            )
        )
    if (networkError) console.log(`[Network error]: ${networkError}`)
})*/

// Create the apollo client
export const apolloClient = new ApolloClient({
  //link: errorLink.concat(httpLink),
  link: httpLink,
  cache: new InMemoryCache(),
  connectToDevTools: true,
});

// Install the Vue plugin

Vue.use(VueApollo);

export const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
});
