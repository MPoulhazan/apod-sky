const APOD_TOKEN_NAME = 'apod_token';

export const saveInLocalStorage = (key: string, value: string): void => {
    localStorage.setItem(key, JSON.stringify(value));
};

export const getInLocalStorage = (key: string): string => {
    return localStorage.getItem(key) || '';
};

export const removeInLocalStorage = (key: string): void => {
    localStorage.removeItem(key);
};

export const saveApodTokenInLocalStorage = (value: string): void => {
    saveInLocalStorage(APOD_TOKEN_NAME, value);
};

export const getApodTokenInLocalStorage = (): string => {
    return getInLocalStorage(APOD_TOKEN_NAME);
};

export const removeApodTokenInLocalStorage = (): void => {
    removeInLocalStorage(APOD_TOKEN_NAME);
};
