import React, { useCallback } from 'react';
import './Home.scss';
import { useEffect, useState } from 'react';
import { getInitializedApod } from '../../shared/models/Apod.model';
import {
    getRandomPicture,
    getTodayPicture,
    isPlayRandom$,
} from '../../shared/service/apod.service';
import { Logo } from '../../shared/components/Logo/logo';
import { Actions } from '../../shared/components/Actions/Actions';
import { Metas } from '../../shared/components/Metas/Metas';
import { interval } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { animateScroll as scroll } from 'react-scroll';
import { Intro } from '../../shared/components/Intro/Intro';
import { Loading } from '../../shared/components/Loading/Loading';

const Home = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const [apod, setApod] = useState(getInitializedApod());
    const [isHiddenButtons, setHiddenButtons] = useState(false);
    const [isPlay, setIsPlay] = useState(false);
    const [showIntro, setshowIntro] = useState(true);

    useEffect(() => {
        loadGetTodayPicture();
    }, []);

    const loadGetTodayPicture = () => {
        setIsLoaded(false);
        setIsImageLoaded(false);
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
        setIsImageLoaded(false);
        scroll.scrollToTop();
        getRandomPicture().then(
            (result) => {
                setIsLoaded(true);
                setApod(result[0]);
                scrollBottom();
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
        scroll.scrollToBottom({ duration: 15000, smooth: true });
    };

    const toggleHiddenButtons = useCallback(async () => {
        setHiddenButtons(!isHiddenButtons);
    }, [isHiddenButtons]);

    setTimeout(() => {
        setshowIntro(false);
    }, 3000);

    if (error) {
        return <div>Erreur:</div>;
    } else if (!isLoaded) {
        return <Loading />;
    } else {
        return showIntro ? (
            <Intro />
        ) : (
            <div className="Home">
                {apod.media_type === 'image' && !isImageLoaded && (
                    <Loading absolute={true} />
                )}
                {apod.media_type === 'image' && (
                    <img
                        className="img-apod"
                        src={apod.hdurl}
                        alt={apod.title}
                        onLoad={() => setIsImageLoaded(true)}
                    />
                )}
                {apod.media_type === 'video' && (
                    <div className="video-container">
                        <iframe
                            title="video-iframe"
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
