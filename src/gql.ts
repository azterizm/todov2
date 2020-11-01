import { gql } from '@apollo/client';

export const ALL_TODOS = gql`
  query {
    allTodos {
      data {
        _id
        title
        completed
      }
    }
  }
`;

export const TODO_BY_TITLE = gql`
  query TodoByTitle($id: ID!) {
    findTodoByID(id: $id) {
      _id
      title
      completed
    }
  }
`;

export const UPDATE_TODO = gql`
  mutation UpdateTodo($id: ID!, $title: String!, $completed: Boolean!) {
    updateTodo(id: $id, data: { title: $title, completed: $completed }) {
      _id
      title
      completed
    }
  }
`;

export const CREATE_TODO = gql`
  mutation CreateTodo($title: String!, $completed: Boolean!) {
    createTodo(data: { title: $title, completed: $completed }) {
      _id
      title
      completed
    }
  }
`;

export const DELETE_TODO = gql`
  mutation DeleteTodo($id: ID!) {
    deleteTodo(id: $id) {
      _id
    }
  }
`;
