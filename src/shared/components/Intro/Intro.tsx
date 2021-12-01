import React from 'react';
import './Intro.scss';

export const Intro = () => {
    return (
        <div className="intro">
            <div className="fade"></div>
            <div className="planet">
                <div className="wrap">
                    <div className="background"></div>
                    <div className="clouds"></div>
                </div>
                <div className="mask"></div>
            </div>
            <div className="text">
                <div className="animate deverse">
                    <span>A</span>
                    <span>P</span>
                    <span>O</span>
                    <span>D</span>
                    <span>S</span>
                    <span>K</span>
                    <span>Y</span>
                </div>
            </div>
        </div>
    );
};
