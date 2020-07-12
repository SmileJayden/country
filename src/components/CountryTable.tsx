import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import uuid from 'uuid';
import { CountryType, REMOVE_COUNTRY, removeCountry } from '~/store/country';

import { RootState } from '~/store';

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

    .fade-enter {
      max-height: 0;
      opacity: 0;
    }

    .fade-enter-active {
      max-height: 30px;
      opacity: 1;
      transition: all 500ms;
    }

    .fade-exit {
      max-height: 30px;
      opacity: 1;
    }

    .fade-exit-active {
      max-height: 0;
      opacity: 0;
      transition: all 500ms;
    }
  }
`;

const CountryTable = () => {
  const countries: CountryType[] = useSelector(
    (state: RootState) => state.country.countries
  );
  const loading: boolean = useSelector(
    (state: RootState) => state.country.loading
  );
  const dispatch = useDispatch();
  const handleBtnOnClick = (uuid: string) => {
    dispatch(removeCountry(uuid));
  };

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
        {loading ? (
          <div>로딩 중 ^^@</div>
        ) : (
          <TransitionGroup component={null}>
            {countries.map((country, i) => (
              <CSSTransition
                timeout={500}
                classNames="fade"
                key={`table-row-${country.uuid}`}
              >
                <div className="tr">
                  <div className="td name">{country.name}</div>
                  <div className="td code">{country.alpha2Code}</div>
                  <div className="td id">{country.callingCodes[0]}</div>
                  <div className="td capital">{country.capital}</div>
                  <div className="td region">{country.region}</div>
                  <div className="td extra">
                    <button onClick={() => handleBtnOnClick(country.uuid)}>
                      삭제
                    </button>
                  </div>
                </div>
              </CSSTransition>
            ))}
          </TransitionGroup>
        )}
      </div>
    </TableWrapper>
  );
};
export default CountryTable;
