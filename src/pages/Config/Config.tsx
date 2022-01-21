import React from 'react';
import './Config.scss';
import { Logo } from '../../shared/components/Logo/logo';
import { Input } from '../../shared/components/Input/Input';
import { checkValidTokenFormat } from '../../shared/service/form-control.service';
import { saveApodTokenInLocalStorage } from '../../shared/service/localstorage.service';
// import { saveApodTokenInLocalStorage } from '../../shared/service/localstorage.service';

const Config = () => {
    const goToHome = () => window.open('/', '_self');
    //const saveToken = (token: string) => saveApodTokenInLocalStorage(token);
    const checkValidToken = (token: string) => checkValidTokenFormat(token);
    const saveToken = (token: string) => saveApodTokenInLocalStorage(token);

    return (
        <div className="config">
            <Logo isLoaded={true} initHome={goToHome} />
            <div className="form-container">
                <Input
                    name="Token APOD"
                    value="dzzd"
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
