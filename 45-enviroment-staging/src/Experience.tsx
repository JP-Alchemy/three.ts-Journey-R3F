import { OrbitControls, useHelper, ContactShadows, Sky } from '@react-three/drei'
import { useControls } from 'leva';
import { useFrame } from '@react-three/fiber';
import { Perf } from 'r3f-perf';
import { useRef } from 'react';
import * as THREE from 'three';

// softShadows({
//     frustum: 3.75,
//     size: 0.005,
//     near: 9.5,
//     samples: 17,
//     rings: 11
// })

export default function Experience() {

    const cube = useRef<THREE.Mesh>(null!);
    const dirLight = useRef<THREE.DirectionalLight>(null!);

    useHelper(dirLight, THREE.DirectionalLightHelper);

    useFrame((state, delta) => {
        cube.current.rotation.y += delta * 0.2;
        // cube.current.position.x = 2 + Math.sin(state.clock.elapsedTime);
    });

    const { color, opactity, blur } = useControls('Contact Shadows', {
        color: '#1d8f75',
        opactity: {
            value: 0.8,
            min: 0,
            max: 1,
        },
        blur: {
            value: 2.8,
            min: 0,
            max: 10,
        }
    });

    const { sunPosition } = useControls('Sun', {
        sunPosition: {
            value: [0.01, 0.01, 0.01],
            step: 0.001
        }
    })

    return (
        <>
            {/* <BakeShadows /> */}

            <color args={['ivory']} attach='background' />

            <Sky sunPosition={sunPosition} />

            <Perf position='top-left' />

            <OrbitControls makeDefault />

            {/* <AccumulativeShadows scale={10} position-y={-0.99} color='#316d39' opacity={0.8} frames={Infinity} blend={100} temporal>
                <RandomizedLight position={[1, 2, 3]} bias={0.001} amount={8} radius={1} ambient={0.5} intensity={1}/>
            </AccumulativeShadows> */}

            <ContactShadows position-y={-0.99} scale={10} resolution={512} far={5}
                color={color} opacity={opactity} blur={blur} frames={1}
            />

            <directionalLight ref={dirLight} position={sunPosition}
                intensity={1.5} castShadow
                shadow-mapSize={[1024, 1024]}
                shadow-camera-near={1}
                shadow-camera-far={10}
                shadow-camera-top={5}
                shadow-camera-right={5}
                shadow-camera-bottom={-5}
                shadow-camera-left={-5}
            />
            <ambientLight intensity={0.5} />

            <group>
                <mesh position-x={2} ref={cube} castShadow>
                    <boxGeometry />
                    <meshStandardMaterial color="mediumpurple" />
                </mesh>

                <mesh position-x={-2} castShadow>
                    <sphereGeometry />
                    <meshStandardMaterial color='orange' />
                </mesh>
            </group>

            <mesh rotation-x={-Math.PI * 0.5} position-y={-1} scale={10} receiveShadow>
                <planeGeometry />
                <meshStandardMaterial color="greenyellow" />
            </mesh>
        </>
    )
}