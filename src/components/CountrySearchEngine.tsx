import React, { ChangeEvent } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~/store';
import { updateInputValue } from '~/store/country';

const EngineWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  p {
    margin-left: 30px;
  }
`;

const InputWrapper = styled.input`
  width: 400px;
  padding: 8px;
`;

const CountrySearchEngine = () => {
  const dispatch = useDispatch();
  const inputValue: string = useSelector(
    (state: RootState) => state.country.inputValue
  );
  const searchLoading: boolean = useSelector(
    (state: RootState) => state.country.searchLoading
  );
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(updateInputValue(e.target.value));
  };

  return (
    <EngineWrapper>
      <InputWrapper
        value={inputValue}
        onChange={handleOnChange}
        placeholder={'한 번, 검색해보실라우?'}
      />
      {searchLoading && <p>검색중 ^^@</p>}
    </EngineWrapper>
  );
};

export default CountrySearchEngine;
