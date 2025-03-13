import { Link } from "react-router-dom";
import styles from '../assets/navigate.module.sass';

const favoriteFoods = [
  {
    id: 1,
    title: "Pizza",
  },
  {
    id: 2,
    title: "Sushi",
  },
  {
    id: 3,
    title: "Burgers",
  },
  {
    id: 4,
    title: "Sandwich",
  },
  {
    id: 5,
    title: "Salad",
  },
  {
    id: 6,
    title: "Macarune",
  },
];



function Navigate() {
  return (
    <aside>
     <h2 className={styles.Menu}>Поиск рецептов</h2>
     <ul>
        {favoriteFoods.map((food) => (
          <li key={food.id}>
            <Link to={`/maker/${food.title}`}>{food.title}</Link>
          </li>
        ))}
      </ul>
    </aside> 
  );
}

export default Navigate;