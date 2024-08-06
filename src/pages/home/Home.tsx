import { useNavigate } from 'react-router-dom'

const Home = () => {

  const navigate = useNavigate()

  const goToSearch = () => {
    navigate('/search')
  }

  const goToAllAnimals = () => {
    navigate('/animals')
  }

  return (
    <>
      <br /><br /><br /><br />
      <div>Home</div>
      <button onClick={goToAllAnimals}>Todos los animales</button>
      <button onClick={goToSearch}>Buscar</button>
    </>
  )
}

export default Home