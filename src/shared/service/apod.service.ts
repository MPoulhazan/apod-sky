/* import { Apod } from '../models/Apod.model';
import { Observable, from } from 'rxjs'; */

import { Subject } from 'rxjs-compat';
import { Apod } from '../models/Apod.model';
import { INVALID_TOKEN_MSG, UNKNOWN_ERROR_MSG } from '../models/Constants';
import { errorCode, HttpError } from '../models/HttpError';
import { getApodTokenInLocalStorage } from './localstorage.service';

const APOD_API_URL = 'https://api.nasa.gov/planetary/apod';
const APOD_API_KEY_LBL = 'api_key';
const TOKEN_APOD =
    getApodTokenInLocalStorage() || process.env.REACT_APP_APOD_API_KEY;
const APOD_API_FULL_URL =
    APOD_API_URL + '?' + APOD_API_KEY_LBL + '=' + TOKEN_APOD;

// export const isPlayRandom$ = new BehaviorSubject<boolean>(false);
export const isPlayRandom$: Subject<boolean> = new Subject<boolean>();

export const getTodayPicture = (): Promise<Apod | HttpError> => {
    return fetch(APOD_API_FULL_URL).then((response) => {
        console.log('OOOK', JSON.stringify(response));

        if (response.status >= 200 && response.status < 204) {
            return response.json();
        } else if (response.status === 403) {
            return Promise.reject({
                code: errorCode.INVALID_TOKEN,
                message: INVALID_TOKEN_MSG,
            } as HttpError);
        } else {
            return Promise.reject({
                code: errorCode.UNKNOWN_ERROR,
                message: UNKNOWN_ERROR_MSG,
            } as HttpError);
        }
    });
};

export const getRandomPicture = (): Promise<Apod> => {
    return fetch(APOD_API_FULL_URL + '&count=1').then((response) =>
        response.json()
    );
};

/* export const apodServiceObs = (): Observable<Apod> => {
    return from(fetch(APOD_API_FULL_URL)
    .then((res as Apod) => {
        return {
            res.date,
        }
    })); 
};*/
