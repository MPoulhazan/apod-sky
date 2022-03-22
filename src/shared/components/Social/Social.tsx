import React from 'react';
import { IoLogoGithub, IoLogoLinkedin, IoMail } from 'react-icons/io5';
import './Social.scss';

export const Social = () => {
    const socialUrls = {
        github: process.env.REACT_APP_URL_GITHUB || '',
        linkedIn: process.env.REACT_APP_URL_LINKEDIN || '',
    };
    const goTo = (social: string) => window.open(social);
    const mailTo =
        process.env.REACT_APP_EMAIL + '?subject=[APODSKY]%20-%20Feedback';

    return (
        <div className="social">
            <IoLogoGithub
                title="Visit Github profile"
                onClick={() => goTo(socialUrls.github)}
            />
            <IoLogoLinkedin
                title="Visit LinkedIn profile"
                onClick={() => goTo(socialUrls.linkedIn)}
            />
            <IoMail
                title="Give a feedback"
                onClick={() => (window.location.href = `mailto:${mailTo}`)}
            />
        </div>
    );
};
