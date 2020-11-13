import { useQuery } from '@apollo/client';
import React, { FC, ReactNode } from 'react';
import { ALL_LISTS } from '../gql';
import { ErrorFallback } from './ErrorFallback';

interface ListInputProps {
  ID: string;
  setID: (value: string) => void;
  [x: string]: any;
  children?: ReactNode;
}

export const ListInput: FC<ListInputProps> = ({ ID, setID, children, ...props }) => {
  const { data, error } = useQuery<AllListsData>(ALL_LISTS);
  return (
    <>
      <label htmlFor="list">List: </label>
      <select id="list" name="list" value={ID} onChange={e => setID(e.target.value)} {...props}>
        <option value="">No list assigned</option>
        {data?.allLists.data?.map((list: IList) => (
          <option value={list._id} key={list._id}>
            {list.title}
          </option>
        ))}
        {children}
      </select>
      {error && <ErrorFallback error={error} />}
    </>
  );
};
