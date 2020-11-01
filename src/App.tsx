import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Header } from './components/Header';
import TestComponent from './loaders/TestComponent';
import { AllTodos } from './pages/AllTodos';
import { CreateTodo } from './pages/CreateTodo';
import { UpdateTodo } from './pages/UpdateTodo';

const App = () => {
  return (
    <div className="container">
      <Header />
      <Switch>
        <Route exact path="/" component={AllTodos} />
        <Route path="/add" component={CreateTodo} />
        <Route path="/update/:id" component={UpdateTodo} />
        <Route path="/test" component={TestComponent} />
      </Switch>
    </div>
  );
};

export default App;
