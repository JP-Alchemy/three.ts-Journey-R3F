import { useFrame, extend, useThree, Object3DNode, ThreeEvent } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';
import { useGLTF, OrbitControls, meshBounds } from '@react-three/drei'

export default function Experience() {

    const hamburger = useGLTF('./hamburger.glb');

    const cubeRef = useRef<THREE.Mesh>(null!);
    const { camera, gl } = useThree();

    useFrame((state, delta) => {
        cubeRef.current.rotation.y += delta;
    })

    const changeColor = (e: ThreeEvent<MouseEvent>) => {
        e.stopPropagation();
        const mesh = e.object as THREE.Mesh<THREE.BufferGeometry, THREE.MeshStandardMaterial>;
        mesh.material.color.setHSL(Math.random() * 360, Math.random(), Math.random());
    }

    return (
        <>
            <OrbitControls />

            <directionalLight position={[1, 2, 3]} intensity={1.5} />

            <ambientLight intensity={0.5} />

            <mesh ref={cubeRef} position-x={2} rotation-y={Math.PI * 0.25} scale={1.5} onClick={changeColor}
                onPointerEnter={() => { document.body.style.cursor = 'pointer' }}
                onPointerLeave={() => { document.body.style.cursor = 'default' }}
                raycast={meshBounds}>
                <boxGeometry />
                <meshStandardMaterial color="mediumpurple" />
            </mesh>

            <mesh position-x={-2} onClick={changeColor}
                onPointerEnter={() => { document.body.style.cursor = 'pointer' }}
                onPointerLeave={() => { document.body.style.cursor = 'default' }}>
                <sphereGeometry />
                <meshStandardMaterial color="orange" />
            </mesh>

            <mesh rotation-x={-Math.PI * 0.5} position-y={-1} scale={10}>
                <planeGeometry />
                <meshStandardMaterial color="greenyellow" />
            </mesh>

            <primitive object={hamburger.scene} scale={0.25} position={[0, 0.5, 3]}
                onClick={(e: ThreeEvent<MouseEvent>) => {
                    console.log('Clicked', e.object.name);
                    e.stopPropagation();
                }} />
        </>
    )
}

useGLTF.preload('./hamburger.glb');