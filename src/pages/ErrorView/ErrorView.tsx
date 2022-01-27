import React from 'react';
import './ErrorView.scss';
import { Logo } from '../../shared/components/Logo/logo';
import { CONFIG_PATH, HOME_PATH } from '../../shared/models/Constants';
import { HttpError } from '../../shared/models/HttpError';

interface Props {
    error: HttpError;
}

const ErrorView = (props: Props) => {
    const goToHome = () => window.open(HOME_PATH, '_self');
    const goToConfig = () => window.open(CONFIG_PATH, '_self');

    return (
        <div className="config">
            <Logo isLoaded={true} initHome={goToHome} />
            <span>{props.error.message}</span>
            <button onClick={goToConfig}>Config</button>
        </div>
    );
};

export default ErrorView;
