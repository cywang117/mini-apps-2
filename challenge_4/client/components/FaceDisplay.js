import React from 'react';

const FaceDisplay = ({ imgSrc }) => (
  <img
    src={imgSrc.src}
    alt={imgSrc.alt}
  />
);

export default FaceDisplay;
