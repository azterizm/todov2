import React, { Suspense } from 'react';
import { lazily } from 'react-lazily';
import { Route, Switch } from 'react-router-dom';
import { Header } from './components/Header';
import { Loading } from './components/Loading';
import { AllTodosLoader } from './loaders/AllTodosLoader';
import * as serviceWorker from './serviceWorker'

const { AllLists } = lazily(() => import('./pages/AllLists'))
const { AllTodos } = lazily(() => import('./pages/AllTodos'))
const { CreateList } = lazily(() => import('./pages/CreateList'))
const { CreateTodo } = lazily(() => import('./pages/CreateTodo'))
const { Login } = lazily(() => import('./pages/Login'))
const { SignUp } = lazily(() => import('./pages/SignUp'))
const { UpdateTodo } = lazily(() => import('./pages/UpdateTodo'))
const { Welcome } = lazily(() => import('./pages/Welcome'))

const App = () => {
  return (
    <div className="container">
      <Header />
      <Suspense fallback={<Loading/>}>
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
          <Route path="/test">
            <AllTodosLoader count={5} />
          </Route>
        </Switch>
      </Suspense>
    </div>
  );
};

export default App;

serviceWorker.register()
