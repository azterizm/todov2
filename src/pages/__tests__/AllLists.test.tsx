import React from 'react'
import { render, screen } from "@testing-library/react"
import { AllLists } from './../AllLists'
import { Provider } from 'react-redux'
import store from '../../state/store'
import { MockedProvider } from '@apollo/client/testing'
import { ALL_LISTS } from '../../gql'
import { MemoryRouter } from 'react-router-dom'
import '@testing-library/jest-dom/extend-expect'

test('multiple list', async () => {
  const mockLists = {
    request: {
      query: ALL_LISTS,
    },
    result: {
      data: {
        allLists: {
          data: [
            {
              _id: '1',
              title: 'test list',
              todos: {
                data: [
                  {
                    _id: '1',
                    title: 'test todo',
                    completed: false,
                    date: null
                  },
                  {
                    _id: '2',
                    title: 'test todo',
                    completed: false,
                    date: null
                  }
                ]
              }
            },
            {
              _id: '2',
              title: 'test list',
              todos: {
                data: []
              }
            }
          ]
        }
      }
    }
  }

  render(
    <MockedProvider mocks={[mockLists]} addTypename={false}>
      <Provider store={store}>
        <MemoryRouter initialEntries={['/welcome', '/', '/lists']}>
          <AllLists />
        </MemoryRouter>
      </Provider>
    </MockedProvider>
  )

  await new Promise(r => setTimeout(r, 0))

  const allHeadings = screen.getAllByRole('heading')
  expect(allHeadings).toHaveLength(2)
  expect(allHeadings[0]).toHaveTextContent('test list')
  expect(allHeadings[1]).toHaveTextContent('test list')
})