import { OrbitControls, useHelper, Stage } from '@react-three/drei'
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
        color: '#4b2709',
        opactity: {
            value: 0.4,
            min: 0,
            max: 1,
        },
        blur: {
            value: 2.8,
            min: 0,
            max: 10,
        }
    });

    // const { sunPosition } = useControls('Sun', {
    //     sunPosition: {
    //         value: [0.01, 0.01, 0.01],
    //         step: 0.001
    //     }
    // })

    const { envMapIntesity, envMapHeight, envMapRadius, envMapScale } = useControls('Environment', {
        envMapIntesity: { value: 7, min: 0, max: 12 },
        envMapHeight: { value: 7, min: 0, max: 100 },
        envMapRadius: { value: 28, min: 110, max: 1000 },
        envMapScale: { value: 100, min: 10, max: 1000 },
    })

    return (
        <>
            {/* <BakeShadows /> */}

            {/* <Environment preset='sunset'
                ground={{ height: envMapHeight, radius: envMapRadius, scale: envMapScale }}> */}
            {/* <color args={['#000000']} attach='background'/> */}
            {/* <Lightformer  position-z={-5} scale={10} color='red' intensity={10} form='ring'/> */}
            {/* <mesh position-z={-5} scale={10}>
                    <planeGeometry />
                    <meshBasicMaterial color={[3.5,0,0]} />
                </mesh> */}
            {/* </Environment> */}

            <color args={['ivory']} attach='background' />

            {/* <Sky sunPosition={sunPosition} /> */}

            <Perf position='top-left' />

            <OrbitControls makeDefault />

            {/* <AccumulativeShadows scale={10} position-y={-0.99} color='#316d39' opacity={0.8} frames={Infinity} blend={100} temporal>
                <RandomizedLight position={[1, 2, 3]} bias={0.001} amount={8} radius={1} ambient={0.5} intensity={1}/>
            </AccumulativeShadows> */}

            {/* <ContactShadows scale={10} resolution={512} far={5}
                color={color} opacity={opactity} blur={blur} frames={1}
            /> */}

            {/* <directionalLight ref={dirLight} position={sunPosition}
                intensity={1.5} castShadow
                shadow-mapSize={[1024, 1024]}
                shadow-camera-near={1}
                shadow-camera-far={10}
                shadow-camera-top={5}
                shadow-camera-right={5}
                shadow-camera-bottom={-5}
                shadow-camera-left={-5}
            />
            <ambientLight intensity={0.5} /> */}

            <Stage contactShadow={{opacity: 0.2, blur: 3}} environment='sunset' preset='portrait' intensity={2}>
                <mesh position-x={2} position-y={1} ref={cube} castShadow>
                    <boxGeometry />
                    <meshStandardMaterial color="mediumpurple" envMapIntensity={envMapIntesity} />
                </mesh>

                <mesh position-x={-2} castShadow position-y={1}>
                    <sphereGeometry />
                    <meshStandardMaterial color='orange' envMapIntensity={envMapIntesity} />
                </mesh>
            </Stage>

            {/* <mesh rotation-x={-Math.PI * 0.5} scale={10} receiveShadow >
                <planeGeometry />
                <meshStandardMaterial color="greenyellow" envMapIntensity={envIntesity} />
            </mesh> */}
        </>
    )
}