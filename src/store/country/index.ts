// action types
export const INIT_FETCH_COUNTRIES = 'INIT_FETCH_COUNTRIES';
export const SUCCESS_FETCH_COUNTRIES = 'SUCCESS_FETCH_COUNTRIES';
export const FAIL_FETCH_COUNTRIES = 'FAIL_FETCH_COUNTRIES';
export const SORT_COUNTRIES = 'SORT_COUNTRIES';
export const REMOVE_COUNTRY = 'REMOVE_COUNTRY';

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
    sortBy: string;
  };
}

export interface RemoveCountry {
  type: typeof REMOVE_COUNTRY;
  payload: {
    countryId: number;
  };
}

export type CountryActionTypes =
  | InitFetchCountries
  | SuccessFetchCountries
  | FailFetchCountries
  | SortCountries
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

export const sortCountries = (sortBy: string): SortCountries => ({
  type: SORT_COUNTRIES,
  payload: { sortBy },
});

export const removeCountry = (countryId: number): RemoveCountry => ({
  type: REMOVE_COUNTRY,
  payload: { countryId },
});

// state interface
export interface CountryState {
  loading: boolean;
  countries: CountryType[];
}

export interface CountryType {
  name: string;
  alpha2Code: string;
  callingCodes: string[];
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
      console.log('SORT_COUNTRIES action is come');
      return state;
    case REMOVE_COUNTRY:
      console.log('REMOVE_COUNTRY action is come');
      return state;
    default:
      return state;
  }
};

export default countryReducer;
