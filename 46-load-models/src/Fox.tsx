import { useAnimations, useGLTF } from "@react-three/drei";
import { MeshProps } from "@react-three/fiber";
import { useControls } from "leva";
import { useEffect } from "react";

export default function Fox(props: MeshProps) {
    const model = useGLTF('./Fox/glTF/Fox.gltf');
    const anims = useAnimations(model.animations, model.scene);
    const { animations } = useControls('Fox', {
        animations: {
            options: anims.names
        }
    })

    useEffect(() => {
        const action = anims.actions[animations]!;
        action.reset().fadeIn(0.5).play();

        return () => {
            action.fadeOut(0.5);
        }
    }, [animations])

    return (
        <>
            <primitive {...props} object={model.scene} scale={0.03} />
        </>
    )
}

useGLTF.preload('./Fox/glTF/Fox.gltf');