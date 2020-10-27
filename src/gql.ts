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

export const COMPLETE_TODO = gql`
  mutation UpdateTodo($id: ID!, $title: String!, $completed: Boolean!) {
    updateTodo(id: $id, data: { title: $title, completed: $completed }) {
      _id
      title
      completed
    }
  }
`;
