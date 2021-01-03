import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "apollo-link-context";
import { onError } from "apollo-link-error";
import QueueLink from "apollo-link-queue";
import { RetryLink } from "apollo-link-retry";
import SerializingLink from "apollo-link-serialize";
import { CachePersistor } from "apollo3-cache-persist";

export const getApolloClient = async () => {
  const API_HOST = 'https://graphql.fauna.com/graphql'
  const SCHEMA_VERSION = '1'
  const SCHEMA_VERSION_KEY = 'apollo-schema-version'

  const httpLink = new HttpLink({ uri: API_HOST })
  const retryLink = new RetryLink({ attempts: { max: Infinity } })

  const authLink = setContext(() => {
    const token = localStorage.getItem('token') ?? process.env.REACT_APP_DB_KEY
    return {
      headers: {
        authorization: `Bearer ${token}`
      }
    }
  })

  const errorLink = onError(({ networkError }) => {
    console.log('networkError', networkError)
  })

  const queueLink = new QueueLink()
  window.addEventListener('offline', () => queueLink.close())
  window.addEventListener('online', () => queueLink.open())

  const serializingLink = new SerializingLink()

  const link = ApolloLink.from([
    queueLink,
    serializingLink,
    errorLink,
    retryLink,
    authLink,
    httpLink
  ] as any)

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

  const persistor = new CachePersistor({
    cache,
    storage: window.localStorage,
  })

  const currentVersion = window.localStorage.getItem(SCHEMA_VERSION_KEY)

  if (currentVersion === SCHEMA_VERSION) {
    await persistor.restore();
  } else {
    await persistor.purge()
    window.localStorage.setItem(SCHEMA_VERSION_KEY, SCHEMA_VERSION)
  }

  const client = new ApolloClient({
    link,
    cache
  });

  return client
}
