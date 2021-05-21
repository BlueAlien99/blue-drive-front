import React from 'react';
import styled from 'styled-components';

const LabelStyles = styled.label`
  display: block;
  margin: 1rem 0;
  font-size: 1.5rem;
`;

const InputStyles = styled.input`
  --input-border-color: var(--black);

  display: block;
  width: 100%;
  padding: 0.5em;
  line-height: 1em;
  color: var(--white);
  background-color: var(--darkest);
  border: 1px solid var(--input-border-color);
  border-radius: 6px;
  box-sizing: border-box;
  outline: none;
  transition: border 0.2s;

  &:hover {
    --input-border-color: var(--primary-dark);
  }

  &:focus {
    --input-border-color: var(--primary);
  }
`;

interface TextInputProps {
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function TextInput({ type, name, value, onChange }: TextInputProps): JSX.Element {
  return (
    <div>
      <LabelStyles htmlFor={name}>{name.toUpperCase()}</LabelStyles>
      <InputStyles type={type} name={name} value={value} onChange={onChange} required />
    </div>
  );
}
