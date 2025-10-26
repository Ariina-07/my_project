import React, { useState, useEffect } from 'react';

export function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
}

export function Timer() {
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(seconds => seconds + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return <div>Seconds: {seconds}</div>;
}

export function LoginForm() {
  const [form, setForm] = useState({ email: '', password: '' });
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Email: ${form.email}`);
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({...form, email: e.target.value})}
      />
      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) => setForm({...form, password: e.target.value})}
      />
      <button type="submit">Login</button>
    </form>
  );
}

export function DocumentTitle() {
  const [title, setTitle] = useState('My App');
  useEffect(() => {
    document.title = title;
  }, [title]);
  return (
    <div>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Document title"
      />
    </div>
  );
}
