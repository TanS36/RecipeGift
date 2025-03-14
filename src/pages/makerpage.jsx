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
      image: "https://example.com/pizza.jpg",
      title: "Pizza",
      description: "Сытная и вкусная итальянская классика."
    },
    {
      id: 2,
      image: "https://example.com/sushi.jpg",
      title: "Sushi",
      description: "Легкие и изысканные японские роллы."
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
      
      <div className={styles.recipeList}>
        {recipes.map((recipe) => (
          <div key={recipe.id} className={styles.recipeCard}>
            <img src={recipe.image} alt={recipe.title} className={styles.foodImage} />
            <h3>{recipe.title}</h3>
            <p>{recipe.description}</p>
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

