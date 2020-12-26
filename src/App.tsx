import React, { Suspense } from 'react';
import { lazily } from 'react-lazily';
import { Route, Switch } from 'react-router-dom';
import { Header } from './components/Header';
import { Loading } from './components/Loading';
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
        </Switch>
      </Suspense>
    </div>
  );
};

export default App;

serviceWorker.register()
