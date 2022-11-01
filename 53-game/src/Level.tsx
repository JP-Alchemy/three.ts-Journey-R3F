import { useFrame } from '@react-three/fiber';
import { useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { RigidBody, RigidBodyApi, Vector3Array, CuboidCollider } from '@react-three/rapier'
import { useGLTF } from '@react-three/drei';
import { BoxGeometry } from 'three';

(THREE as any).ColorManagement.legacyMode = false;
const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const floor1Mat = new THREE.MeshStandardMaterial({ color: 'limegreen' });
const floor2Mat = new THREE.MeshStandardMaterial({ color: 'greenyellow' });
const obstacleMat = new THREE.MeshStandardMaterial({ color: 'orangered' });
const wallMat = new THREE.MeshStandardMaterial({ color: 'slategrey' });

interface IBlockProps {
    position: Vector3Array
}

function StartBlock(props: IBlockProps) {
    return (
        <group position={props.position}>
            <mesh scale={[4, 0.2, 4]} position-y={-0.1} geometry={boxGeometry} material={floor1Mat} receiveShadow />
        </group>
    )
}

function EndBlock(props: IBlockProps) {
    const item = useGLTF('./hamburger.glb');
    item.scene.traverse(obj => {
        console.log(obj);
        obj.castShadow = true;
    });

    return (
        <group position={props.position}>
            <RigidBody type="fixed" colliders="hull" friction={0} restitution={0.2}>
                <primitive object={item.scene} scale={0.2} position-y={0.25} />
            </RigidBody>
            <mesh scale={[4, 0.2, 4]} geometry={boxGeometry} material={floor1Mat} receiveShadow />
        </group>
    )
}

export function BlockSpinner(props: IBlockProps) {

    const itemRef = useRef<RigidBodyApi>(null!);
    const [randSpeed] = useState(() => (Math.random() + 0.2) * (Math.random() < .5 ? -1 : 1));

    useFrame((state, delta) => {
        const time = state.clock.getElapsedTime();
        const qRot = new THREE.Quaternion();
        qRot.setFromEuler(new THREE.Euler(0, time * randSpeed, 0));
        itemRef.current.setNextKinematicRotation(qRot);
    })

    return (
        <group position={props.position}>
            <RigidBody type="kinematicPosition" friction={0} restitution={0.2} ref={itemRef}>
                <mesh scale={[0.2, 0.2, 4]} position-y={0.12} receiveShadow castShadow material={obstacleMat} geometry={boxGeometry} />
            </RigidBody>
            <mesh scale={[4, 0.2, 4]} position-y={-0.1} geometry={boxGeometry} material={floor2Mat} receiveShadow />
        </group>
    );
}

export function BlockAxe(props: IBlockProps) {

    const itemRef = useRef<RigidBodyApi>(null!);
    const [timeOffset] = useState(() => (Math.random() * Math.PI * 2));

    useFrame((state, delta) => {
        const x = Math.sin(state.clock.getElapsedTime() + timeOffset) * 1.25;
        itemRef.current.setNextKinematicTranslation({ x: props.position[0] + x, y: props.position[1], z: props.position[2] });
    })

    return (
        <group position={props.position}>
            <RigidBody type="kinematicPosition" friction={0} restitution={0.2} ref={itemRef}>
                <mesh scale={[1.5, 1.5, 0.3]} position-y={0.75} receiveShadow castShadow material={obstacleMat} geometry={boxGeometry} />
            </RigidBody>
            <mesh scale={[4, 0.2, 4]} position-y={-0.1} geometry={boxGeometry} material={floor2Mat} receiveShadow />
        </group>
    );
}

export function BlockLimbo(props: IBlockProps) {

    const itemRef = useRef<RigidBodyApi>(null!);
    const [timeOffset] = useState(() => (Math.random() * Math.PI * 2));

    useFrame((state, delta) => {
        const y = (Math.sin(state.clock.elapsedTime + timeOffset) + 1.12);
        itemRef.current.setNextKinematicTranslation({ x: props.position[0], y: props.position[1] + y, z: props.position[2] });
    })

    return (
        <group position={props.position}>
            <RigidBody type="kinematicPosition" friction={0} restitution={0.2} ref={itemRef}>
                <mesh scale={[0.2, 0.2, 4]} position-y={0.12} rotation-y={Math.PI * 0.5} receiveShadow castShadow material={obstacleMat} geometry={boxGeometry} />
            </RigidBody>
            <mesh scale={[4, 0.2, 4]} position-y={-0.1} geometry={boxGeometry} material={floor2Mat} receiveShadow />
        </group>
    );
}

interface IBooundsProps {
    length: number;
}
function Bounds(props: IBooundsProps) {
    return (
        <>
            <RigidBody type="fixed" friction={0} restitution={0.2}>
                <mesh scale={[0.3, 1.5, (props.length + 2) * 4]} castShadow geometry={boxGeometry} material={wallMat} position={[2.15, 0.75, -(props.length + 1) * 2]} />
                <mesh scale={[0.3, 1.5, (props.length + 2) * 4]} receiveShadow geometry={boxGeometry} material={wallMat} position={[-2.15, 0.75, -(props.length + 1) * 2]} />
                <mesh scale={[4, 1.5, 0.3]} receiveShadow geometry={boxGeometry} material={wallMat} position={[0, 0.75, -(props.length + 1.5) * 4]} />
                <CuboidCollider args={[2, 0.1, 2 * (props.length + 2)]} position={[0, -0.1, -(props.length + 1) * 2]} friction={1} restitution={0.2} />
            </RigidBody>
        </>
    )
}

interface ILevelProps {
    count?: number;
    types?: any[];
}

export function Level({ count = 5, types = [BlockLimbo, BlockSpinner, BlockAxe] }: ILevelProps) {

    const blocks = useMemo(() => {
        const tBlocks = [];

        for (let i = 0; i < count; i++) {
            tBlocks.push(types[Math.floor(Math.random() * types.length)]);
        }
        console.log(tBlocks);

        return tBlocks;
    }, [count, types])

    return (
        <>
            <StartBlock position={[0, 0, 0]} />
            {blocks.map((Block, i) => <Block key={i} position={[0, 0, -(i + 1) * 4]} />)}
            <EndBlock position={[0, 0, -(count + 1) * 4]} />
            <Bounds length={count} />
        </>
    );
}