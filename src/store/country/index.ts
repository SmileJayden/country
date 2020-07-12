import { v4 as uuid } from 'uuid';
import sortBy from 'lodash/sortBy';

// action types
export const INIT_FETCH_COUNTRIES = 'INIT_FETCH_COUNTRIES';
export const SUCCESS_FETCH_COUNTRIES = 'SUCCESS_FETCH_COUNTRIES';
export const FAIL_FETCH_COUNTRIES = 'FAIL_FETCH_COUNTRIES';
export const SORT_COUNTRIES = 'SORT_COUNTRIES';
export const ADD_COUNTRY = 'ADD_COUNTRY';
export const REMOVE_COUNTRY = 'REMOVE_COUNTRY';

export interface CountryFormType {
  name: string;
  alpha2Code: string;
  callingCodes: string;
  capital: string;
  region: RegionEnum;
}

export enum SortBy {
  name = 'name',
  alpha2Code = 'alpha2Code',
  callingCodes = 'callingCodes',
  capital = 'capital',
  region = 'region',
}

enum RegionEnum {
  Africa = 'Africa',
  Asia = 'Asia',
  Americas = 'Americas',
  Europe = 'Europe',
  Oceania = 'Oceania',
}

export interface InitFetchCountries {
  type: typeof INIT_FETCH_COUNTRIES;
  payload: {};
}

export interface SuccessFetchCountries {
  type: typeof SUCCESS_FETCH_COUNTRIES;
  payload: {
    countries: CountryType[];
  };
}

export interface FailFetchCountries {
  type: typeof FAIL_FETCH_COUNTRIES;
  payload: {};
}

export interface SortCountries {
  type: typeof SORT_COUNTRIES;
  payload: {
    sortBy: SortBy;
  };
}

export interface AddCountry {
  type: typeof ADD_COUNTRY;
  payload: {
    country: CountryFormType;
  };
}

export interface RemoveCountry {
  type: typeof REMOVE_COUNTRY;
  payload: {
    countryUuid: string;
  };
}

export type CountryActionTypes =
  | InitFetchCountries
  | SuccessFetchCountries
  | FailFetchCountries
  | SortCountries
  | AddCountry
  | RemoveCountry;

// action functions
export const initFetchCountries = (): InitFetchCountries => ({
  type: INIT_FETCH_COUNTRIES,
  payload: {},
});

export const successFetchCountries = (
  countries: CountryType[]
): SuccessFetchCountries => ({
  type: SUCCESS_FETCH_COUNTRIES,
  payload: { countries },
});

export const failFetchCountries = (): FailFetchCountries => ({
  type: FAIL_FETCH_COUNTRIES,
  payload: {},
});

export const sortCountries = (sortBy: SortBy): SortCountries => ({
  type: SORT_COUNTRIES,
  payload: { sortBy },
});

export const addCountry = (countryFormData: CountryFormType): AddCountry => ({
  type: ADD_COUNTRY,
  payload: { country: countryFormData },
});

export const removeCountry = (countryUuid: string): RemoveCountry => ({
  type: REMOVE_COUNTRY,
  payload: { countryUuid },
});

// state interface
export interface CountryState {
  loading: boolean;
  countries: CountryType[];
}

export interface CountryType {
  uuid: string;
  name: string;
  alpha2Code: string;
  callingCodes: string;
  capital: string;
  region: string;
}

// init state
const initState: CountryState = {
  loading: false,
  countries: [],
};

// reducer
const countryReducer = (
  state: CountryState = initState,
  action: CountryActionTypes
): CountryState => {
  switch (action.type) {
    case INIT_FETCH_COUNTRIES:
      console.log('INIT_FETCH_COUNTRIES action is come');
      return { ...state, loading: true };
    case SUCCESS_FETCH_COUNTRIES:
      console.log(
        'SUCCESS_FETCH_COUNTRIES action is come',
        action.payload.countries
      );
      return { loading: false, countries: action.payload.countries };
    case FAIL_FETCH_COUNTRIES:
      console.log('FAIL_FETCH_COUNTRIES action is come');
      return { loading: false, countries: [] };
    case SORT_COUNTRIES:
      return {
        ...state,
        countries: sortBy(state.countries, action.payload.sortBy),
      };
    case 'ADD_COUNTRY':
      const addedCountry: CountryType = {
        ...action.payload.country,
        uuid: uuid(),
      };
      return { ...state, countries: [addedCountry].concat(state.countries) };
    case REMOVE_COUNTRY:
      const targetUuid = action.payload.countryUuid;
      return {
        ...state,
        countries: state.countries.filter((ctr) => ctr.uuid !== targetUuid),
      };
    default:
      return state;
  }
};

export default countryReducer;
