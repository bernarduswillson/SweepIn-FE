import React from 'react';

interface ArrowProps {
  fillColor?: string;
}

const Arrow = ({ fillColor }: ArrowProps) => {
  return (
    <svg width="11" height="17" viewBox="0 0 11 17" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 1.5L9 8.5L2 15.5" stroke={fillColor} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
};

export default Arrow;