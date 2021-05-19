import axios, { AxiosError } from 'axios';
import { Link, navigate } from 'gatsby';
import React, { useState } from 'react';
import { useAuth } from '../components/AuthContext';
import LoadingBlur from '../components/LoadingBlur';
import TextInput from '../components/TextInput';
import { useToast } from '../components/ToastContext';
import useForm from '../hooks/useForm';
import AuthStyles from '../styles/AuthStyles';
import FormStyles from '../styles/FormStyles';

interface LoginResponse {
  authenticationToken: string;
  username: string;
  authenticated: boolean;
}

export default function LoginPage(): JSX.Element {
  const [fetchState, setFetchState] = useState<FetchState>('idle');

  const launchToast = useToast();
  const authService = useAuth();

  const { inputs, handleChange, resetForm } = useForm({
    username: '',
    password: '',
  });

  const handleSubmit = () => {
    if (fetchState !== 'pending') {
      setFetchState('pending');
      axios
        .post<LoginResponse>('/api/auth/login', inputs)
        .then(({ data: { authenticationToken, username } }) => {
          authService.login(username, authenticationToken);
          // eslint-disable-next-line no-void
          void navigate('/drive');
        })
        .catch((err: AxiosError) => {
          launchToast('error', err.response ? err.response.data : err.message);
          resetForm();
          setFetchState('failed');
        });
    }
  };

  return (
    <div>
      <LoadingBlur fetchState={fetchState}>
        <AuthStyles className="card">
          <header>Welcome back!</header>
          <FormStyles onSubmit={handleSubmit}>
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
            <button type="submit">Login</button>
          </FormStyles>
          <footer>
            Need an account? <Link to="/register">Register</Link>
          </footer>
        </AuthStyles>
      </LoadingBlur>
    </div>
  );
}
