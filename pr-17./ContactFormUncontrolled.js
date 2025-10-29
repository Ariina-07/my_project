import React, { useRef } from 'react';

function ContactFormUncontrolled() {
  const nameRef = useRef();
  const emailRef = useRef();
  const messageRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      message: messageRef.current.value,
    };

    console.log('Данные формы:', formData);
    alert('Форма отправлена!');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Форма обратной связи</h2>
      
      <div>
        <label>Имя:</label>
        <input
          type="text"
          ref={nameRef}
        />
      </div>

      <div>
        <label>Email:</label>
        <input
          type="email"
          ref={emailRef}
        />
      </div>

      <div>
        <label>Сообщение:</label>
        <textarea
          ref={messageRef}
        />
      </div>

      <button type="submit">Отправить</button>
    </form>
  );
}

export default ContactFormUncontrolled;