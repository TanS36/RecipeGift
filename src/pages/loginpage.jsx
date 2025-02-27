import styles from '../assets/login.module.sass';
import googleLogo from '../assets/google-logo.png';

function Login() {
  return (
    <div className={styles.log_box}>
      <h1 className={styles.h1}>Login here</h1>
      <form className={styles.login} action="" method="post">
        <div>
          <label htmlFor="username">Username</label>
          <input type="text" name="username" id="username" />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" />
        </div>
        <div className={styles.actions}>
          <input type="submit" name="login" value="Login" />
        </div>
        <div className={styles.google_login}>
          <button className={styles.google_btn}>
            <img src={googleLogo} alt="Google logo" />
            Login with Google
          </button>
        </div>
      </form>
      <div className={styles.forgot}>
          <a href="/forgot">I forgot my password</a>
      </div>
      <div className={styles.account}>
        <p>Create a new account <a href="/register">here</a>.</p>
      </div>
      <div className={styles.contact}>
        <p>If you need any other help, please contact the helpdesk.</p>
      </div>
    </div>
  );
}

export default Login;
