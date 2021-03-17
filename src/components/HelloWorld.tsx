import axios, { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Spinner from './Spinner';

const HelloWorldStyles = styled.div`
  min-width: 256px;
  min-height: 256px;
  padding: 4rem;
  display: grid;
  grid-template-rows: auto 1fr auto;
  align-items: center;
  justify-items: center;
  background-color: var(--darker);
  box-shadow: 4px 4px 16px var(--shadow-color);

  p {
    margin: 0;
    margin-bottom: 2rem;
  }
`;

interface FetchState {
  status: 'idle' | 'pending' | 'success' | 'failed';
  payload?: string | Record<string, unknown>;
  error?: string;
}

const defaultFetchState: FetchState = {
  status: 'idle',
};

export default function HelloWorld(): JSX.Element {
  const [fetchState, setFetchState] = useState(defaultFetchState);

  const showSpinner = fetchState.status === 'idle' || fetchState.status === 'pending';

  const fetchData = () => {
    if (fetchState.status !== 'pending') {
      setFetchState({ status: 'pending' });
      axios
        .get<string>('/api/hello')
        .then(res => setFetchState({ status: 'success', payload: res.data }))
        .catch((err: AxiosError) => setFetchState({ status: 'failed', error: err.message }));
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(fetchData, []);

  return (
    <HelloWorldStyles>
      <p>Backend says:</p>
      <>
        {showSpinner && <Spinner />}
        {fetchState.status === 'success' && <p>{fetchState.payload}</p>}
        {fetchState.status === 'failed' && <p>Error: {fetchState.error}</p>}
      </>
      <button type="button" onClick={fetchData}>
        Fetch again
      </button>
    </HelloWorldStyles>
  );
}
