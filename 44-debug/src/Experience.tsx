import { OrbitControls } from '@react-three/drei'
import { useControls, button } from 'leva';
import { Perf } from 'r3f-perf';

export default function Experience() {

    const { showPerf } = useControls({
        showPerf: false
    })

    const { position, color, visible } = useControls('Sphere', {
        position: {
            value: { x: -2, y: 0 },
            step: 0.01,
            joystick: 'invertY'
        },
        color: '#FF0000',
        visible: true,
        clickMe: button(() => console.log('OK')),
        choice: {
            options: ['a', 'b', 'c']
        }
    });

    const { scale } = useControls('Cube', {
        scale: {
            value: 1.5,
            step: 0.01,
            min: 0,
            max: 5
        }
    });

    return (
        <>
            {showPerf && <Perf position='top-left' />}
            <OrbitControls makeDefault />

            <directionalLight position={[1, 2, 3]} intensity={1.5} />
            <ambientLight intensity={0.5} />

            <group>
                <mesh position-x={2} scale={scale}>
                    <boxGeometry />
                    <meshStandardMaterial color="mediumpurple" />
                </mesh>

                <mesh position={[position.x, position.y, 0]} visible={visible}>
                    <sphereGeometry />
                    <meshStandardMaterial color={color} />
                </mesh>
            </group>

            <mesh rotation-x={-Math.PI * 0.5} position-y={-1} scale={20}>
                <planeGeometry />
                <meshStandardMaterial color="greenyellow" />
            </mesh>
        </>
    )
}