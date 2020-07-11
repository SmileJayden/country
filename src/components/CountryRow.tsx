import React from 'react';
import { CountryType } from '~/store/country';

const CountryRow: React.FC<CountryType> = ({
  name,
  alpha2Code,
  callingCodes,
  capital,
  region,
}) => {
  // const country = props.country;
  return (
    <tr>
      <td>{name}</td>
      <td>{alpha2Code}</td>
      <td>{callingCodes}</td>
      <td>{capital}</td>
      <td>{region}</td>
    </tr>
  );
};

export default CountryRow;
