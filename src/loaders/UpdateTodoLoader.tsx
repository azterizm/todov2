import React, { FC } from 'react';
import ContentLoader from 'react-content-loader';

const UpdateTodoLoader: FC = props => (
  <ContentLoader
    speed={2}
    width={476}
    height={42}
    viewBox="0 0 476 42"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="10" y="2" rx="3" ry="3" width="137" height="42" />
  </ContentLoader>
);

export default UpdateTodoLoader;
