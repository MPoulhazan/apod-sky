import React, { useCallback } from 'react';
import './Home.scss';
import { useEffect, useState } from 'react';
import { getInitializedApod } from '../shared/models/Apod.model';
import {
    apodService,
    getRandomPicture,
    isPlayRandom$,
} from '../shared/service/apod.service';
import { Logo } from '../shared/components/Logo/logo';
import { Actions } from '../shared/components/Actions/Actions';
import { Metas } from '../shared/components/Metas/Metas';
import { interval } from 'rxjs';

const Home = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [apod, setApod] = useState(getInitializedApod());
    const [isHiddenButtons, setHiddenButtons] = useState(false);
    const [isPlay, setIsPlay] = useState(false);

    useEffect(() => {
        apodService().then(
            (result) => {
                setIsLoaded(true);
                setApod(result);
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
        );
    }, []);

    const loadRandomPicture = () => {
        setIsLoaded(false);
        getRandomPicture().then(
            (result) => {
                setIsLoaded(true);
                setApod(result[0]);
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
        );
    };

    useEffect(() => {
        isPlayRandom$.subscribe((val) => setIsPlay(val));

        interval(10000)
            // .pipe(takeUntil(isPlayRandom$))
            .subscribe(() => {
                // TODO: Finalize event
                console.log('EVENT');
                // if (isPlay) loadRandomPicture();
            });
    }, [isPlay]);

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
                    <video className="img-apod" src={apod.hdurl} />
                )}
                {!isHiddenButtons && <Logo isLoaded={isLoaded} />}
                <Actions
                    isHiddenButtons={isHiddenButtons}
                    apodUrl={apod.url}
                    isPlay={isPlay}
                    toggleHiddenButtons={toggleHiddenButtons}
                    loadRandomPicture={loadRandomPicture}
                />
                <Metas isHiddenButtons={isHiddenButtons} apod={apod} />
            </div>
        );
    }
};

export default Home;
