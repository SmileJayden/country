import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import {
  CountryType,
  flipCountries,
  removeCountry,
  SortBy,
  sortCountries,
} from '~/store/country';

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
    .th:not(.extra) {
      cursor: pointer;
      &:hover {
        background-color: burlywood;
        color: beige;
      }

      &.asc::after {
        content: ' ';
        height: 0;
        border-top: 10px solid;
        border-left: 5px solid rgba(0, 0, 0, 0);
        border-right: 5px solid rgba(0, 0, 0, 0);
        color: chocolate;
        top: 18px;
        left: 10px;
        position: relative;
      }
      &.desc::after {
        content: ' ';
        height: 0;
        border-bottom: 10px solid;
        border-left: 5px solid rgba(0, 0, 0, 0);
        border-right: 5px solid rgba(0, 0, 0, 0);
        color: chocolate;
        bottom: 16px;
        left: 10px;
        position: relative;
      }
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
    .tr {
      flex: 1 0 auto; // for safari
      &:hover {
        background-color: cornsilk;
      }
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
  const currSortBy: SortBy | undefined = useSelector(
    (state: RootState) => state.country.sortBy
  );
  const sortDirection: boolean = useSelector(
    (state: RootState) => state.country.sortDirection
  );
  const loading: boolean = useSelector(
    (state: RootState) => state.country.loading
  );
  const dispatch = useDispatch();
  const handleBtnOnClick = (uuid: string) => {
    dispatch(removeCountry(uuid));
  };
  const handleSortOnClick = (sortBy: SortBy) => {
    if (sortBy === currSortBy) dispatch(flipCountries());
    else dispatch(sortCountries(sortBy));
  };
  const sortDirector = (colName: SortBy): string => {
    if (colName === currSortBy) {
      if (sortDirection) return 'asc';
      return 'desc';
    }
    return '';
  };

  return (
    <TableWrapper className="table">
      <div className="thead">
        <div className="tr">
          <div
            className={'th name ' + sortDirector(SortBy.name)}
            onClick={() => handleSortOnClick(SortBy.name)}
          >
            이름
          </div>
          <div
            className={'th code ' + sortDirector(SortBy.alpha2Code)}
            onClick={() => handleSortOnClick(SortBy.alpha2Code)}
          >
            코드
          </div>
          <div
            className={'th id ' + sortDirector(SortBy.callingCodes)}
            onClick={() => handleSortOnClick(SortBy.callingCodes)}
          >
            ID
          </div>
          <div
            className={'th capital ' + sortDirector(SortBy.capital)}
            onClick={() => handleSortOnClick(SortBy.capital)}
          >
            수도
          </div>
          <div
            className={'th region ' + sortDirector(SortBy.region)}
            onClick={() => handleSortOnClick(SortBy.region)}
          >
            대륙
          </div>
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
                  <div className="td id">{country.callingCodes}</div>
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
