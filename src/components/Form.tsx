import React, { FC, KeyboardEvent } from 'react';

interface FormProps {
  title: string;
  setTitle: (value: string) => void;
  handleInput?: (e: KeyboardEvent<HTMLInputElement>) => void;
  handleSubmit: () => void;
  placeholder?: string;
}

export const Form: FC<FormProps> = ({
  title,
  setTitle,
  handleSubmit,
  handleInput,
  placeholder
}) => {
  return (
    <>
      <input
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
        onKeyPress={handleInput}
        placeholder={placeholder ?? 'What todo...?'}
      />
      <button onClick={handleSubmit}>Submit</button>
    </>
  );
};
