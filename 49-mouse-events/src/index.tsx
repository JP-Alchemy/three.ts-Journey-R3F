import ReactDOM from 'react-dom/client';
import './style.css';
import { Canvas } from '@react-three/fiber';
import Experience from './Experience';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Canvas camera={{ near: 0.1, far: 100, fov: 45 }} gl={{ antialias: true }}
    onPointerMissed={() => { console.log('You missed event click listerner') }}>
    <Experience />
  </Canvas>
);