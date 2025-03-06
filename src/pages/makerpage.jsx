import React from "react";
import { useParams } from "react-router-dom";
import styles from "../assets/maker.module.sass";

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
];

export default function MakerPage() {
  const { title } = useParams();
  const food = favoriteFoods.find((item) => item.title.toLowerCase() === title.toLowerCase());

  if (!food) {
    return <p className={styles.notFound}>Блюдо не найдено</p>;
  }

  return (
    <div className={styles.makerContainer}>
      <img src={food.image} alt={food.title} className={styles.foodImage} />
      <h2 className={styles.foodTitle}>{food.title}</h2>
      <p className={styles.foodDescription}>{food.description}</p>
    </div>
  );
}
