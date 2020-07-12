import React, { useEffect } from 'react';
import '~/assets/css/main.css';
import { useDispatch, useSelector } from 'react-redux';
import {} from 'styled-components/cssprop';
import styled from 'styled-components';
import { initFetchCountries } from '~/store/country';
import CountryTable from '~/components/CountryTable';
import CountryForm from '~/components/CountryForm';
import CountrySearchEngine from '~/components/CountrySearchEngine';

const AppWrapper = styled.div`
  display: flex;
  .engine-table-wrapper {
    padding: 10px;
  }
`;

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initFetchCountries());
  }, []);

  return (
    <>
      <AppWrapper>
        <CountryForm />
        <div className={'engine-table-wrapper'}>
          <CountrySearchEngine />
          <CountryTable />
        </div>
      </AppWrapper>
    </>
  );
};
export default App;
