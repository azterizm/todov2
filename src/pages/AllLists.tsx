import { useQuery } from '@apollo/client';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { ErrorFallback } from '../components/ErrorFallback';
import { List } from '../components/List';
import { Loading } from '../components/Loading';
import { ALL_LISTS } from '../gql';

export const AllLists: FC = () => {
  const { loading, error, data } = useQuery<AllListsData>(ALL_LISTS);

  if (loading) return <Loading />;
  if (error) return <ErrorFallback error={error} />;

  return (
    <div className="lists">
      {data?.allLists.data?.map((list: IList) => (
        <List list={list} key={list._id} />
      ))}
      <Link to="/addlist">Create a list?</Link>
    </div>
  );
};
