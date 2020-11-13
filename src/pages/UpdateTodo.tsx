import { DocumentNode, useMutation, useQuery } from '@apollo/client';
import React, { FC, ReactElement, useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { ErrorFallback } from '../components/ErrorFallback';
import { FormInput } from '../components/Form';
import { ListInput } from '../components/ListInput';
import {
  ALL_LISTS,
  ALL_TODOS,
  TODO_BY_ID,
  UPDATE_TODO,
  UPDATE_TODO_WITH_CREATE_LIST,
  UPDATE_TODO_WITH_LIST,
  UPDATE_TODO_WITH_NO_LIST
} from '../gql';

export const UpdateTodo: FC = () => {
  const [title, setTitle] = useState<string>('');
  const [listTitle, setListTitle] = useState<string>('');
  const [listID, setListID] = useState<string>('');
  const { id }: { id: string } = useParams();
  const history = useHistory();
  const userID: string = useSelector((state: { user: IUser }) => state.user._id);

  const listMutation: DocumentNode =
    listID === '' && listTitle === ''
      ? UPDATE_TODO_WITH_NO_LIST
      : listTitle
      ? UPDATE_TODO_WITH_CREATE_LIST
      : listID
      ? UPDATE_TODO_WITH_LIST
      : UPDATE_TODO;

  const { data: todoData, loading: todoLoading, error: todoError } = useQuery<TodoByIDData>(
    TODO_BY_ID,
    {
      variables: { id }
    }
  );

  useEffect(() => {
    if (todoData?.findTodoByID.list) {
      setListID(todoData.findTodoByID.list._id);
    }
  }, [id, todoData]);

  const [updateTodo, { loading: updateLoading }] = useMutation<UpdateTodoData>(listMutation, {
    onCompleted: () => history.push('/'),
    update: (cache, { data }) => {
      //no list assigned
      if (typeof data?.updateTodo.list === 'undefined') {
        const todoQuery: AllTodosData | null = cache.readQuery({ query: ALL_TODOS });
        cache.writeQuery({
          query: ALL_TODOS,
          data: {
            allTodos: {
              data: [
                ...todoQuery?.allTodos.data.filter(
                  (todo: ITodo) => todo._id !== data?.updateTodo._id
                ),
                {
                  _id: data?.updateTodo._id,
                  title: data?.updateTodo.title,
                  completed: data?.updateTodo.completed
                }
              ]
            }
          }
        });
      }

      const listQuery: AllListsData | null = cache.readQuery({ query: ALL_LISTS });
      const listContains: IList | undefined = listQuery?.allLists.data?.find(
        (list: IList) => list._id === data?.updateTodo.list?._id
      );

      //create new list
      if (!listContains) {
        cache.writeQuery({
          query: ALL_LISTS,
          data: {
            allLists: {
              data: [
                ...listQuery?.allLists.data,
                {
                  ...data?.updateTodo.list,
                  todos: {
                    __typename: 'TodoPage',
                    data: [{ ...data?.updateTodo }]
                  }
                }
              ]
            }
          }
        });
      }

      //assign a list
      if (listContains) {
        const todoQuery: AllTodosData | null = cache.readQuery({ query: ALL_TODOS });
        const targetList: IList | null = listContains;
        const targetTodo: ITodo | undefined = todoQuery?.allTodos.data.find(
          (todo: ITodo) => todo._id === data?.updateTodo._id
        );
        cache.writeQuery({
          query: ALL_LISTS,
          data: {
            allLists: {
              data: [
                ...listQuery?.allLists.data?.filter(
                  (list: IList) => list._id !== data?.updateTodo.list?._id
                ),
                {
                  ...targetList,
                  todos: {
                    __typename: 'TodoPage',
                    data: [...targetList?.todos?.data, targetTodo]
                  }
                }
              ]
            }
          }
        });
      }
    }
  });

  const handleSubmit = (): void => {
    const updateTitle: string | undefined = title || todoData?.findTodoByID.title;
    updateTodo({
      variables: { id, title: updateTitle, completed: false, listID, listTitle, userID }
    });
  };

  const currentName: ReactElement = (
    <p style={{ color: '#ff6a6a', fontWeight: 'bold', textTransform: 'uppercase', margin: 0 }}>
      Current name:{' '}
      <span style={{ color: '#6d6dff', margin: 0 }}>{todoData?.findTodoByID.title}</span>
      {todoLoading && <Skeleton width={173} height={16} />}
    </p>
  );

  return (
    <>
      {todoError && <ErrorFallback error={todoError} />}
      {currentName}
      <FormInput value={title} setValue={setTitle} placeholder="What did you think...?" />
      {listID === 'CREATE_LIST' ? (
        <FormInput
          value={listTitle}
          setValue={setListTitle}
          label="List name: "
          placeholder="Name the very new list..."
        />
      ) : (
        <ListInput ID={listID} setID={setListID}>
          <option value={'CREATE_LIST'}>Create a new list...</option>
        </ListInput>
      )}
      <button onClick={handleSubmit} disabled={updateLoading}>
        {updateLoading ? 'Updating...' : 'Update'}
      </button>
    </>
  );
};
