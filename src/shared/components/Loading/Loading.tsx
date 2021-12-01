import React from 'react';
import { IoPlanet } from 'react-icons/io5';
import './Loading.scss';

export const Loading = () => {
    return (
        <div className="loading">
            <div className="spinner">
                <IoPlanet className="rotate" />
            </div>
        </div>
    );
};
