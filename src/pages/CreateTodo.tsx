import { useMutation } from '@apollo/client';
import React, { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { ErrorFallback } from '../components/ErrorFallback';
import { FormInput } from '../components/Form';
import { Loading } from '../components/Loading';
import { ALL_TODOS, CREATE_TODO } from '../gql';

export const CreateTodo: FC = () => {
  const [addTodo, { loading, error }] = useMutation<CreateTodoData>(CREATE_TODO, {
    onCompleted: () => history.push('/'),
    update: (cache, { data }) => {
      const queryData: AllTodosData | null = cache.readQuery({ query: ALL_TODOS });
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
  const userID = useSelector((state: { user: IUser }) => state.user._id);

  const handleSubmit = () => {
    addTodo({ variables: { title, completed: false, userID } });
  };

  return (
    <div className="createTodo">
      <FormInput
        value={title}
        setValue={setTitle}
        handleSubmit={handleSubmit}
        label="Todo"
        submitName="Add Todo"
        placeholder="What todo...?"
      />
      {loading && <Loading />}
      {error && <ErrorFallback error={error} />}
    </div>
  );
};
