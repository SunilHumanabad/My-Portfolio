"use client"
import React from 'react';
import PropTypes from 'prop-types'; // You can remove this if you're only using TypeScript
import { TypeAnimation } from 'react-type-animation';

interface TextAnimationProps {
  data: (string | number)[];
}

const TextAnimation: React.FC<TextAnimationProps> = ({data}) => {
  if (!data || data.length === 0) {
    console.error('No data provided for TextAnimation component.');
    return null;
  }
  return (
    <TypeAnimation
    sequence={data}
    wrapper="span"
    speed={50}
    className='text-xl lg:text-2xl text-primary'
    style={{display: 'inline-block' }}
    repeat={Infinity}
  />
  )
}
TextAnimation.propTypes = {
  data: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired // You can remove this if you're only using TypeScript
};
export default TextAnimation