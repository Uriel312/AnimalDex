import Header from "./components/header/Header";
import Search from "./pages/search/Search";
import { Routes, Route } from 'react-router-dom'
import Home from "./pages/home/Home";
import Animals from "./pages/animals/Animals";
import AnimalInfo from "./pages/animal-info/AnimalInfo";

function App() {

  // const textSpeach = (text: string) => {
  //   const synth = window.speechSynthesis;
  //   const audio = new SpeechSynthesisUtterance(text)
  //   audio.lang = 'es-ES'
  //   const voices = window.speechSynthesis.getVoices()
  //   console.log(voices)
  //   audio.pitch = 0.3
  //   audio.rate = 0.9
  //   audio.voice = voices[0]
  //   synth.speak(audio)
  // }

  return (
    <>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/animals" element={<Animals />} />
        <Route path="/animalInfo/:id" element={<AnimalInfo />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </>
  )
}

export default App
