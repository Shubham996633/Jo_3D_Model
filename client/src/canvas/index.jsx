import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, Center } from '@react-three/drei';
import { useSnapshot } from 'valtio';
import { CustomButton } from '../components';
import Shirt from './Shirt';
import Backdrop from './Backdrop';
import CameraRig from './CameraRig';
import state from '../store';

const CanvasModel = () => {
  const snap = useSnapshot(state);

  const canvasRef = useRef();

  const handleDownload = () => {
    const canvas = canvasRef.current;

    if (canvas) {
      const image = canvas.toDataURL('image/png');
      const anchor = document.createElement('a');
      anchor.href = image;
      anchor.download = '3d_modal.png';
      anchor.click();
    }
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh', display:'grid', }}>
      <Canvas
        shadows
        camera={{ position: [0, 0, 0], fov: 25 }}
        gl={{ preserveDrawingBuffer: true }}
        style={{ width: '100%', height: '100%' }}
        ref={canvasRef}
      >
        <ambientLight intensity={0.5} />
        <Environment preset="city" />

        <CameraRig>
          <Backdrop />
          <Center>
            <Shirt />
          </Center>
        </CameraRig>
      </Canvas>
{!snap.intro && 

     <div style={{ backgroundColor:"#d3d3d3"}}>

       <button className="ml-[90%] bg-yellow-500 text-white p-2 rounded-md" onClick={handleDownload}  >Download</button>
     </div>
}
    </div>
  );
};

export default CanvasModel;
