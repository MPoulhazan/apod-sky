import React from 'react';
import { IoLogoGithub, IoLogoLinkedin } from 'react-icons/io5';
import './Social.scss';

export const Social = () => {
    const socialUrls = {
        github: process.env.REACT_APP_URL_GITHUB || '',
        linkedIn: process.env.REACT_APP_URL_GITHUB || '',
    };
    const goTo = (social: string) => window.open(social);

    return (
        <div className="social">
            <IoLogoGithub onClick={() => goTo(socialUrls.github)} />
            <IoLogoLinkedin onClick={() => goTo(socialUrls.linkedIn)} />
        </div>
    );
};
