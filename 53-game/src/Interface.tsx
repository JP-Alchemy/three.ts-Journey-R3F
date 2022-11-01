import { useKeyboardControls } from "@react-three/drei"
import { EControls } from ".";

export default function Interface() {

    const f = useKeyboardControls<EControls>(state => state.forward);
    const b = useKeyboardControls<EControls>(state => state.backward);
    const r = useKeyboardControls<EControls>(state => state.right);
    const l = useKeyboardControls<EControls>(state => state.left);
    const j = useKeyboardControls<EControls>(state => state.jump);

    return (
        <div className="interface">
            {/* TIME */}
            <div className="time">0.00</div>

            {/* RESTART */}
            <div className="restart">Restart</div>

            {/* Controls */}
            <div className="controls">
                <div className="raw">
                    <div className={`key ${f ? 'active' : ''}`}></div>
                </div>
                <div className="raw">
                    <div className={`key ${l ? 'active' : ''}`}></div>
                    <div className={`key ${b ? 'active' : ''}`}></div>
                    <div className={`key ${r ? 'active' : ''}`}></div>
                </div>
                <div className="raw">
                    <div className={`key large ${j ? 'active' : ''}`}></div>
                </div>
            </div>
        </div>
    )
}