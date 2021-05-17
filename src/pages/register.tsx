import { PageProps, Link } from 'gatsby';
import React, { useEffect, useState } from 'react';
import LoadingBlur from '../components/LoadingBlur';
import TextInput from '../components/TextInput';
import useForm from '../hooks/useForm';
import AuthStyles from '../styles/AuthStyles';
import FormStyles from '../styles/FormStyles';

export default function RegisterPage({ location }: PageProps): JSX.Element {
  const [fetchState, setFetchState] = useState<FetchState>('pending');

  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    username: '',
    password: '',
  });

  useEffect(() => {
    setTimeout(() => setFetchState('idle'), 1000);
  }, []);

  return (
    <div>
      <LoadingBlur fetchState={fetchState}>
        <AuthStyles className="card">
          <header>Create an account</header>
          <FormStyles>
            <TextInput type="email" name="email" value={inputs.email} onChange={handleChange} />
            <TextInput
              type="text"
              name="username"
              value={inputs.username}
              onChange={handleChange}
            />
            <TextInput
              type="password"
              name="password"
              value={inputs.password}
              onChange={handleChange}
            />
            <button type="submit">Sign Up</button>
          </FormStyles>
          <footer>
            <Link to="/login">Already have an account?</Link>
          </footer>
        </AuthStyles>
      </LoadingBlur>
    </div>
  );
}
