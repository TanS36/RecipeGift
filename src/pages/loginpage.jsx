import { useState } from 'react';
import styles from '../assets/login.module.sass';
import googleLogo from '../assets/google-logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.user);
  const [message, setMessage] = useState(''); // Добавлено состояние message

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
    if (error) {
      setMessage(error);
    }
  };

  if (status === 'succeeded') {
    navigate('/profile');
  }

  return (
      <div className={styles.log_box}>
        <h1 className={styles.h1}>Login here</h1>
        <form className={styles.login} onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className={styles.login_panel}>
            <div className={styles.google_login}>
              <button type="submit" name="login" className={styles.google_btn}>
                Login
              </button>
            </div>
            <div className={styles.google_login}>
              <button className={styles.google_btn}>
                <img src={googleLogo} alt="Google logo" />
                Login with Google
              </button>
            </div>
          </div>
          <div className={styles.google_login}>
            <a href="/forgot">I forgot my password</a>
          </div>
          <div className={styles.google_login}>
            <p>
              Create a new account <a href="/register">here</a>.
            </p>
          </div>
          {message && <p>{message}</p>}
        </form>
      </div>
  );
}

export default Login;