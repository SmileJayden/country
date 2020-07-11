import React, { useEffect } from 'react';
import { RootState } from './store';
import { useDispatch, useSelector } from 'react-redux';
import { CountryType, INIT_FETCH_COUNTRIES } from '~/store/country';

const App = () => {
  const countries: CountryType[] = useSelector(
    (state: RootState) => state.country.countries
  );
  const loading: boolean = useSelector(
    (state: RootState) => state.country.loading
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: INIT_FETCH_COUNTRIES });
  }, []);

  return (
    <>
      <h2>"Hello Countries ^^@"</h2>
      <div>
        <h2>{loading ? 'loading true' : 'loading false'}</h2>
        <h1>Awesome Countries!!</h1>
        <div>{JSON.stringify(countries, null, 4)}</div>
      </div>
      <div>love recoil</div>
    </>
  );
};
export default App;
