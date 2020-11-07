import React, { FC, Fragment } from 'react';
import Skeleton from 'react-loading-skeleton';

interface AllTodosLoaderProps {
  count?: number;
}

export const AllTodosLoader: FC<AllTodosLoaderProps> = ({ count }) => {
  let rows: React.ReactElement[] = [];
  const loopCount: number = count ? count - 1 : 1;
  for (let i: number = 0; i <= loopCount; i++) {
    rows.push(
      <Fragment key={i}>
        <div style={{ marginTop: 28 }}>
          <Skeleton width={400} height={27} />
          <div style={{ marginLeft: 5, marginTop: 5, width: 18, height: 18, float: 'right' }}>
            <Skeleton width={18} height={18} />
          </div>
          <div style={{ marginLeft: 5, marginTop: 5, width: 18, height: 18, float: 'right' }}>
            <Skeleton width={18} height={18} />
          </div>
          <div style={{ marginTop: 5, width: 18, height: 18, float: 'right' }}>
            <Skeleton width={18} height={18} />
          </div>
        </div>
        <div style={{ marginTop: 25 }}>
          <Skeleton height={2} />
        </div>
      </Fragment>
    );
  }
  return <div>{rows}</div>;
};
