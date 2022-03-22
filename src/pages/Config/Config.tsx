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
import { Social } from '../../shared/components/Social/Social';
import {
    IoCheckmarkCircleSharp,
    IoCloseCircleSharp,
    IoLogoPaypal,
    IoWarning,
} from 'react-icons/io5';

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
                2 minutes. This action has to be done just once.
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
                    <div className="status-icon">
                        {!savedToken && !checkaction ? (
                            <span>
                                <IoWarning className="warn-icon" />
                                <span>
                                    You APOD token is not configured yet, you
                                    will be limited by demo limits
                                </span>
                            </span>
                        ) : tokenValueValid ? (
                            <span>
                                <IoCheckmarkCircleSharp className="valid-icon" />
                                <span>You APOD token is valid</span>
                            </span>
                        ) : (
                            <span>
                                <IoCloseCircleSharp className="invalid-icon" />
                                <span>
                                    You APOD token is not valid, please check it
                                </span>
                            </span>
                        )}
                    </div>
                </div>
                <div className="like">
                    You like this application? You can help us{' '}
                    <a href={process.env.REACT_APP_URL_PAYPAL} target="_blank">
                        <IoLogoPaypal className="paypal-logo" />
                    </a>
                </div>
                <Social />
            </div>
        </div>
    );
};

export default Config;
