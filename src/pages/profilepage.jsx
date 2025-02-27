import { Link } from "react-router-dom";
import Contact from "./contact";
import styles from "../assets/profile.module.sass";

const ProfilePage = () => {
  const user = {
    avatar: "https://robohash.org/you.png?size=200x200", 
    nickname: "Karim228",
    description: "Frontend developer & tech enthusiast",
    favoriteFoods: ["Pizza", "Sushi", "Burgers", "Pasta", "Ice Cream"],
  };

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileHeader}>
        <img src={user.avatar} alt="User Avatar" className={styles.avatar} />
        <h2 className={styles.nickname}>{user.nickname}</h2>
        <p className={styles.description}>{user.description}</p>
      </div>
      <div className={styles.favoriteFoods}>
        <h3>Любимые блюда:</h3>
        <ul>
          {user.favoriteFoods.map((food, index) => (
            <li key={index}>{food}</li>
          ))}
        </ul>
      </div>
      <Contact />
      <Link to="/" className={styles.backButton}>На главную</Link>
    </div>
  );
};

export default ProfilePage;
