import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client';
import { LocalStorageWrapper, persistCache } from 'apollo3-cache-persist';
import React, { Suspense, useEffect, useState } from 'react';
import { lazily } from 'react-lazily';
import { Route, Switch } from 'react-router-dom';
import { Header } from './components/Header';
import { Loading } from './components/Loading';
import { AllTodosLoader } from './loaders/AllTodosLoader';
import { AllTodos } from './pages/AllTodos';
import { Login } from './pages/Login';
import { SignUp } from './pages/SignUp';
import { Welcome } from './pages/Welcome';
import * as serviceWorker from './serviceWorker';

const { CreateTodo } = lazily(() => import('./pages/CreateTodo'))
const { UpdateTodo } = lazily(() => import('./pages/UpdateTodo'))
const { AllLists } = lazily(() => import('./pages/AllLists'))
const { CreateList } = lazily(() => import('./pages/CreateList'))

const App = () => {
  const [client, setClient] = useState(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
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

    try {
      (async () => {
        await persistCache({
          cache, storage: new LocalStorageWrapper(window.localStorage)
        })
      })()
    } catch (err) { console.error('Apollo cache persist error', err) }

    setClient(client as any)
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <div className="container">
        <Header />
        <AllTodosLoader count={7} />
      </div>
    )
  }

  return (
    <ApolloProvider client={client as any}>
      <div className="container">
        <Header />
        <Suspense fallback={<Loading />}>
          <Switch>
            <Route exact path="/">
              <AllTodos />
            </Route>
            <Route path="/welcome" component={Welcome} />
            <Route path="/login" render={() => <Login />} />
            <Route path="/signup" component={SignUp} />
            <Route path="/add" component={CreateTodo} />
            <Route path="/update/:id" component={UpdateTodo} />
            <Route path="/lists" component={AllLists} />
            <Route path="/addlist" component={CreateList} />
            <Route path='/test'>
              <AllTodosLoader count={6} />
            </Route>
          </Switch>
        </Suspense>
      </div>
    </ApolloProvider>
  );
};

export default App;

serviceWorker.register()
