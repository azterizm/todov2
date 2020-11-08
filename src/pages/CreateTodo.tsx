import { ListInput } from '../components/ListInput';
import { useMutation, useQuery } from '@apollo/client';
import React, { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { ErrorFallback } from '../components/ErrorFallback';
import { FormInput } from '../components/Form';
import { ALL_LISTS, ALL_TODOS, CREATE_TODO, CREATE_TODO_WITH_LIST } from '../gql';

export const CreateTodo: FC = () => {
  const [title, setTitle] = useState<string>('');
  const [listID, setListID] = useState<string>('');
  const history = useHistory();
  const userID = useSelector((state: { user: IUser }) => state.user._id);

  const { loading: listLoading, error: listError, data: listData } = useQuery<AllListsData>(
    ALL_LISTS
  );

  const [addTodo, { loading, error }] = useMutation<CreateTodoData>(
    listID ? CREATE_TODO_WITH_LIST : CREATE_TODO,
    {
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
    }
  );

  const handleSubmit = () => {
    addTodo({ variables: { title, completed: false, userID, listID } });
  };

  return (
    <div className="createTodo">
      <FormInput value={title} setValue={setTitle} label="Todo" placeholder="What todo...?" />
      <ListInput ID={listID} setID={setListID} data={listData} />
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? 'Adding Todo...' : 'Add Todo'}
      </button>
      {(error ?? listError) && <ErrorFallback error={error ?? listError} />}
    </div>
  );
};
