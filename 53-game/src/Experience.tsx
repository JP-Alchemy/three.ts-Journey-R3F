import Lights from './Lights'
import { Debug, Physics } from '@react-three/rapier';
import { Level } from './Level';
import Player from './Player';

export default function Experience() {
  return <>
    <Physics>
      {/* <Debug /> */}
      <Lights />
      <Level />
      <Player />
    </Physics>

  </>
}