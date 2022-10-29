import { useFrame, extend, useThree, Object3DNode } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import CustomObject from './CustomObject';

extend({ OrbitControls });
declare module '@react-three/fiber' {
    interface ThreeElements {
        orbitControls: Object3DNode<OrbitControls, typeof OrbitControls>
    }
}

export default function Experience() {

    const cubeRef = useRef<THREE.Mesh>(null!);
    const groupRef = useRef<THREE.Group>(null!);
    const { camera, gl } = useThree();

    useFrame((state, delta) => {
        cubeRef.current.rotation.y += delta;
        groupRef.current.rotation.y += delta;
    })

    return (
        <>
            <orbitControls args={[camera, gl.domElement]} />

            <directionalLight position={[1, 2, 3]} intensity={1.5} />

            <ambientLight intensity={0.5} />

            <group ref={groupRef}>
                <mesh ref={cubeRef} position-x={2} rotation-y={Math.PI * 0.25} scale={1.5}>
                    <boxGeometry />
                    <meshStandardMaterial color="mediumpurple" />
                </mesh>

                <mesh position-x={-2}>
                    <sphereGeometry />
                    <meshStandardMaterial color="orange" />
                </mesh>
            </group>

            <mesh rotation-x={-Math.PI * 0.5} position-y={-1} scale={10}>
                <planeGeometry />
                <meshStandardMaterial color="greenyellow" />
            </mesh>

            <CustomObject />
        </>
    )
}