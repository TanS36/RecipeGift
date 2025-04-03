import { useState } from 'react';
import styles from '../assets/register.module.sass';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    const userData = {
      name: username, // Изменил имя поля username на name, как ожидает бэкенд
      email,
      password,
      provider: 'local', // Добавил provider
    };

    try {
      const response = await axios.post('http://localhost:8080/api/auth/register', userData);
      setMessage(response.data.message); // Изменил доступ к сообщению
      // Перенаправляем пользователя на страницу логина после успешной регистрации
      navigate('/login');
    } catch (error) {
      setMessage('Registration failed');
      console.error('Registration error:', error);
    }
  };

  return (
      <div className={styles.reg_box}>
        <h1 className={styles.h1}>Create an Account</h1>
        <form className={styles.register} onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username</label>
            <input
                type="text"
                name="username"
                id="username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
                type="email"
                name="email"
                id="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
                type="password"
                name="password"
                id="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="confirm_password">Confirm Password</label>
            <input
                type="password"
                name="confirm_password"
                id="confirm_password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className={styles.actions}>
            <input type="submit" value="Register" />
          </div>
          <div className={styles.login_link}>
            <p>
              Already have an account? <a href="/login">Login here</a>.
            </p>
          </div>
          {message && <p>{message}</p>}
        </form>
      </div>
  );
}

export default Register;