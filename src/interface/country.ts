export interface ICountry {
    code: string;
    name: string;
}

export interface ICountryStoreState {
    countries: ICountry[];
    loading: boolean;
    error: boolean;
    page: number;
    size: number;
}

export interface IListApiResponse {
    countries: ICountry[]
}