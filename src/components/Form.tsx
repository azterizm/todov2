import React, { FC } from 'react';

interface FormProps {
  value: string;
  setValue: (value: string) => void;
  handleSubmit?: () => void;
  type?: string;
  handleEnterKey?: boolean;
  placeholder?: string;
  label?: string;
  submitName?: string;
  [inputOptions: string]: any;
}

export const FormInput: FC<FormProps> = ({
  value: title,
  setValue: setTitle,
  handleSubmit,
  handleEnterKey,
  placeholder,
  label,
  submitName: name,
  type,
  ...restProps
}) => {
  const handleInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter' && !handleEnterKey) return;
    if (handleSubmit) handleSubmit();
  };

  return (
    <>
      {label && <label htmlFor={name ?? 'form'}>{label}</label>}
      <input
        type={type ?? 'text'}
        name={name ?? 'form'}
        value={title}
        onChange={e => setTitle(e.target.value)}
        onKeyPress={handleInput}
        placeholder={placeholder ?? ''}
        {...restProps}
      />
      {handleSubmit && <button onClick={handleSubmit}>{name ?? 'Submit'}</button>}
    </>
  );
};
