import React, { FC } from 'react';

interface TodoPaginationProps {
  cursor: number;
  prevCursor: number;
  setCursor: (e: any) => void;
  setPrevCursor: (e: any) => void;
  todoLength: number | undefined;
}

export const TodoPagination: FC<TodoPaginationProps> = ({
  cursor,
  prevCursor,
  setCursor,
  setPrevCursor,
  todoLength
}) => {
  return (
    <div className="page">
      {cursor > 10 && (
        <button
          onClick={() => {
            if (cursor <= 10 && prevCursor <= 0) return;
            setPrevCursor((e: number) => e - 10);
            setCursor((e: number) => e - 10);
          }}
        >
          Previous
        </button>
      )}
      {cursor <= (todoLength ?? 20) && (
        <button
          onClick={() => {
            setPrevCursor(cursor);
            setCursor((e: number) => e + 10);
          }}
        >
          Next
        </button>
      )}
    </div>
  );
};
