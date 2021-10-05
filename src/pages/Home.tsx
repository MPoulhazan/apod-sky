import React from 'react';
import './Home.scss';
import { FaDownload, FaExpand, FaExpandArrowsAlt } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { getInitializedApod } from '../shared/models/Apod.model';
import { apodService } from '../shared/service/apod.service';

const Home = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [apod, setApod] = useState(getInitializedApod());

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

    if (error) {
        return <div>Erreur:</div>;
    } else if (!isLoaded) {
        return <div>Chargement...</div>;
    } else {
        return (
            <div className="Home">
                <img className="img-apod" src={apod.hdurl} alt={apod.title} />
                <div className="app-title">
                    <span>APOD SKY</span>
                    <span className="slider"></span>
                </div>
                <div className="menu">
                    <FaExpand title="Ajust to image size" />
                    <a href={apod.hdurl} download>
                        <FaDownload title="Download" />
                    </a>
                    <FaExpandArrowsAlt title="Hide buttons" />
                </div>
                <div className="metas">
                    <span className="title">{apod.title}</span>
                    <span className="date">{apod.date}</span>
                    <span className="explanation">{apod.explanation}</span>
                </div>
            </div>
        );
    }
};

export default Home;
