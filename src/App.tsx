import { ApolloProvider } from '@apollo/client';
import React, { Suspense, useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { ErrorFallback } from './components/ErrorFallback';
import { Header } from './components/Header';
import { Loading } from './components/Loading';
import { AllTodosLoader } from './loaders/AllTodosLoader';
import { AllLists } from './pages/AllLists';
import { AllTodos } from './pages/AllTodos';
import { CreateList } from './pages/CreateList';
import { CreateTodo } from './pages/CreateTodo';
import { Login } from './pages/Login';
import { SignUp } from './pages/SignUp';
import { UpdateTodo } from './pages/UpdateTodo';
import { Welcome } from './pages/Welcome';
import * as serviceWorker from './serviceWorker';
import { getApolloClient } from './utils/apolloClient';

const App = () => {
  const [client, setClient] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getApolloClient().then((client) => {
      setClient(client as any)
      setLoading(false)
    })
  }, [])


  if (loading) {
    return (
      <div className="container">
        <Header />
        <AllTodosLoader count={7} />
      </div>
    )
  }

  if (!client) {
    return (
      <ErrorFallback error={'Could not connect to the client.'}/>
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
