import { useNavigate } from 'react-router-dom'
import styles from './home.module.css'
import { MdOutlinePets, MdOutlineSearch } from "react-icons/md";


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
      <div className={styles.container}>

        <p></p>

        <button onClick={goToAllAnimals}>
          <MdOutlinePets size='60px' />
          <span>
            Todos los animales
          </span>
        </button>
        <button onClick={goToSearch}>
          <MdOutlineSearch size='60px' />
          <span>
            Buscar animal
          </span>
        </button>
      </div>
    </>
  )
}

export default Home