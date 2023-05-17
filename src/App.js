import { MapContainer, TileLayer, Marker, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import  { CgClose } from 'react-icons/cg';

import './App.css';
import 'leaflet/dist/leaflet.css';
import 'react-image-gallery/styles/css/image-gallery.css';
import { useState, useRef, useEffect } from 'react';

import { data } from './data';

function App() {
  const [pageLoaded, setPageLoaded] = useState(false);
  const [isImageOpen, setIsImageOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState('');
  const mapRef = useRef();

  useEffect(() => {
    setPageLoaded(true);
  }, [])

  const customIcon = L.icon({
    iconUrl: 'images/marker-icon-2x-green.png',
    iconSize: [25, 41],
  });

  const handleMarkerClick = (index, event) => {
    setCurrentImage(data[index].image);
    if(mapRef.current.getZoom() >= 12 ) {
      setIsImageOpen(true);
    }
    mapRef.current.setView(event.target.getLatLng(), 14);
  };

  const handleReset = () => {
    if (mapRef.current) {
      const map = mapRef.current;
      map.setView([29.206902879415612, 31.181991154191536], 7);
    }
  };

  return (
    <div>
      <div className='relative h-screen mb-32 flex justify-center'>
        <button onClick={() => window.scrollTo(0, document.body.scrollHeight)} className='absolute right-12 top-6 text-xl text-white rounded-full bg-red-600 px-4 pb-1 shadow-md hover:shadow-xl hover:text-red-600 hover:bg-white transition-all duration-300'>Explore</button>
        <img className='w-full' src='../images/Chillout.png' alt='Chillout' />
        <img className={`${pageLoaded ? 'opacity-100': 'opacity-0'} scale-[0.6] absolute -top-14 transition-[opacity] duration-[1.7s]`} src='../images/Chillout Title.png' alt='Chillout' />
      </div>
      
      <div className='shadow-[0px_-70px_60px_rgba(34,_34,_34,_1)] relative -mt-32 bg-[#222222]'>
        <div className='relative z-0 pb-7'>
          <MapContainer zoomAnimation={true} ref={mapRef} center={[29.206902879415612, 31.181991154191536]} zoom={7} scrollWheelZoom={true} className='mx-20 w-auto h-[calc(100vh_-_3.5rem)]'>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {
              data.map((station, index) => (
                // eslint-disable-next-line no-restricted-globals
                <Marker key={index} eventHandlers={{click: (event) => handleMarkerClick(index, event) }} icon={customIcon} position={station.position}>
                  <Tooltip><h1 className='text-lg'>{station.name}</h1></Tooltip>
                </Marker>
              ))
            }
          </MapContainer>
        </div>

        <div className={`${isImageOpen ? 'scale-100': 'scale-0'} absolute flex items-center justify-center z-50 bg-black bg-opacity-20 transition-all duration-500 top-0 bottom-0 left-0 right-0`}>
          <button onClick={() => setIsImageOpen(!isImageOpen)} className='text-gray-400 drop-shadow-lg absolute z-10 right-10 top-6 hover:drop-shadow-xl hover:text-[#337AB7] transition-all duration-500'><CgClose className='scale-[2.5]' /></button>
          <img className=' max-h-[34rem] mb-7' src={currentImage} alt='Chillout'/>
        </div>
        <div className="absolute top-3 right-[5.75rem]">
          <button onClick={handleReset} className="bg-white py-2 px-4 rounded-lg shadow-lg text-gray-800 hover:bg-gray-100 hover:shadow-xl transition-all duration-300">Reset</button>
        </div>
      </div>
    </div>
  );
}

export default App;
