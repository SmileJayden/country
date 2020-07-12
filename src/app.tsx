import React, { useEffect } from 'react';
import { RootState } from './store';
import {} from 'styled-components/cssprop';
import { useDispatch, useSelector } from 'react-redux';
import { CountryType, INIT_FETCH_COUNTRIES } from '~/store/country';
import CountryTable from '~/components/CountryTable';
import CountryForm from '~/components/CountryForm';

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
      <CountryForm />
      <h2>"Hello Countries ^^@"</h2>
      <div>
        <h2>{loading ? 'loading true' : 'loading false'}</h2>
        <h1>Awesome Countries!!</h1>
        <CountryTable />
      </div>
      <div>love recoil</div>
    </>
  );
};
export default App;
