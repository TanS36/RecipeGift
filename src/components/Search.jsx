import './Search.css';
import { Outlet } from "react-router-dom";

function Search() {
  return (
    <article>
        <h2>Лучший способ поделиться с друзьями своими рецептами</h2>
        <input
          type="text"
          placeholder="Поиск рецептов..."
          className="search-input"
        />
        <Outlet />
    </article> 
  );
}

export default Search;