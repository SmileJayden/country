import React from 'react';
import { RootState } from '@/store';
import { useSelector } from 'react-redux';

const App = () => {
  const result: any = useSelector((state: RootState) => state.country);
  console.log('result', result);
  return (
    <>
      <h2>"Hello Countries ^^@"</h2>
      <div>
        hi redux ^^@
        <div>{JSON.stringify(result, null, 4)}</div>
      </div>
      <div>love recoil</div>
    </>
  );
};
export default App;
