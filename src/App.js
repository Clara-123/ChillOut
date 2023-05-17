import { MapContainer, TileLayer, Marker, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import  { CgClose } from 'react-icons/cg';
import { BiArrowToTop } from 'react-icons/bi';

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
    <div className='overflow-hidden'>
      <div className='relative h-screen mb-32 flex justify-center items-center'>
        <button onClick={() => window.scrollTo(0, document.body.scrollHeight)} className='absolute right-12 top-6 text-xl text-white rounded-full bg-red-600 px-4 max-res:pb-[0.125rem] max-res:right-8 pb-1 shadow-md hover:shadow-xl hover:text-red-600 hover:bg-white transition-all duration-300'>Explore</button>
        <img className='w-screen object-cover h-screen' src='../images/Chillout.png' alt='Chillout' />
        <img className={`${pageLoaded ? 'opacity-100': 'opacity-0'} scale-[0.6] min-w-[36rem] md:-top-14 top-28 absolute transition-all duration-[1.7s]`} src='../images/Chillout Title.png' alt='Chillout' />
      </div>
      
      <div className='shadow-[0px_-90px_60px_rgba(34,_34,_34,_1)] -mx-20 relative -mt-32 bg-[#222222]'>
        <div className='relative z-0 max-res:pb-0 pb-7 mx-20'>
          <MapContainer zoomAnimation={true} ref={mapRef} center={[29.251760732561536, 30.525203159636952]} zoom={7} scrollWheelZoom={true} className='mx-20 max-res:mx-0 w-auto h-[calc(100vh_-_3.5rem)]'>
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

        <div className={`${isImageOpen ? 'scale-100': 'scale-0'} flex items-center justify-center absolute z-50 top-0 bottom-0 left-0 right-0 bg-black bg-opacity-20 transition-all duration-500`}>
          <div className={`relative flex items-center justify-center h-fit w-fit`}>
            <button onClick={() => setIsImageOpen(!isImageOpen)} className='text-gray-400 drop-shadow-lg absolute z-10 right-36 top-3 max-res:right-[6.5rem] max-res:text-white hover:drop-shadow-xl hover:text-[#337AB7] transition-all duration-500'><CgClose className='scale-[2.5]' /></button>
            <img className='max-h-[34rem] max-res:px-[5.5rem] px-32 pb-7' src={currentImage} alt='Chillout'/>
          </div>
        </div>
        <div className="">
          <button onClick={() => window.scrollTo(0, 0)} className="absolute top-4 max-res:right-44 right-[16.5rem] bg-white py-2 px-2 rounded-lg shadow-lg text-gray-800 hover:bg-gray-100 hover:shadow-xl transition-all duration-300"><BiArrowToTop className='scale-[1.5]' /></button>
          <button onClick={handleReset} className="absolute top-3 max-res:right-[5.75rem] right-44 bg-white py-2 px-4 rounded-lg shadow-lg text-gray-800 hover:bg-gray-100 hover:shadow-xl transition-all duration-300">Reset</button>
        </div>
      </div>
    </div>
  );
}

export default App;
