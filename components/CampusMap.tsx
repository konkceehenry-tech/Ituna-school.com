
import React, { useState, useEffect, useRef } from 'react';
import { MapPinIcon } from './icons/MapPinIcon';
import { CloseIcon } from './icons/CloseIcon';

interface Location {
  id: number;
  name: string;
  description: string;
  top: string;
  left: string;
}

const locations: Location[] = [
  {
    id: 1,
    name: 'Main Library',
    description: 'A hub for research, collaboration, and quiet study, with extensive digital and print resources.',
    top: '30%',
    left: '25%',
  },
  {
    id: 2,
    name: 'Science Block',
    description: 'State-of-the-art laboratories for physics, chemistry, and biology.',
    top: '50%',
    left: '40%',
  },
  {
    id: 3,
    name: 'Arts & Humanities Building',
    description: 'Home to our creative arts, history, and literature departments.',
    top: '45%',
    left: '65%',
  },
  {
    id: 4,
    name: 'Sports Complex',
    description: 'Includes a full-sized basketball court, swimming pool, and modern gym.',
    top: '70%',
    left: '30%',
  },
  {
    id: 5,
    name: 'Student Cafeteria',
    description: 'Offering a wide variety of healthy and delicious meal options daily.',
    top: '65%',
    left: '75%',
  },
];

const CampusMap: React.FC = () => {
  const [activeLocation, setActiveLocation] = useState<Location | null>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  const handleMarkerClick = (location: Location) => {
    setActiveLocation(location.id === activeLocation?.id ? null : location);
  };
  
  const handleClose = () => {
      setActiveLocation(null);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    if (activeLocation) {
      document.addEventListener('keydown', handleKeyDown);
      popupRef.current?.focus();
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeLocation]);


  return (
    <section className="bg-black py-20 md:py-32">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-sm text-gray-400 uppercase tracking-widest">Campus Tour</p>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">
            Explore Our Campus
          </h2>
          <p className="text-gray-300 mt-4">
            Click on the markers to learn more about the key facilities at Ituna secondary School.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          <img 
            src="https://picsum.photos/seed/campus/1200/700" 
            alt="An illustrative, bird's-eye view map of the Ituna secondary School campus."
            className="rounded-lg shadow-2xl w-full"
          />
          {locations.map((location) => (
            <div key={location.id}>
              <button
                onClick={() => handleMarkerClick(location)}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 focus:outline-none rounded-full focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-400 focus-visible:ring-offset-black"
                style={{ top: location.top, left: location.left }}
                aria-label={`Show location: ${location.name}`}
                aria-expanded={activeLocation?.id === location.id}
                aria-controls={`location-info-${location.id}`}
              >
                <MapPinIcon className="w-8 h-8 text-white transition-transform duration-300 hover:scale-125" />
                <span className="relative flex h-3 w-3" aria-hidden="true">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
                </span>
              </button>
              {activeLocation?.id === location.id && (
                <div 
                  ref={popupRef}
                  id={`location-info-${location.id}`}
                  className="absolute bg-gray-900 text-white p-4 rounded-lg shadow-lg w-64 transform -translate-x-1/2 -translate-y-full -mt-6 focus:outline-none focus:ring-2 focus:ring-sky-400"
                  style={{ top: location.top, left: location.left }}
                  role="dialog"
                  aria-labelledby={`location-title-${location.id}`}
                  aria-modal="true"
                  tabIndex={-1}
                >
                  <div className="flex justify-between items-start">
                    <h3 id={`location-title-${location.id}`} className="font-bold text-lg mb-2 pr-2">{location.name}</h3>
                    <button 
                      onClick={handleClose} 
                      aria-label="Close location details" 
                      className="p-1 -mt-1 -mr-1 rounded-full text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-400 focus-visible:ring-offset-gray-900"
                    >
                      <CloseIcon className="w-5 h-5" />
                    </button>
                  </div>
                  <p className="text-sm text-gray-300">{location.description}</p>
                   <div className="absolute left-1/2 transform -translate-x-1/2 bottom-0 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-gray-900 -mb-2" aria-hidden="true"></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CampusMap;