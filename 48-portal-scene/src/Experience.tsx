import { OrbitControls, useGLTF, useTexture, Center, Sparkles, shaderMaterial } from '@react-three/drei'
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import portal_frag from './shaders/portal/fragment';
import portal_vert from './shaders/portal/vertex';
import * as THREE from 'three';
import { extend, Object3DNode, useFrame } from '@react-three/fiber';
import { useRef } from 'react';

type GLTFResult = GLTF & {
  nodes: {
    baked: THREE.Mesh;
    poleLightA: THREE.Mesh;
    poleLightB: THREE.Mesh;
    portalLight: THREE.Mesh;
  }
  materials: { [t: string]: THREE.MeshStandardMaterial }
};

const PortalMaterial = shaderMaterial(
  {
    uTime: 0,
    uColorStart: new THREE.Color('#FFFFFF'),
    uColorEnd: new THREE.Color('#000000')
  },
  portal_vert, portal_frag
);

extend({ PortalMaterial });
declare module '@react-three/fiber' {
  interface ThreeElements {
    portalMaterial: Object3DNode<THREE.ShaderMaterial, typeof OrbitControls>
  }
}

function Experience() {

  const portalShader = useRef<any>(null!);
  const { nodes } = useGLTF('./model/portal.glb') as GLTFResult;
  const bakedTexture = useTexture('./model/baked.jpg');
  bakedTexture.flipY = false;

  useFrame((state, delta) => {
    portalShader.current.uTime += delta;
  })

  return (
    <>
      <color args={['#201919']} attach='background' />

      <OrbitControls makeDefault />

      <Center>
        <mesh geometry={nodes.baked.geometry}>
          <meshBasicMaterial map={bakedTexture} />
        </mesh>

        <mesh geometry={nodes.poleLightA.geometry} position={nodes.poleLightA.position}>
          <meshBasicMaterial color='#ffffe5' />
        </mesh>
        <mesh geometry={nodes.poleLightB.geometry} position={nodes.poleLightB.position}>
          <meshBasicMaterial color='#ffffe5' />
        </mesh>

        <mesh geometry={nodes.portalLight.geometry} position={nodes.portalLight.position} rotation={nodes.portalLight.rotation}>
          <portalMaterial ref={portalShader} />
        </mesh>

        <Sparkles size={6} scale={[4, 2, 4]} position-y={1} speed={0.2} count={40} />

      </Center>
    </>
  );
}

export default Experience;

useGLTF.preload('./model/portal.glb');
useTexture.preload('./model/baked.jpg');