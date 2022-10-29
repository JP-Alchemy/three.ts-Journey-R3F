import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

export default function Experience() {

    const cubeRef = useRef<THREE.Mesh>(null!);

    useFrame((state, delta) => {
        cubeRef.current.rotation.y += delta;
    })

    return (
        <>
            <mesh ref={cubeRef} position-x={2} rotation-y={Math.PI * 0.25} scale={1.5}>
                <boxGeometry />
                <meshBasicMaterial color="mediumpurple" />
            </mesh>

            <mesh position-x={-2}>
                <sphereGeometry />
                <meshBasicMaterial color="orange" />
            </mesh>

            <mesh rotation-x={-Math.PI * 0.4} position-y={-1} scale={10}>
                <planeGeometry />
                <meshBasicMaterial color="greenyellow" />
            </mesh>
        </>
    )
}