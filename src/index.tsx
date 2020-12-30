import React from 'react';
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import store from './state/store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import { persistCache, LocalStorageWrapper } from 'apollo3-cache-persist';

import './index.css';

const authKey = localStorage.getItem('token') ?? process.env.REACT_APP_DB_KEY

const link = createHttpLink({
  uri: 'https://graphql.fauna.com/graphql',
  headers: {
    authorization: `Bearer ${authKey}`
  }
});

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        allTodos: {
          merge(_, incoming) {
            return incoming;
          }
        },
        list: {
          merge(_, incoming) {
            return incoming;
          }
        },
        allLists: {
          merge(_, incoming) {
            return incoming;
          }
        }
      }
    }
  }
})

const client = new ApolloClient({
  link,
  cache
});

render(
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>,
  document.getElementById('root')
);

serviceWorker.register()
