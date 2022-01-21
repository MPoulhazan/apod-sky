import React from 'react';
import { IoPlanet } from 'react-icons/io5';
import './Loading.scss';

interface Props {
    absolute?: boolean;
}

export const Loading = (props: Props) => {
    return (
        <div className={`loading ${props.absolute && 'absolute'}`}>
            <div className="spinner">
                <IoPlanet className="rotate" />
            </div>
        </div>
    );
};
