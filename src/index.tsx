import React from 'react';
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

import './index.css';

const link = createHttpLink({
  uri: 'https://graphql.fauna.com/graphql',
  headers: {
    authorization: `Bearer ${process.env.REACT_APP_DB_KEY}`
  }
});

const client = new ApolloClient({
  link,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          allTodos: {
            merge(_, incoming) {
              return incoming;
            }
          }
        }
      }
    }
  })
});

render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root')
);
