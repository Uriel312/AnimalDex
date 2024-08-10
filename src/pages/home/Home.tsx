import useRouting from '../../hooks/useRouting';
import styles from './home.module.css'
import { MdOutlinePets, MdOutlineSearch } from "react-icons/md";

const Home = () => {

  const nav = useRouting()

  const goToSearch = () => {
    nav.goTo('/search')
  }

  const goToAllAnimals = () => {
    nav.goTo('/animals')
  }

  return (
    <>
      <div className={styles.container}>
        <p>Descubre el mundo animal a través de tu cámara: captura criaturas reales y explora su fascinante información con nuestra app inspirada en la biodiversidad</p>

        <button onClick={goToAllAnimals}>
          <MdOutlinePets size='60px' />
          <span> Animales Registrados </span>
        </button>
        <button onClick={goToSearch}>
          <MdOutlineSearch size='60px' />
          <span> Buscar animal </span>
        </button>
      </div>
    </>
  )
}

export default Home