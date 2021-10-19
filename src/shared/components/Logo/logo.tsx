import React from 'react';
import { IoPlanet } from 'react-icons/io5';
import './Logo.scss';

interface Props {
    isLoaded: boolean;
}

export const Logo = (props: Props) => {
    return (
        <div className="app-title">
            <span className="title-logo">
                AP
                <IoPlanet className="planet" /> D SKY
            </span>
            <span className={`slider ${props.isLoaded ? 'active' : ''}`}></span>
        </div>
    );
};
