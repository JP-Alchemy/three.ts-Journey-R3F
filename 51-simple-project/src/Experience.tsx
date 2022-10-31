import { Html, useGLTF, Environment, Float, PresentationControls, ContactShadows, Text } from '@react-three/drei'

function Experience() {

  const computer = useGLTF('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/macbook/model.gltf');
  console.log(computer);

  return (
    <>
      <Environment preset='city' />

      <color args={['#695b5b']} attach="background" />

      <PresentationControls global polar={[-.4, .3]} azimuth={[-1, 0.75]}
        config={{ mass: 2, tension: 400 }} rotation={[.13, .1, 0]} snap={{ mass: 4, tension: 400 }}>
        <Float rotationIntensity={0.4}>
          <rectAreaLight width={2.5} height={1.65} intensity={65} color={'#FF99FF'} rotation={[0.1, Math.PI, 0]} position={[0, 0.55, -1.15]} />
          <primitive object={computer.scene} position-y={-1.2}>
            <Html transform wrapperClass='htmlScreen' distanceFactor={1.17}
              position={[0, 1.56, -1.4]} rotation-x={-0.256}>
              <iframe src="https://discopunk.studio" />
            </Html>
          </primitive>

          <Text font="./yellowtail.woff" fontSize={0.80}
            position={[2, 0.75, 0.15]} rotation-y={-1.25} maxWidth={2} textAlign='center'>JP Bothma</Text>
        </Float>
      </PresentationControls>

      <ContactShadows position-y={-1.4} opacity={0.4} scale={5} blur={2.4} />
    </>
  );
}

export default Experience;

useGLTF.preload('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/macbook/model.gltf');