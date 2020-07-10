import { Observable } from 'rxjs';
import { CountryActionTypes } from './index';
import { combineEpics, Epic, StateObservable } from 'redux-observable';

export const fetchCountriesEpic: Epic<any, any, any, any> = (
  action$,
  state$
): any => {
  return new Observable();
};

const countryEpic = combineEpics([fetchCountriesEpic]);

export default countryEpic;
