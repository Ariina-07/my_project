import React, { useReducer, useRef, useMemo, useContext, createContext } from 'react';

const todoReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, { id: Date.now(), text: action.text, completed: false }];
    case 'TOGGLE_TODO':
      return state.map(todo =>
        todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
      );
    default:
      return state;
  }
};

export function TodoList() {
  const [todos, dispatch] = useReducer(todoReducer, []);
  const inputRef = useRef();
  const addTodo = () => {
    if (inputRef.current.value) {
      dispatch({ type: 'ADD_TODO', text: inputRef.current.value });
      inputRef.current.value = '';
    }
  };
  return (
    <div>
      <input ref={inputRef} placeholder="New todo" />
      <button onClick={addTodo}>Add</button>
      {todos.map(todo => (
        <div key={todo.id}>
          <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
            {todo.text}
          </span>
          <button onClick={() => dispatch({ type: 'TOGGLE_TODO', id: todo.id })}>
            Toggle
          </button>
        </div>
      ))}
    </div>
  );
}

export function FocusInput() {
  const inputRef = useRef();
  const focusInput = () => {
    inputRef.current.focus();
  };
  return (
    <div>
      <input ref={inputRef} placeholder="Click button to focus" />
      <button onClick={focusInput}>Focus Input</button>
    </div>
  );
}

export function ExpensiveCalculation() {
  const [number, setNumber] = useState(1);
  const expensiveResult = useMemo(() => {
    console.log('Calculating...');
    return number * 2;
  }, [number]);
  return (
    <div>
      <p>Number: {number}</p>
      <p>Result: {expensiveResult}</p>
      <button onClick={() => setNumber(number + 1)}>Increment</button>
    </div>
  );
}

const ThemeContext = createContext();
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function ThemeToggle() {
  const { theme, setTheme } = useContext(ThemeContext);
  return (
    <div style={{ background: theme === 'light' ? '#fff' : '#333', color: theme === 'light' ? '#000' : '#fff', padding: '10px' }}>
      <p>Current theme: {theme}</p>
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        Toggle Theme
      </button>
    </div>
  );
}
