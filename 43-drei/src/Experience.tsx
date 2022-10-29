import { OrbitControls } from '@react-three/drei'
import { TransformControls } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

export default function Experience() {
    const cube = useRef<THREE.Mesh>(null!);

    return (
        <>
            <OrbitControls makeDefault/>

            <directionalLight position={[1, 2, 3]} intensity={1.5} />
            <ambientLight intensity={0.5} />

            <group>
                <mesh position-x={2} scale={1.5} ref={cube}>
                    <boxGeometry />
                    <meshStandardMaterial color="mediumpurple" />
                </mesh>
                <TransformControls object={cube}/>

                <mesh position-x={-2}>
                    <sphereGeometry />
                    <meshStandardMaterial color="orange" />
                </mesh>
            </group>

            <mesh rotation-x={-Math.PI * 0.5} position-y={-1} scale={10}>
                <planeGeometry />
                <meshStandardMaterial color="greenyellow" />
            </mesh>
        </>
    )
}