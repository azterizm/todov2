import React, { FC } from 'react';

interface ListProps {
  list: IList;
}

export const List: FC<ListProps> = ({ list }) => {
  return (
    <div className="list">
      <h1>{list.title}</h1>
      {list.todos?.data.map((todo: ITodo) => (
        <p key={todo._id}>{todo.title}</p>
      ))}
      <hr />
    </div>
  );
};
