import React from 'react';
import { useState } from 'react';
import {
    FaExpandArrowsAlt,
    FaCompressArrowsAlt,
    FaRandom,
    FaPlay,
    FaStop,
    FaRegSun,
    FaDownload,
} from 'react-icons/fa';
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
    const [timer, setTimer] = useState(10);

    const isHiddenButtons = props.isHiddenButtons;

    let timeleft = 10;
    let downloadTimer = setInterval(function () {
        if (timeleft <= 0) {
            clearInterval(downloadTimer);
        }

        timeleft -= 1;
        setTimer(timeleft);
        console.log(timeleft);
    }, 1000);

    return (
        (!isHiddenButtons && (
            <div className="menu">
                <a
                    href={props.apodUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                >
                    <FaDownload title="Download picture" />
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
                {props.isPlay && <span>{timer}</span>}
                {
                    <FaRegSun
                        title="Configuration"
                        onClick={() => {
                            window.open('/config', '_self');
                        }}
                    />
                }
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
