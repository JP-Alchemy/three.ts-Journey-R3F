import { OrbitControls } from '@react-three/drei'
import { useControls } from 'leva';
import { useFrame } from '@react-three/fiber';
import { Perf } from 'r3f-perf';
import { useRef } from 'react';
import * as THREE from 'three';

export default function Experience() {

    return (
        <>
            <color args={['ivory']} attach='background' />

            <Perf position='top-left' />

            <OrbitControls makeDefault />
            <directionalLight intensity={1.5} castShadow position={[1, 2, 3]} />
            <ambientLight intensity={0.5} />

            <mesh rotation-x={-Math.PI * 0.5} scale={10} receiveShadow >
                <planeGeometry />
                <meshStandardMaterial color="greenyellow" />
            </mesh>
        </>
    )
}