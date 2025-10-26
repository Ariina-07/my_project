import { useState, useEffect } from 'react';

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initialValue;
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
}

export function LocalStorageCounter() {
  const [count, setCount] = useLocalStorage('count', 0);
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
}

export function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);
  const toggle = () => setValue(!value);
  return [value, toggle];
}

export function ToggleComponent() {
  const [isOn, toggleIsOn] = useToggle(false);
  return (
    <div>
      <p>The toggle is {isOn ? 'ON' : 'OFF'}</p>
      <button onClick={toggleIsOn}>Toggle</button>
    </div>
  );
}
