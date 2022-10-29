import { OrbitControls, PivotControls, MeshReflectorMaterial } from '@react-three/drei'
import { TransformControls, Html, Text, Float } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

export default function Experience() {
    const cube = useRef<THREE.Mesh>(null!);
    const sphere = useRef<THREE.Mesh>(null!);

    return (
        <>
            <OrbitControls makeDefault />

            <directionalLight position={[1, 2, 3]} intensity={1.5} />
            <ambientLight intensity={0.5} />

            <group>
                <mesh position-x={2} scale={1.5} ref={cube}>
                    <boxGeometry />
                    <meshStandardMaterial color="mediumpurple" />
                </mesh>
                <TransformControls object={cube} />

                <PivotControls anchor={[0, 0, 0]} depthTest={false} axisColors={[0x9381ff, 0xff4d6d, 0x7ae582]} lineWidth={2}>
                    <mesh position-x={-2} ref={sphere}>
                        <sphereGeometry />
                        <meshStandardMaterial color="orange" />
                        <Html position={[0, 1.25, 0]} wrapperClass='label' center distanceFactor={7} occlude={[sphere, cube]}>
                            This is a 🌐 👇
                        </Html>
                    </mesh>
                </PivotControls>
            </group>

            <mesh rotation-x={-Math.PI * 0.5} position-y={-1} scale={20}>
                <planeGeometry />
                {/* <meshStandardMaterial color="greenyellow" /> */}
                <MeshReflectorMaterial mirror={0.65} resolution={1024} blur={[100,100]} color='grey'/>
            </mesh>

            <Float speed={3} floatIntensity={2}>
                <Text font='./yellowtail-v18-latin-regular.woff'
                    fontSize={0.5} color='salmon' position-y={2} maxWidth={2} textAlign='center'>
                    DISCO PUNK STUDIO
                </Text>
            </Float>
        </>
    )
}