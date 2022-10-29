import { OrbitControls, Text3D, Center, useMatcapTexture } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

function Experience() {

  const [matcapTexture] = useMatcapTexture('422509_C89536_824512_0A0604', 256);
  const ref = useRef<THREE.InstancedMesh>(null!);

  useEffect(() => {
    // Set positions
    let temp = new THREE.Object3D();
    for (let i = 0; i < 100; i++) {
      temp.position.set((Math.random() - .5) * 10, (Math.random() - .5) * 10, (Math.random() - .5) * 10);
      temp.scale.setScalar(0.2 + (Math.random() * 0.2));
      temp.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      temp.updateMatrix()
      ref.current.setMatrixAt(i, temp.matrix)
    }
    // Update the instance
    ref.current.instanceMatrix.needsUpdate = true
  }, [])


  return (
    <>
      <Perf position="top-left" />

      <OrbitControls makeDefault />

      <Center>
        <Text3D font='./fonts/helvetiker_regular.typeface.json'
          size={0.75}
          height={0.2}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.02}
          bevelOffset={0}
          bevelSegments={5}>
          DISCO PUNK STUDIO
          <meshMatcapMaterial matcap={matcapTexture} />
        </Text3D>
      </Center>

      <instancedMesh ref={ref} args={[undefined, undefined, 100]}>
        <torusGeometry args={[1, 0.6, 16, 32]} />
        <meshMatcapMaterial matcap={matcapTexture} />
      </instancedMesh>
    </>
  );
}

export default Experience;
