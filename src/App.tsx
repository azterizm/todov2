import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Header } from './components/Header';
import { AllTodosLoader } from './loaders/AllTodosLoader';
import { AllLists } from './pages/AllLists';
import { AllTodos } from './pages/AllTodos';
import { CreateList } from './pages/CreateList';
import { CreateTodo } from './pages/CreateTodo';
import { Login } from './pages/Login';
import { SignUp } from './pages/SignUp';
import { UpdateTodo } from './pages/UpdateTodo';
import { Welcome } from './pages/Welcome';

//TODO handle error "The id provided is too large: ''" in createTodo
//TODO allTodos pagination
//TODO add Date feature

const App = () => {
  return (
    <div className="container">
      <Header />
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
    </div>
  );
};

export default App;
