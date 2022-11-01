import { useFrame } from '@react-three/fiber';
import { RigidBody, RigidBodyApi, useRapier } from '@react-three/rapier';
import { useKeyboardControls } from '@react-three/drei';
import { EControls } from '.';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function Player() {

    const [sub, getKeys] = useKeyboardControls<EControls>();
    const itemRef = useRef<RigidBodyApi>(null!);
    const { rapier, world } = useRapier();
    const rWorld = world.raw();

    const [smoothCamPos] = useState(() => new THREE.Vector3(10, 10, 10));
    const [smoothCamTarget] = useState(() => new THREE.Vector3());

    const jump = () => {
        const origin = itemRef.current.translation();
        origin.y -= 0.31;
        const dir = { x: 0, y: -1, z: 0 };
        const ray = new rapier.Ray(origin, dir);
        const hit = rWorld.castRay(ray, 1, true);

        if (hit && hit.toi < 0.15)
            itemRef.current.applyImpulse({ x: 0, y: 0.5, z: 0 });
    }

    useEffect(() => {
        return sub((state: any) => state.jump,
            (pressed) => {
                if (pressed) jump();
            });
    }, []);

    useFrame((state, delta) => {
        const key = getKeys();

        const impule = { x: 0, y: 0, z: 0 };
        const torque = { x: 0, y: 0, z: 0 };

        const impulseStrenght = 0.6 * delta;
        const torqueStrenght = 0.2 * delta;

        if (key.forward) {
            impule.z -= impulseStrenght;
            torque.x -= torqueStrenght;
        }

        if (key.backward) {
            // impule.z += impulseStrenght;
            torque.x += torqueStrenght;
        }

        if (key.right) {
            impule.x += impulseStrenght;
            torque.z -= torqueStrenght;
        }

        if (key.left) {
            impule.x -= impulseStrenght;
            torque.z += torqueStrenght;
        }

        itemRef.current.applyImpulse(impule);
        itemRef.current.applyTorqueImpulse(torque);

        // Camera
        const bodyPos = itemRef.current.translation();
        const camPos = new THREE.Vector3();
        camPos.copy(bodyPos);
        camPos.z += 2.25;
        camPos.y += 0.65;

        const camTarget = new THREE.Vector3();
        camTarget.copy(bodyPos);
        camTarget.y += 0.25;

        smoothCamPos.lerp(camPos, 5 * delta);
        smoothCamTarget.lerp(camTarget, 5 * delta);

        state.camera.position.copy(smoothCamPos);
        state.camera.lookAt(smoothCamTarget);
    });

    return (
        <RigidBody position={[0, 1, 0]} restitution={0.2} friction={1} colliders="ball" ref={itemRef}
            linearDamping={0.5} angularDamping={0.5}>
            <mesh castShadow>
                <icosahedronGeometry args={[0.3, 1]} />
                <meshStandardMaterial flatShading color="mediumpurple" />
            </mesh>
        </RigidBody>
    )
}