import { OrbitControls } from '@react-three/drei'
import { useControls } from 'leva';
import { Perf } from 'r3f-perf';

export default function Experience() {

    const { showPerf } = useControls({
        showPerf: false
    })

    return (
        <>
            {showPerf && <Perf position='top-left' />}
            <OrbitControls makeDefault />

            <directionalLight position={[1, 2, 3]} intensity={1.5} />
            <ambientLight intensity={0.5} />

            <group>
                <mesh position-x={2}>
                    <boxGeometry />
                    <meshStandardMaterial color="mediumpurple" />
                </mesh>

                <mesh>
                    <sphereGeometry />
                    <meshStandardMaterial />
                </mesh>
            </group>

            <mesh rotation-x={-Math.PI * 0.5} position-y={-1} scale={20}>
                <planeGeometry />
                <meshStandardMaterial color="greenyellow" />
            </mesh>
        </>
    )
}