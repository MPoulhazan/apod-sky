import React, { useCallback } from 'react';
import './Home.scss';
import { useEffect, useState } from 'react';
import { getInitializedApod } from '../shared/models/Apod.model';
import {
    getRandomPicture,
    getTodayPicture,
    isPlayRandom$,
} from '../shared/service/apod.service';
import { Logo } from '../shared/components/Logo/logo';
import { Actions } from '../shared/components/Actions/Actions';
import { Metas } from '../shared/components/Metas/Metas';
import { interval } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { animateScroll as scroll } from 'react-scroll';

const Home = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [apod, setApod] = useState(getInitializedApod());
    const [isHiddenButtons, setHiddenButtons] = useState(false);
    const [isPlay, setIsPlay] = useState(false);

    useEffect(() => {
        loadGetTodayPicture();
    }, []);

    const loadGetTodayPicture = () => {
        getTodayPicture().then(
            (result) => {
                setIsLoaded(true);
                setApod(result);
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
        );
    };

    const loadRandomPicture = () => {
        setIsLoaded(false);
        getRandomPicture().then(
            (result) => {
                setIsLoaded(true);
                setApod(result[0]);
                scrollBottom(); // TODO: Not scroll in nirmal mode
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
        );
    };

    const playAutoLoadRandomPicture = (isPlayEvent: boolean) => {
        setIsPlay(isPlayEvent);
        isPlayRandom$.next(isPlayEvent);
        if (isPlayEvent) {
            interval(10000)
                .pipe(takeUntil(isPlayRandom$))
                .subscribe(() => {
                    loadRandomPicture();
                });
        }
    };

    const scrollBottom = () => {
        scroll.scrollToBottom({ duration: 10000, smooth: true });
    };

    const toggleHiddenButtons = useCallback(async () => {
        setHiddenButtons(!isHiddenButtons);
    }, [isHiddenButtons]);

    if (error) {
        return <div>Erreur:</div>;
    } else if (!isLoaded) {
        return <div>Chargement...</div>;
    } else {
        return (
            <div className="Home">
                {apod.media_type === 'image' && (
                    <img
                        className="img-apod"
                        src={apod.hdurl}
                        alt={apod.title}
                    />
                )}
                {apod.media_type === 'video' && (
                    <div className="video-container">
                        <iframe
                            width="560"
                            height="315"
                            src={apod.url}
                        ></iframe>
                    </div>
                )}
                {!isHiddenButtons && (
                    <Logo isLoaded={isLoaded} initHome={loadGetTodayPicture} />
                )}
                <Actions
                    isHiddenButtons={isHiddenButtons}
                    apodUrl={apod.url}
                    isPlay={isPlay}
                    toggleHiddenButtons={toggleHiddenButtons}
                    loadRandomPicture={loadRandomPicture}
                    playAutoLoadRandomPicture={playAutoLoadRandomPicture}
                />
                <Metas isHiddenButtons={isHiddenButtons} apod={apod} />
            </div>
        );
    }
};

export default Home;
