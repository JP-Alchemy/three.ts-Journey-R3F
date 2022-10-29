import { OrbitControls, Text3D, Center, useMatcapTexture } from '@react-three/drei'
import { Perf } from 'r3f-perf'

function Experience() {

  const [matcapTexture] = useMatcapTexture('422509_C89536_824512_0A0604', 256);

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

      {[...Array(100)].map((v, i) => (
        <mesh key={i}
          position={[(Math.random() - .5) * 10, (Math.random() - .5) * 10, (Math.random() - .5) * 10]}
          scale={0.2 + (Math.random() * 0.2)}
          rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}

        >
          <torusGeometry args={[1, 0.6, 16, 32]} />
          <meshMatcapMaterial matcap={matcapTexture} />
        </mesh>
      ))}

    </>
  );
}

export default Experience;
