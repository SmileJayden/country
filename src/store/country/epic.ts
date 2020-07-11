import {
  INIT_FETCH_COUNTRIES,
  successFetchCountries,
  failFetchCountries,
} from './index';
import { ActionsObservable, combineEpics, ofType } from 'redux-observable';
import { Action } from 'redux';
import { map, mapTo } from 'rxjs/operators';

const fetchCountriesEpic = (action$: ActionsObservable<Action>) => {
  return action$.pipe(ofType(INIT_FETCH_COUNTRIES), map(successFetchCountries));
};

const countryEpic = combineEpics(fetchCountriesEpic);

export default countryEpic;
