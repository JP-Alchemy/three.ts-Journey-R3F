import { useEffect, useRef, useState } from "react";

interface IClickerProps {
    keyName: string;
    color: string;
    increment: () => void;
}

export default function Clicker({ keyName, color = "red", increment }: IClickerProps) {
    const [count, setCount] = useState(parseInt(localStorage.getItem(keyName) ?? '0'));
    const buttonRef = useRef<HTMLButtonElement>(null!);

    const buttonClick = () => {
        setCount(count + 1);
        increment();
    }

    useEffect(() => {
        buttonRef.current.style.backgroundColor = "papayawhip";
        buttonRef.current.style.color = "salmon";

        return () => {
            localStorage.removeItem(keyName);
        }
    }, [])

    useEffect(() => {
        localStorage.setItem(keyName, count.toString());
    }, [count])

    return (
        <>
            <h1 style={{ color }}>Click Count: {count}</h1>
            <button onClick={buttonClick} ref={buttonRef}>Click Me</button>
        </>
    )
}