const invalidLengthMsg = 'Token size should be 40 characters';

export interface FormControlState {
    valid: boolean;
    message?: string;
}

export const checkValidTokenFormat = (token: string): FormControlState => {
    console.log(token);
    if (token.length !== 40) {
        return { valid: false, message: invalidLengthMsg };
    }
    return { valid: true, message: '' };
};

export const checkValidTokenValue = (token: string): FormControlState => {
    return { valid: false, message: '' };
};
