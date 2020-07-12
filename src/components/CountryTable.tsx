import React from 'react';
import { CountryType } from '~/store/country';
import { useSelector } from 'react-redux';
import { RootState } from '~/store';
import styled from 'styled-components';

const TableWrapper = styled.div`
  &.table {
    margin: 30px;
    border: 1px solid darkgoldenrod;
  }

  .thead {
    background-color: beige;
  }

  .tr {
    display: flex;
    align-items: center;
    width: calc(100vw - 500px);
    .name {
      width: 40%;
    }
    .code {
      width: 10%;
    }
    .id {
      width: 10%;
    }
    .capital {
      width: 15%;
    }
    .region {
      width: 15%;
    }
    .extra {
      width: 10%;
    }
    .td {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      button {
        cursor: pointer;
      }
    }
    .th,
    .td {
      padding: 8px;
    }
    .th + .th,
    .td + .td {
      margin-left: 20px;
    }
  }

  .tbody {
    display: flex;
    flex-direction: column;
    height: calc(100vh - 200px);
    overflow-y: auto;
    .tr:hover {
      background-color: cornsilk;
    }
  }
`;

const CountryTable = () => {
  const countries: CountryType[] = useSelector(
    (state: RootState) => state.country.countries
  );

  return (
    <TableWrapper className="table">
      <div className="thead">
        <div className="tr">
          <div className="th name">이름</div>
          <div className="th code">코드</div>
          <div className="th id">ID</div>
          <div className="th capital">수도</div>
          <div className="th region">대륙</div>
          <div className="th extra" />
        </div>
      </div>
      <div className="tbody">
        {countries.map((country, i) => (
          <div className="tr" key={`table-row-${i}`}>
            <div className="td name">{country.name}</div>
            <div className="td code">{country.alpha2Code}</div>
            <div className="td id">{country.callingCodes[0]}</div>
            <div className="td capital">{country.capital}</div>
            <div className="td region">{country.region}</div>
            <div className="td extra">
              <button>삭제</button>
            </div>
          </div>
        ))}
      </div>
    </TableWrapper>
  );
};
export default CountryTable;
