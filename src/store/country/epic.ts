import {
  CountryType,
  SuccessFetchCountries,
  INIT_FETCH_COUNTRIES,
  SUCCESS_FETCH_COUNTRIES,
  FAIL_FETCH_COUNTRIES,
  UPDATE_INPUT_VALUE,
  UPDATE_SEARCH_VALUE,
} from '~/store/country/index';
import axios, { AxiosResponse } from 'axios';
import { v4 as uuid } from 'uuid';
import { ActionsObservable, combineEpics, ofType } from 'redux-observable';
import { Action } from 'redux';
import { catchError, debounceTime, flatMap, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

interface CountryResponseType {
  name: string;
  alpha2Code: string;
  callingCodes: string[];
  capital: string;
  region: string;
}

const URL =
  'https://restcountries.eu/rest/v2/all?fields=alpha2Code;capital;name;region;callingCodes';

const fetchCountriesEpic = (action$: ActionsObservable<Action>) => {
  return action$.pipe(
    ofType(INIT_FETCH_COUNTRIES),
    switchMap(
      async (action): Promise<SuccessFetchCountries> => {
        const res: CountryType[] = await axios
          .get(URL)
          .then((res: AxiosResponse) =>
            res.data.map((ctr: CountryResponseType) => ({
              uuid: uuid(),
              alpha2Code: ctr.alpha2Code ? ctr.alpha2Code : '-',
              name: ctr.name ? ctr.name : '-',
              callingCode: Number.parseInt(ctr.callingCodes[0])
                ? Number.parseInt(ctr.callingCodes[0])
                : 0,
              capital: ctr.capital ? ctr.capital : '-',
              region: ctr.region ? ctr.region : '-',
            }))
          );
        return { type: SUCCESS_FETCH_COUNTRIES, payload: { countries: res } };
      }
    ),
    catchError((err) =>
      Promise.resolve({
        type: FAIL_FETCH_COUNTRIES,
        payload: { errMsg: err.message },
      })
    )
  );
};

const searchCountriesEpic = (action$: ActionsObservable<Action>) => {
  return action$.pipe(
    ofType(UPDATE_INPUT_VALUE),
    debounceTime(500),
    switchMap(() => of({ type: UPDATE_SEARCH_VALUE }))
  );
};

const countryEpic = combineEpics(fetchCountriesEpic, searchCountriesEpic);

export default countryEpic;
