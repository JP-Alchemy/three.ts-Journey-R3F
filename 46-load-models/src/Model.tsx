import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { useLoader } from '@react-three/fiber';

export default function Model() {
    const model = useLoader(GLTFLoader, './hamburger.glb', (loader) => {
        const draco = new DRACOLoader();
        draco.setDecoderPath('./draco/');
        (loader as GLTFLoader).setDRACOLoader(draco);
    });

    return (
        <>
            <primitive object={model.scene} scale={0.35} />
        </>
    )
}