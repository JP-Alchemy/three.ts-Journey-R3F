import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

export default function Experience() {

    const cubeRef = useRef<THREE.Mesh>(null!);
    const groupRef = useRef<THREE.Group>(null!);

    useFrame((state, delta) => {
        cubeRef.current.rotation.y += delta;
        groupRef.current.rotation.y += delta;
    })

    return (
        <>
            <group ref={groupRef}>
                <mesh ref={cubeRef} position-x={2} rotation-y={Math.PI * 0.25} scale={1.5}>
                    <boxGeometry />
                    <meshBasicMaterial color="mediumpurple" />
                </mesh>

                <mesh position-x={-2}>
                    <sphereGeometry />
                    <meshBasicMaterial color="orange" />
                </mesh>
            </group>

            <mesh rotation-x={-Math.PI * 0.5} position-y={-1} scale={10}>
                <planeGeometry />
                <meshBasicMaterial color="greenyellow" />
            </mesh>
        </>
    )
}