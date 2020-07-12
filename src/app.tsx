import React, { useEffect } from 'react';
import '~/assets/css/main.css';
import { useDispatch, useSelector } from 'react-redux';
import {} from 'styled-components/cssprop';
import styled from 'styled-components';
import { RootState } from '~/store';
import { CountryType, INIT_FETCH_COUNTRIES } from '~/store/country';
import CountryTable from '~/components/CountryTable';
import CountryForm from '~/components/CountryForm';

const AppWrapper = styled.div`
  display: flex;
`;

const App = () => {
  const loading: boolean = useSelector(
    (state: RootState) => state.country.loading
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: INIT_FETCH_COUNTRIES });
  }, []);

  return (
    <>
      <AppWrapper>
        <CountryForm />
        <div>
          <h2>"Hello Countries ^^@"</h2>
          <h2>{loading ? 'loading true' : 'loading false'}</h2>
          <h1>Awesome Countries!!</h1>
          <CountryTable />
        </div>
      </AppWrapper>
    </>
  );
};
export default App;
