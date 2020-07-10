// action types
const FETCH_COUNTRIES = 'FETCH_COUNTIES';
const SORT_COUNTRIES = 'SORT_COUNTRIES';
const REMOVE_COUNTRY = 'REMOVE_COUNTRY';

interface FetchCountries {
  type: typeof FETCH_COUNTRIES;
  payload: {};
}

interface SortCountries {
  type: typeof SORT_COUNTRIES;
  payload: {
    sortBy: string;
  };
}

interface RemoveCountry {
  type: typeof REMOVE_COUNTRY;
  payload: {
    countryId: number;
  };
}

export type CountryActionTypes = FetchCountries | SortCountries | RemoveCountry;

// action functions
export const fetchCountries = (): FetchCountries => ({
  type: FETCH_COUNTRIES,
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
  countries: CountryType[];
}

interface CountryType {
  name: string;
  alpha2Code: string;
  callingCodes: string[];
  capital: string;
  region: string;
}

// init state
const initState: CountryState = {
  countries: [
    {
      name: 'Afghanistan',
      alpha2Code: 'AF',
      callingCodes: ['93'],
      capital: 'Kabul',
      region: 'Asia',
    },
    {
      name: 'Åland Islands',
      alpha2Code: 'AX',
      callingCodes: ['358'],
      capital: 'Mariehamn',
      region: 'Europe',
    },
  ],
};

// reducer
const countryReducer = (
  state: CountryState = initState,
  action: CountryActionTypes
): CountryState => {
  switch (action.type) {
    case FETCH_COUNTRIES:
      return state;
    case SORT_COUNTRIES:
      return state;
    case REMOVE_COUNTRY:
      return state;
    default:
      return state;
  }
};

export default countryReducer;
