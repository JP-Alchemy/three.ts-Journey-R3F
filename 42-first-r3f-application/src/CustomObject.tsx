import { useEffect, useMemo, useRef } from "react";
import * as THREE from 'three';

export default function CustomObject() {

    const verticesCount = 5 * 3;
    const ref = useRef<THREE.BufferGeometry>(null!);

    const positions = useMemo(() => {
        const amount = verticesCount * 3;
        const positions = new Float32Array(amount);
        for (let i = 0; i < amount; i++)
            positions[i] = (Math.random() - .5) * 3;
        return positions;
    }, [])

    useEffect(() => {
        ref.current.computeVertexNormals();
    }, [])

    return (
        <mesh>
            <bufferGeometry ref={ref}>
                <bufferAttribute attach="attributes-position"
                    count={verticesCount} itemSize={3} array={positions} />
            </bufferGeometry>
            <meshStandardMaterial color="red"side={THREE.DoubleSide}/>
        </mesh>
    )
}