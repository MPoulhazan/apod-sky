import React, { useState } from 'react';
import './Config.scss';
import { Logo } from '../../shared/components/Logo/logo';
import { Input } from '../../shared/components/Input/Input';
import {
    checkValidTokenFormat,
    checkValidTokenValue,
} from '../../shared/service/form-control.service';
import {
    getApodTokenInLocalStorage,
    removeApodTokenInLocalStorage,
    saveApodTokenInLocalStorage,
} from '../../shared/service/localstorage.service';
import { HOME_PATH } from '../../shared/models/Constants';

const Config = () => {
    const [checkaction, setCheckaction] = useState(false);
    const [tokenValueValid, setTokenValueValid] = useState(true);

    const goToHome = () => window.open(HOME_PATH, '_self');
    const checkValidToken = (token: string) => checkValidTokenFormat(token);
    const saveToken = (token: string) => checkTokenValueAndSave(token);
    const clearToken = () => removeApodTokenInLocalStorage();
    const savedToken = getApodTokenInLocalStorage();

    const checkTokenValueAndSave = (token: string) => {
        setCheckaction(true);
        checkValidTokenValue(token).then((valid) => {
            if (valid) {
                setTokenValueValid(true);
                saveApodTokenInLocalStorage(token);
            } else {
                setTokenValueValid(false);
            }
        });
    };

    !checkaction &&
        checkValidTokenValue(savedToken).then((valid) =>
            setTokenValueValid(valid)
        );

    return (
        <div className="config">
            <Logo isLoaded={true} initHome={goToHome} />
            <span>
                The datas of this websites are free provided by{' '}
                <a
                    href="https://api.nasa.gov/"
                    target="_blank"
                    className="link"
                >
                    NASA Open APIs
                </a>
                . Nevertheless, the number of requests are limited for each
                users. Without token configured, your will be limited by demo
                token quota. Please create your own token{' '}
                <a
                    href="https://api.nasa.gov/"
                    target="_blank"
                    className="link"
                >
                    here
                </a>{' '}
                just with complete the form Generate API Key, it's free and take
                2 minutes.
            </span>
            <div className="form-container">
                <Input
                    name="Token APOD"
                    defaultValue={savedToken}
                    placeholder="A0b1C2dEFGhiJkLmnoPqRstuV3W4Xyza5bcDEfGH"
                    displayCheck={true}
                    displayUncheck={true}
                    formAction={checkValidToken}
                    checkAction={saveToken}
                    clearAction={clearToken}
                ></Input>
                <div className="field-token-status">
                    <div className="label">Token status</div>
                    {!savedToken && !checkaction ? (
                        <span>To configure</span>
                    ) : tokenValueValid ? (
                        <span>Valid</span>
                    ) : (
                        <span>Invalid</span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Config;
