import Header from "./components/header/Header";
import Search from "./pages/search/Search";
import { Routes, Route } from 'react-router-dom'
import Home from "./pages/home/Home";
import Animals from "./pages/animals/Animals";
import AnimalInfo from "./pages/animal-info/AnimalInfo";

function App() {
  return (
    <>
      <div className="container2">
        <Header></Header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/animals" element={<Animals />} />
          <Route path="/animalInfo/:id" element={<AnimalInfo />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </div>
    </>
  )
}

export default App
