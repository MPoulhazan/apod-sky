import React from 'react';
import {
    FaExpand,
    FaExpandArrowsAlt,
    FaCompressArrowsAlt,
    FaRandom,
    FaPlay,
    FaStop,
    FaMusic,
} from 'react-icons/fa';
import { isPlayRandom$ } from '../../service/apod.service';
import './Actions.scss';

interface Props {
    isHiddenButtons: boolean;
    apodUrl: string;
    isPlay: boolean;
    toggleHiddenButtons: () => void;
    loadRandomPicture: () => void;
    playAutoLoadRandomPicture: (arg0: boolean) => void;
}

export const Actions = (props: Props) => {
    const isHiddenButtons = props.isHiddenButtons;

    return (
        (!isHiddenButtons && (
            <div className="menu">
                <a href={props.apodUrl} download>
                    <FaExpand title="Show in full size" />
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
                            props.playAutoLoadRandomPicture(true);
                        }}
                    />
                )}
                {props.isPlay && (
                    <FaStop
                        title="Stop random picture"
                        onClick={() => {
                            props.playAutoLoadRandomPicture(false);
                        }}
                    />
                )}
                {true && (
                    <FaMusic
                        title="Play music"
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
