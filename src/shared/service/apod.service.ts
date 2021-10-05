/* import { Apod } from '../models/Apod.model';
import { Observable, from } from 'rxjs'; */

import { Apod } from '../models/Apod.model';

const APOD_API_URL = 'https://api.nasa.gov/planetary/apod';
const APOD_API_KEY_LBL = 'api_key';
const APOD_API_FULL_URL =
    APOD_API_URL +
    '?' +
    APOD_API_KEY_LBL +
    '=' +
    process.env.REACT_APP_APOD_API_KEY;

export const apodService = (): Promise<Apod> => {
    return fetch(APOD_API_FULL_URL).then((response) => response.json());
};

/* export const apodServiceObs = (): Observable<Apod> => {
    return from(fetch(APOD_API_FULL_URL)
    .then((res as Apod) => {
        return {
            res.date,
        }
    })); 
};*/
