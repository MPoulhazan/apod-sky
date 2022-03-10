import { checkTokenValue } from './apod.service';

const invalidLengthMsg = 'Token size should be 40 characters';

export interface FormControlState {
    valid: boolean;
    message?: string;
}

export const checkValidTokenFormat = (token: string): FormControlState => {
    if (token.length !== 40) {
        return { valid: false, message: invalidLengthMsg };
    }
    return { valid: true, message: '' };
};

export const checkValidTokenValue = (token: string): Promise<boolean> => {
    return checkTokenValue(token);
};
