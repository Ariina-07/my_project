import React from 'react';
import UserRegistrationForm from './UserRegistrationForm';
import UserRegistrationFormWithValidation from './UserRegistrationFormWithValidation';
import ContactFormUncontrolled from './ContactFormUncontrolled';

function App() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Практическая работа №17: React Forms</h1>
      <UserRegistrationForm />
      <hr />
      <UserRegistrationFormWithValidation />
      <hr />
      <ContactFormUncontrolled />
    </div>
  );
}

export default App;