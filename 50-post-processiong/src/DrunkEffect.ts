import { Effect } from 'postprocessing'
import { Uniform } from 'three';
import { BlendFunction } from 'postprocessing';

const fragmentShader = /*glsl*/ `

    uniform float frequency;
    uniform float amplitude;
    uniform float offset;

    void mainUv(inout vec2 uv) {
        uv.y += sin(uv.x * frequency + offset) * amplitude;
    }

    void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
        outputColor = vec4(0.8, 1.0, 0.5, inputColor.a);
    }
`;

export interface IDrunkEffect {
    frequency: number,
    amplitude: number,
    blendFunction: BlendFunction;
}

export default class DrunkEffect extends Effect {
    constructor(props: IDrunkEffect) {
        super(DrunkEffect.name, fragmentShader, {
            blendFunction: props.blendFunction,
            uniforms: new Map<string, Uniform>([
                ['frequency', new Uniform(props.frequency)],
                ['amplitude', new Uniform(props.amplitude)],
                ['offset', new Uniform(0)],
            ])
        });
    }

    update(renderer: any, inputBuffer: any, deltaTime: number) {
        this.uniforms.get('offset')!.value += deltaTime;
    }
}