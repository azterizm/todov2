import React from 'react'
import { cleanup, screen, fireEvent } from '@testing-library/react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import { Todo } from '../Todo';
import { Provider } from 'react-redux';
import { MockedProvider } from '@apollo/client/testing'
import store from '../../state/store';
import { UPDATE_TODO } from '../../gql';

afterEach(cleanup)

const todoRender = (...responses: any) => {
  return render(
    <MockedProvider mocks={[...responses]} addTypename={false}>
      <Provider store={store}>
        <Todo index={1} _id='1' title='test item 1' completed={false} />
      </Provider>
    </MockedProvider>
  )
}

it('loads correctly', () => {
  todoRender()
  expect(screen.getByRole('heading')).toBeInTheDocument();
  expect(screen.getAllByRole('img')).toHaveLength(3)
})

it('can be completed', () => {
  const completeTodoMock = {
    request: {
      query: UPDATE_TODO,
      variables: {
        id: '1',
        title: 'test item 1',
        completed: true,
      }
    },
    result: {
      data: {
        updateTodo: {
          _id: '1',
          title: 'test item 1',
          completed: true,
          date: null
        }
      }
    }
  }

  todoRender(completeTodoMock)

  const checkImg = screen.getByRole('img', { name: /uncomplete/i })
  const checkSpan = screen.getByTestId('completeTodo')

  expect(checkImg).toHaveAttribute('src', 'rec.png')
  fireEvent.click(checkSpan)
  expect(checkImg).toHaveAttribute('src', 'check.png')
})

