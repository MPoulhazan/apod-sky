import React from 'react';
import './Config.scss';
import { Logo } from '../../shared/components/Logo/logo';
import { Input } from '../../shared/components/Input/Input';
import { checkValidTokenFormat } from '../../shared/service/form-control.service';
import {
    getApodTokenInLocalStorage,
    saveApodTokenInLocalStorage,
} from '../../shared/service/localstorage.service';
import { HOME_PATH } from '../../shared/models/Constants';

const Config = () => {
    const goToHome = () => window.open(HOME_PATH, '_self');
    const checkValidToken = (token: string) => checkValidTokenFormat(token);
    const saveToken = (token: string) => saveApodTokenInLocalStorage(token);
    const savedToken = getApodTokenInLocalStorage();

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
                users
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
                ></Input>
            </div>
        </div>
    );
};

export default Config;
