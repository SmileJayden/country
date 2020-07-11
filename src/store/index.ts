import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
import countryReducer from '~/store/country';
import countryEpic from '~/store/country/epic';

export const rootReducer = combineReducers({
  country: countryReducer,
});

export const rootEpic = combineEpics(countryEpic);

export type RootState = ReturnType<typeof rootReducer>;
