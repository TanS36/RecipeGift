import { Form } from "react-router-dom";
import styles from "../assets/profile.module.sass";
import Contact from "./contact";
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function ProfilePage() {
  const contact = {
    first: "Karim228",
    last: "",
    avatar: "https://robohash.org/you.png?size=200x200",
    twitter: "frontend_karim",
    notes: "Frontend developer & tech enthusiast",
    favorite: true,
    age: 18,
    class: "3rd year",
    course: "Web Development",
  };

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

  return (
  <>
  <Header />
  <div className={styles.profileContainer}>
      <div className={styles.profileContent}>
        <Contact contact={contact} />

        <div className={styles.userInfoSection}>
          <div className={styles.userInfoHeader}>
            <img src={contact.avatar} alt="User Avatar" className={styles.userAvatar} />
            <div>
              <h3>Информация о пользователе</h3>
              <p><strong>Возраст:</strong> {contact.age}</p>
              <p><strong>Класс:</strong> {contact.class}</p>
              <p><strong>Курс:</strong> {contact.course}</p>
            </div>
          </div>
        </div>

        <hr className={styles.divider} />

        <div className={styles.favoriteFoods}>
          <h3>Любимые блюда:</h3>
          <div className={styles.cardsContainer}>
            {favoriteFoods.map((food) => (
              <FoodCard key={food.id} food={food} />
            ))}
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </>
  );
}

function FoodCard({ food }) {
  return (
    <div className={styles.foodCard}>
      <img src={food.image} alt={food.title} className={styles.foodImage} />
      <div className={styles.foodContent}>
        <h4 className={styles.foodTitle}>{food.title}</h4>
        <p className={styles.foodDescription}>{food.description}</p>
      </div>
      <div className={styles.cardButtons}>
        <Form action={`edit/${food.id}`}>
          <button className={styles.editButton} type="submit">
            Edit
          </button>
        </Form>
        <Form
          method="post"
          action={`destroy/${food.id}`}
          onSubmit={(event) => {
            if (!confirm(`Удалить ${food.title}?`)) {
              event.preventDefault();
            }
          }}
        >
          <button className={styles.deleteButton} type="submit">
            Delete
          </button>
        </Form>
      </div>
    </div>
  );
}

