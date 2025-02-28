import styles from "../assets/profile.module.sass";

export default function Contact({ favoriteFoods, searchTerm }) {
  return (
    <div className={styles.favoriteFoods}>
      {searchTerm ? ( 
        favoriteFoods.length > 0 ? (
          <div className={styles.cardsContainer}>
            {favoriteFoods.map((food) => (
              <FoodCard key={food.id} food={food} />
            ))}
          </div>
        ) : (
          <p>Ничего не найдено</p>
        )
      ) : null}
    </div>
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
    </div>
  );
}
