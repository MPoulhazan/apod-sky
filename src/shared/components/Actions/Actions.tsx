import React from 'react';
import {
    FaExpand,
    FaDownload,
    FaExpandArrowsAlt,
    FaCompressArrowsAlt,
    FaRandom,
    FaPlay,
    FaStop,
} from 'react-icons/fa';
import { isPlayRandom$ } from '../../service/apod.service';
import './Actions.scss';

interface Props {
    isHiddenButtons: boolean;
    apodUrl: string;
    isPlay: boolean;
    toggleHiddenButtons: () => void;
    loadRandomPicture: () => void;
}

export const Actions = (props: Props) => {
    const isHiddenButtons = props.isHiddenButtons;

    return (
        (!isHiddenButtons && (
            <div className="menu">
                <FaExpand title="Ajust to image size" />
                <a href={props.apodUrl} download>
                    <FaDownload title="Download" />
                </a>
                <FaExpandArrowsAlt
                    title="Hide buttons"
                    onClick={() => props.toggleHiddenButtons()}
                />
                <FaRandom
                    title="Load random picture"
                    onClick={() => props.loadRandomPicture()}
                />
                {!props.isPlay && (
                    <FaPlay
                        title="Play random picture"
                        onClick={() => {
                            isPlayRandom$.next(true);
                        }}
                    />
                )}
                {props.isPlay && (
                    <FaStop
                        title="Stop random picture"
                        onClick={() => {
                            isPlayRandom$.next(false);
                        }}
                    />
                )}
            </div>
        )) || (
            <div className="menu">
                <FaCompressArrowsAlt
                    title="Show buttons"
                    onClick={() => props.toggleHiddenButtons()}
                />
            </div>
        )
    );
};
