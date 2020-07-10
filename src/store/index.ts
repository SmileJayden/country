import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
import countryReducer from './country';
import countryEpic from './country/epic';

export const rootReducer = combineReducers({
  country: countryReducer,
});

export const rootEpic = combineEpics([countryEpic]);

export type RootState = ReturnType<typeof rootReducer>;
