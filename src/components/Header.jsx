import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from '../assets/header.module.sass';

function Header() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleAuth = () => {
    if (isAuthenticated) {
      navigate("/profile");
    } else {
      navigate("/login");
    }
  };

  return (
    <header className={styles.header}>
      <h1>RecipeGift</h1>
      <nav>
        <ul>
          <li className={styles.Menu} onClick={() => navigate("/")}>Main</li>
          <li className={styles.Menu} onClick={() => navigate("/maker")}>Maker</li>
          <li className={styles.Menu} onClick={handleAuth}>
            {isAuthenticated ? "Profile" : "Login"}
          </li>
        </ul>
      </nav>
    </header>
  );
}



export default Header;
