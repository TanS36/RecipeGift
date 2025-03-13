import { useState } from "react";
import { Outlet } from "react-router-dom";
import Contact from "../pages/contact"; 
import styles from '../assets/search.module.sass';

const favoriteFoods = [
  {
    id: 1,
    image: "https://avatars.mds.yandex.net/i?id=b98640bcd9220f4ba38ca4c60bc377f2a39f4807-10814926-images-thumbs&n=13",
    title: "Pizza",
    description: "Сытная и вкусная итальянская классика.",
  },
  {
    id: 2,
    image: "https://avatars.mds.yandex.net/i?id=867fb22a86b18c1d25b195b9d0cf809542b4b86a-5583576-images-thumbs&n=13",
    title: "Sushi",
    description: "Легкие и изысканные японские роллы.",
  },
  {
    id: 3,
    image: "https://i.pinimg.com/736x/da/33/12/da331278c558c22171aff64edf5dd8f4.jpg",
    title: "Burgers",
    description: "Сочные бургеры с разными начинками.",
  },
  {
    id: 4,
    image: "https://i.pinimg.com/736x/da/33/12/da331278c558c22171aff64edf5dd8f4.jpg",
    title: "Sandwich",
    description: "Сочные бургеры с разными начинками.",
  },
  {
    id: 5,
    image: "https://i.pinimg.com/736x/da/33/12/da331278c558c22171aff64edf5dd8f4.jpg",
    title: "Salad",
    description: "Сочные бургеры с разными начинками.",
  },
  {
    id: 6,
    image: "https://i.pinimg.com/736x/da/33/12/da331278c558c22171aff64edf5dd8f4.jpg",
    title: "Macarune",
    description: "Сочные бургеры с разными начинками.",
  },
];

function Search() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredFoods = favoriteFoods.filter((food) => {
    const firstWord = food.title.split(" ")[0].toLowerCase(); 
    return searchTerm && firstWord.startsWith(searchTerm.toLowerCase()); 
  });

  return (
    <article>
      <h2>Лучший способ поделиться с друзьями своими рецептами</h2>
      <input
        type="text"
        placeholder="Поиск рецептов..."
        className={styles.search_input}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Contact favoriteFoods={filteredFoods} searchTerm={searchTerm} />
      <Outlet />
    </article>
  );
}

export default Search;
