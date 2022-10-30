import DrunkEffect, { IDrunkEffect } from "./DrunkEffect"

export default function Drunk(props: IDrunkEffect) {

    const effect = new DrunkEffect(props);

    return <primitive object={effect} />
}