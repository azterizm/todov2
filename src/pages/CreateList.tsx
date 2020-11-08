import { useMutation } from '@apollo/client';
import React, { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { ErrorFallback } from '../components/ErrorFallback';
import { FormInput } from '../components/Form';
import { ALL_LISTS, CREATE_LIST } from '../gql';

export const CreateList: FC = () => {
  const [title, setTitle] = useState<string>('');
  const [addList, { loading, error }] = useMutation<CreateListData>(CREATE_LIST, {
    onCompleted: () => history.push('/lists'),
    update: (cache, { data }) => {
      const queryData: AllListsData | null = cache.readQuery({ query: ALL_LISTS });
      cache.writeQuery({
        query: ALL_LISTS,
        data: {
          allLists: {
            data: [...queryData?.allLists.data, data?.createList]
          }
        }
      });
    }
  });

  const userID: string = useSelector((state: { user: IUser }) => state.user._id);
  const history = useHistory();

  const handleSubmit = (): void => {
    addList({ variables: { title, userID } });
  };

  return (
    <div className="createList">
      <FormInput
        value={title}
        setValue={setTitle}
        label="List Name"
        placeholder="What will that list be...?"
      />
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? 'Adding List...' : 'Add List'}
      </button>
      {error && <ErrorFallback error={error} />}
    </div>
  );
};
