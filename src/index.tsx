import React from 'react';
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client';
import { render } from 'react-dom';
import App from './App';

const link = createHttpLink({
  uri: 'https://graphql.fauna.com/graphql',
  headers: {
    authorization: `Bearer ${'fnAD5KtPunACBQal-i_TqcKCH-BxbC_5d5BqM0Fo'}`,
  },
});

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
