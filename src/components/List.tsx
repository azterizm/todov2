import { useMutation } from '@apollo/client';
import React, { FC, ReactElement } from 'react';
import { DELETE_LIST } from '../gql';
import trashIcon from '../assets/trash.png';
import { listCacheManagment } from '../utils/cacheManagement';

interface ListProps {
  list: IList;
}

export const List: FC<ListProps> = ({ list }) => {
  const [deleteList, { error }] = useMutation<DeleteListData>(DELETE_LIST, {
    update: (cache, { data }) => {
      listCacheManagment(cache, data);
    }
  });

  const handleDelete = (): void => {
    deleteList({ variables: { id: list._id } });
  };

  const deleteElem: ReactElement = <img data-testid='deleteList' src={trashIcon} alt="" onClick={handleDelete} />;

  return (
    <div className="list">
      <h1>
        {list.title}
        <span>{deleteElem}</span>
      </h1>
      {list.todos?.data.map((todo: ITodo) => (
        <p key={todo._id}>{todo.title}</p>
      ))}
      {error && <p style={{ color: 'red' }}>Refresh to see a change in this list</p>}
      <hr />
    </div>
  );
};
