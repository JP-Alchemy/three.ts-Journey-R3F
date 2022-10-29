import ReactDOM from 'react-dom/client';
import './style.css';
import { Canvas } from '@react-three/fiber';
import Experience from './Experience';
import React from 'react';
import { Leva } from 'leva';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Leva />
    <Canvas shadows={false}>
      <Experience />
    </Canvas>
  </React.StrictMode>
);