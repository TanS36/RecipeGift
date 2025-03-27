import { useState } from 'react';
import styles from '../assets/register.module.sass';
import axios from 'axios';

function Register() {

  const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
      e.preventDefault();

      const userData = {
        username,
        email,
        password
      };

      try {
        const response = await axios.post('http://localhost:8080/api/auth/register',userData).
        setMessage(response.data);
      } catch (error) {
        setMessage('Registration failed');
      }
    }
  };

  return (
    <div className={styles.reg_box}>
      <h1 className={styles.h1}>Create an Account</h1>
      <form className={styles.register} action="" method="post">
        <div>
          <label htmlFor="username">Username</label>
          <input type="text" name="username" id="username" required />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" required />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" required />
        </div>
        <div>
          <label htmlFor="confirm_password">Confirm Password</label>
          <input type="password" name="confirm_password" id="confirm_password" required />
        </div>
        <div className={styles.actions}>
          <input type="submit" value="Register" />
        </div>
        <div className={styles.login_link}>
          <p>Already have an account? <a href="/login">Login here</a>.</p>
        </div>
      </form>
    </div>


  );
}

export default Register;