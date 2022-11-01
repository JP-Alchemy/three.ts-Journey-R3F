import React from 'react';
import ReactDOM from 'react-dom/client';
import './style.css';
import { Canvas } from '@react-three/fiber';
import Experience from './Experience';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Canvas
  shadows
    camera={{
      fov: 45,
      near: 0.1,
      far: 200,
      position: [ 4, 2, 6 ]
    }}
  >
    <Experience />
  </Canvas>
);