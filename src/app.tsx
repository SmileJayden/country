import React from 'react';
import { RootState } from './store';
import { useDispatch, useSelector } from 'react-redux';
import { INIT_FETCH_COUNTRIES } from '~/store/country';

const App = () => {
  const result: any = useSelector((state: RootState) => state.country);
  const dispatch = useDispatch();

  const onClickHandle = () => {
    dispatch({ type: INIT_FETCH_COUNTRIES });
  };

  console.log('result', result);
  return (
    <>
      <h2>"Hello Countries ^^@"</h2>
      <div>
        hi redux ^^@
        <button onClick={() => onClickHandle()}>Dispatch</button>
        <div>{JSON.stringify(result, null, 4)}</div>s
      </div>
      <div>love recoil</div>
    </>
  );
};
export default App;
