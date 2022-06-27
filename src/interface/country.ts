export interface ICountry {
    code: string;
    name: string;
}

export interface ICountryStoreState {
    countries: ICountry[];
    loading: boolean;
    error: boolean;
}

export interface IListApiResponse {
    countries: ICountry[]
}