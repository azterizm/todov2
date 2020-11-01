import { useMutation } from '@apollo/client';
import React, { FC, KeyboardEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ErrorFallback } from '../components/ErrorFallback';
import { Form } from '../components/Form';
import { Loading } from '../components/Loading';
import { ALL_TODOS, CREATE_TODO } from '../gql';

export const CreateTodo: FC = () => {
  const [addTodo, { loading, error }] = useMutation<CreateTodoData>(CREATE_TODO, {
    onCompleted: () => history.push('/'),
    update: (cache, { data }) => {
      const queryData: any = cache.readQuery({ query: ALL_TODOS });
      console.log(queryData);
      cache.writeQuery({
        query: ALL_TODOS,
        data: {
          allTodos: {
            data: [...queryData?.allTodos.data, data?.createTodo]
          }
        }
      });
    }
  });

  const [title, setTitle] = useState<string>('');
  const history = useHistory();

  const handleSubmit = () => {
    addTodo({ variables: { title, completed: false } });
  };

  const handleInput = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="createTodo">
      <Form
        title={title}
        setTitle={setTitle}
        handleInput={handleInput}
        handleSubmit={handleSubmit}
      />
      {loading && <Loading />}
      {error && <ErrorFallback error={error} />}
    </div>
  );
};
