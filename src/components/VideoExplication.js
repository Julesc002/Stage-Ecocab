import React from 'react';

const VideoExplication = () => {

    const nameImageVideoPlaceholder = "videoPlaceholder.svg";

    return (
        <>
            <img className='videoPlaceholder' src={`${process.env.PUBLIC_URL}/assets/images/${nameImageVideoPlaceholder}`} alt='Video explication placeholder' />
        </>
    );
};

export default VideoExplication;