import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Header } from './components/Header';
import { AllTodosLoader } from './loaders/AllTodosLoader';
import { AllTodos } from './pages/AllTodos';
import { CreateTodo } from './pages/CreateTodo';
import { Login } from './pages/Login';
import { SignUp } from './pages/SignUp';
import { UpdateTodo } from './pages/UpdateTodo';
import { Welcome } from './pages/Welcome';

const App = () => {
  return (
    <div className="container">
      <Header />
      <Switch>
        <Route exact path="/">
          <AllTodos />
        </Route>
        <Route path="/add" component={CreateTodo} />
        <Route path="/update/:id" component={UpdateTodo} />
        <Route path="/login" render={() => <Login />} />
        <Route path="/signup" component={SignUp} />
        <Route path="/welcome" component={Welcome} />
        <Route path="/test">
          <AllTodosLoader count={5} />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
