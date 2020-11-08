import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(input: { email: $email, password: $password })
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser($name: String!, $email: String!, $password: String!) {
    createUser(input: { name: $name, email: $email, password: $password, role: CLIENT }) {
      _id
      name
      email
    }
  }
`;

export const ALL_TODOS = gql`
  query AllTodos {
    allTodos {
      data {
        _id
        title
        completed
        list {
          _id
          title
          todos {
            data {
              _id
              title
              completed
            }
          }
        }
        user {
          _id
          name
          email
        }
      }
    }
  }
`;

export const TODO_BY_ID = gql`
  query TodoByTitle($id: ID!) {
    findTodoByID(id: $id) {
      _id
      title
      completed
      list {
        _id
        title
      }
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
  mutation CreateTodo($title: String!, $completed: Boolean!, $userID: ID!) {
    createTodo(data: { title: $title, completed: $completed, user: { connect: $userID } }) {
      _id
      title
      completed
      user {
        _id
        name
        email
      }
    }
  }
`;

export const CREATE_TODO_WITH_LIST = gql`
  mutation CreateTodo($title: String!, $completed: Boolean!, $userID: ID!, $listID: ID) {
    createTodo(
      data: {
        title: $title
        completed: $completed
        user: { connect: $userID }
        list: { connect: $listID }
      }
    ) {
      _id
      title
      completed
      user {
        _id
        name
        email
      }
      list {
        _id
        title
        todos {
          data {
            _id
            title
            completed
          }
        }
      }
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

export const USER_QUERY = gql`
  query {
    allUsers {
      data {
        _id
        name
        email
      }
    }
  }
`;

export const ALL_LISTS = gql`
  query {
    allLists {
      data {
        _id
        title
        todos {
          data {
            _id
            title
            completed
          }
        }
      }
    }
  }
`;

export const CREATE_LIST = gql`
  mutation CreateList($title: String!, $userID: ID!) {
    createList(data: { title: $title, user: { connect: $userID } }) {
      _id
      title
    }
  }
`;
