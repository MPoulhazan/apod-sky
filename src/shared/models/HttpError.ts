export enum errorCode {
    INVALID_TOKEN,
    UNKNOWN_ERROR,
}

export interface HttpError {
    code: errorCode;
    message: string;
}
