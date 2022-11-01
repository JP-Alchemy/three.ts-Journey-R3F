import { OrbitControls } from '@react-three/drei'
import Level from './Level'
import Lights from './Lights'
import { Debug, Physics } from '@react-three/rapier';

export default function Experience() {
  return <>

    <OrbitControls makeDefault />

    <Physics>
      <Lights />

      <Debug />
      <Level />
    </Physics>

  </>
}