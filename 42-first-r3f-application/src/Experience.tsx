export default function Experience() {

    return (
        <>
            <mesh position-x={2} rotation-y={Math.PI * 0.25} scale={1.5}>
                <boxGeometry />
                <meshBasicMaterial color="mediumpurple" />
            </mesh>
            <mesh position-x={-2}>
                <sphereGeometry />
                <meshBasicMaterial color="orange" />
            </mesh>
            <mesh rotation-x={-Math.PI * 0.4} position-y={-1} scale={10}>
                <planeGeometry />
                <meshBasicMaterial color="greenyellow" />
            </mesh>
        </>
    )
}