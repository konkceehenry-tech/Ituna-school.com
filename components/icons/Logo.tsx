import React from 'react';

export const Logo: React.FC = () => {
  return (
    <div className="flex items-center space-x-3 text-current" style={{ height: '48px' }}>
      <svg
        className="h-full w-auto"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Ituna secondary School Eagle Logo"
      >
        <path d="M11.39,4.44,9.6,2.65a1,1,0,0,0-1.41,0L3.34,7.5A5,5,0,0,0,2,11a5.12,5.12,0,0,0,5.12,5.12A5.06,5.06,0,0,0,12.18,11L21.3,2.23a1,1,0,0,0,0-1.42Z" />
        <path d="M12.18,11,10.13,13.06a3.17,3.17,0,0,1-4.22.22,3.23,3.23,0,0,1-.22-4.44L9.6,4.92" />
        <path d="M14.22,13.11,12.24,15a3.25,3.25,0,0,1-4.48.19,3.19,3.19,0,0,1-.19-4.52l3-2.88" />
        <path d="M21.12,9.88,14.41,16.6a5,5,0,0,1-7.07,0l-.21-.21" />
      </svg>
      <span className="text-2xl font-bold">Ituna</span>
    </div>
  );
};