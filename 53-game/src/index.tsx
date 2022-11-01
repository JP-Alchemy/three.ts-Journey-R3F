import ReactDOM from 'react-dom/client';
import './style.css';
import { Canvas } from '@react-three/fiber';
import Experience from './Experience';
import { KeyboardControls } from '@react-three/drei';
import Interface from './Interface';

export enum EControls {
  forward = "forward",
  backward = "backward",
  left = "left",
  right = "right",
  jump = "jump"
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <KeyboardControls
    map={[
      { name: EControls.forward, keys: ['ArrowUp', 'KeyW'] },
      { name: EControls.backward, keys: ['ArrowDown', 'KeyS'] },
      { name: EControls.left, keys: ['ArrowLeft', 'KeyA'] },
      { name: EControls.right, keys: ['ArrowRight', 'KeyD'] },
      { name: EControls.jump, keys: ['Space'] },
    ]}>
    <Canvas shadows
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [2.5, 4, 6]
      }}
    >
      <Experience />
    </Canvas>
    <Interface />
  </KeyboardControls>
);
