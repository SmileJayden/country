import React from 'react';
import { CountryType } from '~/store/country';
import { useSelector } from 'react-redux';
import { RootState } from '~/store';
import CountryRow from '~/components/CountryRow';

const CountryTable = () => {
  const countries: CountryType[] = useSelector(
    (state: RootState) => state.country.countries
  );

  return (
    <>
      <table className={'table-header'}>
        <thead>
          <tr>
            <th>이름</th>
            <th>코드</th>
            <th>ID</th>
            <th>수도</th>
            <th>대륙</th>
          </tr>
        </thead>
      </table>
      <table className={'table-body'}>
        <tbody>
          {countries.map((country, i) => (
            <CountryRow
              key={`table-row-${i}`}
              name={country.name}
              alpha2Code={country.alpha2Code}
              callingCodes={country.callingCodes}
              capital={country.capital}
              region={country.region}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};
export default CountryTable;
