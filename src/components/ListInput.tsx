import React from 'react';

interface ListInputProps {
  ID: string;
  setID: (value: string) => void;
  data: AllListsData | undefined;
}

export class ListInput extends React.Component<ListInputProps, {}> {
  constructor(props: ListInputProps) {
    super(props);
  }

  render() {
    return (
      <>
        <label htmlFor="list">List: </label>
        <select
          id="list"
          name="list"
          value={this.props.ID}
          onChange={e => this.props.setID(e.target.value)}
        >
          <option value="">No list assigned</option>
          {this.props.data?.allLists.data?.map((list: IList) => (
            <option value={list._id} key={list._id}>
              {list.title}
            </option>
          ))}
        </select>
      </>
    );
  }
}
