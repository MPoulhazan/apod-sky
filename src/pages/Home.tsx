import React, { useCallback } from 'react';
import './Home.scss';
import {
    FaDownload,
    FaExpand,
    FaExpandArrowsAlt,
    FaCompressArrowsAlt,
} from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { getInitializedApod } from '../shared/models/Apod.model';
import { apodService } from '../shared/service/apod.service';
import { Logo } from '../shared/components/Logo/logo';

const Home = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [apod, setApod] = useState(getInitializedApod());
    const [isHiddenButtons, setHiddenButtons] = useState(false);

    useEffect(() => {
        apodService().then(
            (result) => {
                console.log('REULSTSSSS : ', result);
                setIsLoaded(true);
                setApod(result);
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
        );
    }, []);

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
                {!isHiddenButtons && (
                    <div className="menu">
                        <FaExpand title="Ajust to image size" />
                        <a href={apod.hdurl} download>
                            <FaDownload title="Download" />
                        </a>
                        <FaExpandArrowsAlt
                            title="Hide buttons"
                            onClick={() => toggleHiddenButtons()}
                        />
                    </div>
                )}
                {isHiddenButtons && (
                    <div className="menu">
                        <FaCompressArrowsAlt
                            title="Show buttons"
                            onClick={() => toggleHiddenButtons()}
                        />
                    </div>
                )}
                {!isHiddenButtons && (
                    <div className="metas">
                        <span className="title">{apod.title}</span>
                        <span className="date">{apod.date}</span>
                        <span className="explanation">
                            &emsp;{apod.explanation}
                        </span>
                    </div>
                )}
            </div>
        );
    }
};

export default Home;
