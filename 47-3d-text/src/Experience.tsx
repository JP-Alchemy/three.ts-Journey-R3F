import { OrbitControls } from '@react-three/drei'
import { Perf } from 'r3f-perf'

function Experience() {
  return (
    <>
      <Perf position="top-left" />

      <OrbitControls makeDefault />

      <mesh scale={1.5}>
        <boxGeometry />
        <meshNormalMaterial />
      </mesh>
    </>
  );
}

export default Experience;
