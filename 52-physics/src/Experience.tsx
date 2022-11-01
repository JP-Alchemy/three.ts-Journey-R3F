import { OrbitControls, useGLTF } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import { Physics, RigidBody, Debug, CollisionEnterPayload, RigidBodyApi, CylinderCollider, CuboidCollider, InstancedRigidBodies, Vector3Array } from '@react-three/rapier';
import { useEffect, useMemo, useRef, useState } from 'react';
import { ThreeEvent, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function Experience() {
  const cube = useRef<RigidBodyApi>(null!);
  const twister = useRef<RigidBodyApi>(null!);
  const [hitSound] = useState(() => new Audio('./hit.mp3'));

  const model = useGLTF('./hamburger.glb')

  const cubeJump = (e: ThreeEvent<MouseEvent>) => {
    cube.current.applyImpulse({ x: 0, y: 5, z: 0 }, true);
    cube.current.applyTorqueImpulse({ x: 0, y: (Math.random() - 0.5) * 3, z: 0 });
  }

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    const eRot = new THREE.Euler(0, time * 3, 0);
    const qRot = new THREE.Quaternion();
    qRot.setFromEuler(eRot);
    twister.current.setNextKinematicRotation(qRot);

    const angle = time * 0.5;
    const x = Math.cos(angle) * 5;
    const z = Math.sin(angle) * 5;
    twister.current.setNextKinematicTranslation({ x, z, y: -0.8 })
  });

  const collisionEnter = (e: CollisionEnterPayload) => {
    console.log('Coolision');
    hitSound.currentTime = 0;
    hitSound.volume = Math.random();
    hitSound.play();
  }

  const cubesCount = 1000;
  const instacedRef = useRef<THREE.InstancedMesh>(null!);

  const cubeTransforms = useMemo(() => {
    const positions: Array<Vector3Array> = [];
    const rotations: Array<Vector3Array> = [];
    const scales: Array<Vector3Array> = [];

    for (let i = 0; i < cubesCount; i++) {
      positions.push([
        (Math.random() - 0.5) * 8,
        6 + i * 0.2,
        (Math.random() - 0.5) * 8])

      rotations.push([0, 0, 0])
      const scale = 0.2 + (Math.random() * 0.8);
      scales.push([scale, scale, scale])
    }

    return { positions, rotations, scales };
  }, []);

  // useEffect(() => {
  //   for (let i = 0; i < cubesCount; i++) {
  //     const matrix = new THREE.Matrix4();
  //     matrix.compose(
  //       new THREE.Vector3(i * 2, 0, 0),
  //       new THREE.Quaternion(),
  //       new THREE.Vector3(1, 1, 1)
  //     )
  //     instacedRef.current.setMatrixAt(i, matrix);
  //   }
  // }, [])

  return <>

    <Perf position="top-left" />

    <OrbitControls makeDefault />

    <directionalLight castShadow position={[1, 2, 3]} intensity={1.5} />
    <ambientLight intensity={0.5} />

    <Physics>

      {/* <Debug /> */}

      <RigidBody colliders="ball">
        <mesh castShadow position={[-1.5, 2, 0]}>
          <sphereGeometry />
          <meshStandardMaterial color="orange" />
        </mesh>
      </RigidBody>

      <RigidBody ref={cube}
      // onCollisionEnter={collisionEnter}
      // onCollisionExit={() => console.log('Exit')}
      >
        <mesh castShadow position={[1.5, 2, 0]} onClick={cubeJump}>
          <boxGeometry />
          <meshStandardMaterial color="mediumpurple" />
        </mesh>
      </RigidBody>

      <RigidBody type="fixed" restitution={1}>
        <mesh receiveShadow position-y={- 1.25}>
          <boxGeometry args={[10, 0.5, 10]} />
          <meshStandardMaterial color="greenyellow" />
        </mesh>
      </RigidBody>

      <RigidBody type="fixed" restitution={1}>
        <CuboidCollider args={[5, 2, 0.5]} position={[0, 1, 5.25]} />
        <CuboidCollider args={[5, 2, 0.5]} position={[0, 1, -5.25]} />
        <CuboidCollider args={[0.5, 2, 5]} position={[5.25, 1, 0]} />
        <CuboidCollider args={[0.5, 2, 5]} position={[-5.25, 1, 0]} />
      </RigidBody>


      <RigidBody type="kinematicPosition" position={[0, -.8, 0]} friction={0} ref={twister}>
        <mesh>
          <boxGeometry args={[0.4, 0.4, 10]} />
          <meshStandardMaterial color="red" />
        </mesh>
      </RigidBody>

      <RigidBody position-y={4} colliders={false}>
        <CylinderCollider args={[0.5, 1.25]} />
        <primitive object={model.scene} scale={0.25} />
      </RigidBody>

      <InstancedRigidBodies {...cubeTransforms}>
        <instancedMesh args={[undefined, undefined, cubesCount]} castShadow ref={instacedRef}>
          <boxGeometry />
          <meshStandardMaterial color="tomato" />
        </instancedMesh>
      </InstancedRigidBodies>

      {/* <RigidBody colliders={false} position={[0, 1, 0]} rotation-x={Math.PI * 0.2}>
        <CuboidCollider args={[1.5,1.5,0.5]} />
        <mesh castShadow>
          <torusGeometry args={[1, 0.5, 16, 32]} />
          <meshStandardMaterial color="red" />
        </mesh>
      </RigidBody> */}
    </Physics>
  </>
}