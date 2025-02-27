import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from './header.module.sass';

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
          <li className={styles.Menu}>Main</li>
          <li className={styles.Menu}>Recipe</li>
          <li className={styles.Menu}>Maker</li>
          <li className={styles.Menu} onClick={handleAuth}>
            {isAuthenticated ? "Profile" : "Login"}
          </li>
        </ul>
      </nav>
    </header>
  );
}



export default Header;
