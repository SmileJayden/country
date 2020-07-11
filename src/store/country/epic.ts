import {
  CountryType,
  FAIL_FETCH_COUNTRIES,
  INIT_FETCH_COUNTRIES,
  SUCCESS_FETCH_COUNTRIES,
  SuccessFetchCountries,
} from '~/store/country/index';
import axios, { AxiosResponse } from 'axios';
import { ActionsObservable, combineEpics, ofType } from 'redux-observable';
import { Action } from 'redux';
import { catchError, switchMap } from 'rxjs/operators';

const URL =
  'https://restcountries.eu/rest/v2/all?fields=alpha2Code;capital;name;region;callingCodes';

const fetchCountriesEpic = (action$: ActionsObservable<Action>) => {
  return action$.pipe(
    ofType(INIT_FETCH_COUNTRIES),
    switchMap(
      async (action): Promise<SuccessFetchCountries> => {
        console.log('mergeMap action', action);
        const res: CountryType[] = await axios
          .get(URL)
          .then((res: AxiosResponse) => res.data);
        return { type: SUCCESS_FETCH_COUNTRIES, payload: { countries: res } };
      }
    ),
    catchError((err) =>
      Promise.resolve({ type: FAIL_FETCH_COUNTRIES, message: err.message })
    )
  );
};

const countryEpic = combineEpics(fetchCountriesEpic);

export default countryEpic;
