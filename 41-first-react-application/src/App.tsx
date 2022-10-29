import { ReactNode, useMemo, useState } from 'react';
import Clicker from './Clicker';
import People from './People';

interface IAppProps {
  children?: ReactNode;
  clickerCount: number;
}

function App({ children, clickerCount }: IAppProps) {
  const [hasClicker, setHasClicker] = useState(false);
  const [count, setCount] = useState(0);

  const colors = useMemo(() => {
    const colors = [];

    for (let i = 0; i < clickerCount; i++)
      colors.push(`hsl(${Math.random() * 360}deg, 100%,70%)`);

    return colors;
  }, [])

  const toggleClicker = () => {
    setHasClicker(!hasClicker);
  }

  const increment = () => {
    setCount(count + 1);
  }

  return (
    <>
      {children}

      <div>Total Count: {count}</div>

      <button onClick={toggleClicker}>{hasClicker ? 'Hide' : 'Show'} Clicker</button>
      {hasClicker &&
        <>
          {Array.from(Array(clickerCount)).map((_, i) =>
            (<Clicker key={i} increment={increment} keyName={`count-${i}`} color={colors[i]} />)
          )}
        </>
      }

      <People/>
    </>
  );
}

export default App;
