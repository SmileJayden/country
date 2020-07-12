import React from 'react';
import { CountryType } from '~/store/country';
import { useDispatch } from 'react-redux';

const CountryRow: React.FC<CountryType> = ({
  name,
  alpha2Code,
  callingCodes,
  capital,
  region,
}) => {
  return (
    <tr>
      <td>{name}</td>
      <td>{alpha2Code}</td>
      <td>{callingCodes}</td>
      <td>{capital}</td>
      <td>{region}</td>
      <td>
        <button>삭제</button>
      </td>
    </tr>
  );
};

export default CountryRow;
