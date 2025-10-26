import React from 'react';
import { Counter, Timer, LoginForm, DocumentTitle } from './components/BasicHooks';
import { TodoList, FocusInput, ExpensiveCalculation, ThemeProvider, ThemeToggle } from './components/AdvancedHooks';
import { LocalStorageCounter, ToggleComponent } from './components/CustomHooks';

function App() {
  return (
    <ThemeProvider>
      <div style={{ padding: '20px' }}>
        <h1>React Hooks Practice</h1>
        <Counter />
        <Timer />
        <LoginForm />
        <DocumentTitle />
        <TodoList />
        <FocusInput />
        <ExpensiveCalculation />
        <ThemeToggle />
        <LocalStorageCounter />
        <ToggleComponent />
      </div>
    </ThemeProvider>
  );
}

export default App;
