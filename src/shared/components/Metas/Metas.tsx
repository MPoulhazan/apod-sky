import React from 'react';
import { Apod } from '../../models/Apod.model';
import './Metas.scss';

interface Props {
    isHiddenButtons: boolean;
    apod: Apod;
}

export const Metas = (props: Props) => {
    return (
        (!props.isHiddenButtons && (
            <div className="metas">
                <span className="title">{props.apod.title}</span>
                <span className="date">{props.apod.date}</span>
                <span className="explanation">
                    &emsp;{props.apod.explanation}
                </span>
            </div>
        )) ||
        null
    );
};
