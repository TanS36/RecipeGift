//App.jsx
import './App.css';
import Header from './components/Header';
import Search from './components/Search';
import Navigate from './components/Navigate';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Header />
      <main className="main-content">
        <Search />
        <Navigate />
      </main> 
      <Footer />
    </>
  );
}

export default App;

