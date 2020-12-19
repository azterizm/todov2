import React, { useEffect, useState } from 'react';
import { TodoPagination } from '../components/TodoPagination';
import { useLazyQuery, useQuery } from '@apollo/client';
import { ALL_TODOS, USER_QUERY } from './../gql';
import { Todo } from './../components/Todo';
import { Redirect, useHistory } from 'react-router-dom';
import { AllTodosLoader } from '../loaders/AllTodosLoader';
import { loaderCount } from '../utils';
import { useDispatch } from 'react-redux';
import { addUser } from '../state/userSlice';

export const AllTodos = () => {
  const [cursor, setCursor] = useState<number>(10);
  const [prevCursor, setPrevCursor] = useState<number>(0);

  const { loading, error, data } = useQuery<AllTodosData>(ALL_TODOS);
  const { data: userData } = useQuery<UserQueryData>(USER_QUERY)

  const history = useHistory();
  const dispatch = useDispatch();

  if (loading) return <AllTodosLoader count={loaderCount} />;
  if (error) {
    if (localStorage.getItem('token')) {
      history.go(0);
    } else {
      return <Redirect to="/welcome" />;
    }
  }

  if (userData) {
    dispatch(addUser(userData?.allUsers.data[0]));
  }

  return (
    <>
      {data?.allTodos.data.map(({ _id, ...data }: ITodo, index: number) => {
        if (index + 1 <= cursor && index + 1 > prevCursor)
          return <Todo key={_id} index={index + 1} {...(data as ITodo)} _id={_id} />;
        return '';
      })}
      <TodoPagination
        cursor={cursor}
        setCursor={setCursor}
        prevCursor={prevCursor}
        setPrevCursor={setPrevCursor}
        todoLength={data?.allTodos.data.length}
      />
    </>
  );
};
