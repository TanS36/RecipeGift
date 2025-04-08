import { useState, useEffect } from 'react';
import styles from '../assets/login.module.sass';
import googleLogo from '../assets/google-logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/userSlice'; // You might need a new action for Google login
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.user);
  const [message, setMessage] = useState('');

  useEffect(() => {
    function handleCallbackResponse(response) {
      console.log("Encoded JWT ID token: " + response.credential);
      // Send this token to your Spring Boot backend for Google authentication
      sendGoogleTokenToBackend(response.credential);
    }

    window.google.accounts.id.initialize({
      client_id: "440231654356-m7vh3t51m47fdst1757p6aq91j2j2e8d.apps.googleusercontent.com", // Replace with your actual client ID
      callback: handleCallbackResponse
    });

    window.google.accounts.id.renderButton(
        document.getElementById("signInDiv"),
        { theme: "outline", size: "large" }
    );
  }, []);

  const sendGoogleTokenToBackend = async (token) => {
    try {
      const backendUrl = 'http://localhost:8080/api/auth/google';
      const response = await fetch(backendUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });

      if (response.ok) {
        const data = await response.json();
        // Assuming your backend returns a JWT upon successful Google login
        localStorage.setItem('jwtToken', data.token); // Store the token
        navigate('/profile'); // Redirect to profile
      } else {
        const errorMessage = await response.text();
        setMessage(`Google sign-in failed: ${errorMessage}`);
        console.error("Google sign-in failed:", response.status, errorMessage);
      }
    } catch (error) {
      setMessage(`Error sending token to backend: ${error.message}`);
      console.error("Error sending token to backend:", error);
    }
  };

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
              <div id="signInDiv"></div> {/* Google Sign-In button will be rendered here */}
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
          {message && <p className={styles.error_message}>{message}</p>}
        </form>
      </div>
  );
}

export default Login;