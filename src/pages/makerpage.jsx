import { useState } from "react";
import { useParams } from "react-router-dom";
import styles from "../assets/maker.module.sass";
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function MakerPage() {
  const { title } = useParams();
  const [recipes, setRecipes] = useState([
    {
      id: 1,
      image: "https://avatars.mds.yandex.net/i?id=b98640bcd9220f4ba38ca4c60bc377f2a39f4807-10814926-images-thumbs&n=13",
      title: "Pizza",
      description: "Сытная и вкусная итальянская классика."
    },
    {
      id: 2,
      image: "https://avatars.mds.yandex.net/i?id=867fb22a86b18c1d25b195b9d0cf809542b4b86a-5583576-images-thumbs&n=13",
      title: "Sushi",
      description: "Легкие и изысканные японские роллы."
    },
    {
      id: 3,
      image: "https://i.pinimg.com/736x/da/33/12/da331278c558c22171aff64edf5dd8f4.jpg",
      title: "Burgers",
      description: "Сочные бургеры с разными начинками.",
    },
  ]);
  
  const [newRecipe, setNewRecipe] = useState({ title: "", description: "", image: "" });
  const [editingId, setEditingId] = useState(null);

  const handleAddRecipe = () => {
    setRecipes([...recipes, { id: Date.now(), ...newRecipe }]);
    setNewRecipe({ title: "", description: "", image: "" });
  };

  const handleEditRecipe = (id) => {
    const recipeToEdit = recipes.find((recipe) => recipe.id === id);
    setNewRecipe(recipeToEdit);
    setEditingId(id);
  };

  const handleUpdateRecipe = () => {
    setRecipes(recipes.map((recipe) => (recipe.id === editingId ? newRecipe : recipe)));
    setNewRecipe({ title: "", description: "", image: "" });
    setEditingId(null);
  };

  const handleDeleteRecipe = (id) => {
    setRecipes(recipes.filter((recipe) => recipe.id !== id));
  };

  return (
    <>
    <Header />
    <div className={styles.makerContainer}>
      <h2>Управление рецептами</h2>
      <div className={styles.inputMaker}>
        <input
          type="text"
          placeholder="Название блюда"
          value={newRecipe.title}
          onChange={(e) => setNewRecipe({ ...newRecipe, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Описание"
          value={newRecipe.description}
          onChange={(e) => setNewRecipe({ ...newRecipe, description: e.target.value })}
        />
        <input
          type="text"
          placeholder="URL изображения"
          value={newRecipe.image}
          onChange={(e) => setNewRecipe({ ...newRecipe, image: e.target.value })}
        />
        {editingId ? (
          <button onClick={handleUpdateRecipe}>Обновить</button>
        ) : (
          <button onClick={handleAddRecipe}>Добавить</button>
        )}
      </div>
      <div className={styles.recipeList}>
        {recipes.map((recipe) => (
          <div key={recipe.id} className={styles.recipeCard}>
            <img src={recipe.image} alt={recipe.title} className={styles.foodImage} />
            <div className={styles.textbox}>
              <h3>{recipe.title}</h3>
              <p>{recipe.description}</p>
            </div>
            <button onClick={() => handleEditRecipe(recipe.id)}>Редактировать</button>
            <button onClick={() => handleDeleteRecipe(recipe.id)}>Удалить</button>
          </div>
        ))}
      </div>
    </div>
    <Footer />
    </>
  );
}

