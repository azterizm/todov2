import { MockedProvider } from '@apollo/client/testing';
import React from 'react'
import { fireEvent, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { ALL_TODOS, DELETE_TODO } from '../../gql'
import store from '../../state/store';
import { USER_QUERY } from './../../gql';
import { MemoryRouter } from 'react-router-dom';
import { AllTodos } from '../AllTodos';
import { screen } from '@testing-library/react';
import { InMemoryCache } from '@apollo/client';

const mockTodosData = {
  request: {
    query: ALL_TODOS
  },
  result: {
    data: {
      allTodos: {
        data: [
          {
            _id: '1',
            title: 'test todo',
            completed: false,
            date: null,
            list: {
              _id: '1',
              title: 'test list',
              todos: {
                data: [
                  {
                    _id: '1',
                    title: 'test todo',
                    completed: false
                  }
                ]
              }
            },
            user: {
              _id: '1',
              name: 'test',
              email: 'test@test.com'
            }
          },
          {
            _id: '2',
            title: 'test todo',
            completed: false,
            date: null,
            list: null,
            user: {
              _id: '1',
              name: 'test',
              email: 'test@test.com'
            }
          }
        ]
      }
    }
  }
}

const mockUserQuery = {
  request: {
    query: USER_QUERY
  },
  result: {
    data: {
      allUsers: {
        data: [
          {
            _id: '1',
            name: 'test',
            email: 'test@test.com'
          }
        ]
      }
    }
  }
}

const mockDeleteTodo = {
  request: {
    query: DELETE_TODO,
    variables: {
      id: '1'
    }
  },
  result: {
    data: {
      deleteTodo: {
        _id: '1',
      }
    }
  }
}

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

test('multiple todo', async () => {
  render(
    <MockedProvider mocks={[mockTodosData, mockUserQuery]} addTypename={false}>
      <Provider store={store}>
        <MemoryRouter initialEntries={['/welcome', '/']}>
          <AllTodos />
        </MemoryRouter>
      </Provider>
    </MockedProvider>
  )

  await new Promise(r => setTimeout(r, 0))
  const allTodos = screen.getAllByRole('heading', { name: /test/i })
  expect(allTodos).toHaveLength(2)
})

it('can be deleted', async () => {
  render(
    <MockedProvider mocks={[mockTodosData, mockUserQuery, mockDeleteTodo]} addTypename={true} cache={cache}>
      <Provider store={store}>
        <MemoryRouter initialEntries={['/welcome', '/']}>
          <AllTodos />
        </MemoryRouter>
      </Provider>
    </MockedProvider>
  )

  await new Promise(r => setTimeout(r, 0))

  const allDeleteBtns = screen.getAllByTestId('deleteTodo')
  fireEvent.click(allDeleteBtns[0])

  await new Promise(r => setTimeout(r, 0))

  const allTodos = screen.getAllByRole('heading', { name: /test/i })
  expect(allTodos).toHaveLength(1)
})