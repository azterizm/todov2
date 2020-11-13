import { useMutation } from '@apollo/client';
import React, { FC, ReactElement } from 'react';
import { ALL_LISTS, ALL_TODOS, DELETE_LIST } from '../gql';
import trashIcon from '../assets/trash.png';

interface ListProps {
  list: IList;
}

export const List: FC<ListProps> = ({ list }) => {
  const [deleteList] = useMutation<DeleteListData>(DELETE_LIST, {
    update: (cache, { data }) => {
      const allListsData: AllListsData | null = cache.readQuery({ query: ALL_LISTS });
      const listTarget: IList | undefined = allListsData?.allLists.data?.find(
        (list: IList) => list._id === data?.deleteList._id
      );

      const allTodosData: AllTodosData | null = cache.readQuery({ query: ALL_TODOS });
      const todoTarget: ITodo | undefined = allTodosData?.allTodos.data.find(
        (todo: ITodo) => todo.list?._id === data?.deleteList._id
      );
      const changedTodo: ChangedTodo = {
        _id: todoTarget?._id,
        title: todoTarget?.title,
        completed: todoTarget?.completed
      };

      cache.writeQuery({
        query: ALL_LISTS,
        data: {
          allLists: {
            data: [
              ...allListsData?.allLists.data?.filter((list: IList) => list._id !== listTarget?._id)
            ]
          }
        }
      });

      cache.writeQuery({
        query: ALL_TODOS,
        data: {
          allTodos: {
            data: [
              ...allTodosData?.allTodos.data.filter((todo: ITodo) => todo._id !== todoTarget?._id),
              changedTodo
            ]
          }
        }
      });
    }
  });

  const handleDelete = (): void => {
    deleteList({ variables: { id: list._id } });
  };

  const deleteElem: ReactElement = <img src={trashIcon} alt="" onClick={handleDelete} />;

  return (
    <div className="list">
      <h1>
        {list.title}
        <span>{deleteElem}</span>
      </h1>
      {list.todos?.data.map((todo: ITodo) => (
        <p key={todo._id}>{todo.title}</p>
      ))}
      <hr />
    </div>
  );
};

interface ChangedTodo {
  _id: string | undefined;
  title: string | undefined;
  completed: boolean | undefined;
}
