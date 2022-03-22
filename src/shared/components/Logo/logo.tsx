import React from 'react';
import { IoPlanet } from 'react-icons/io5';
import './Logo.scss';

interface Props {
    isLoaded: boolean;
    initHome: () => void;
}

export const Logo = (props: Props) => {
    return (
        <div
            className="app-title"
            title="Return to home"
            onClick={() => props.initHome()}
        >
            <span className="title-logo">
                AP
                <IoPlanet className="planet" /> D SKY
            </span>
            <span className={`slider ${props.isLoaded ? 'active' : ''}`}></span>
        </div>
    );
};
