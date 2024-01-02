import React from 'react';

function ImageWebp({srcSet,pictureClass,alt,...properties}) {
    return (
        <picture className={pictureClass ? pictureClass : ''}>
            <source srcSet={srcSet} type="image/webp"/>
            <img
                alt={alt}
                style={{width: '100%'}}
                {...properties}
            />
        </picture>
    );
}

export default ImageWebp;