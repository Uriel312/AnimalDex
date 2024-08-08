import { useNavigate } from 'react-router-dom'
import styles from './animal_empty.module.css'
import { FaCirclePlus } from "react-icons/fa6";

const AnimalEmpty = () => {

  const navigation = useNavigate()


  const goToSearch = () => {
    navigation('/search')
  }

  return (
    <div className={styles.container}>
      <h4>
        Actualmente, no tienes animales en tu lista.
      </h4>
      <h2>
        ¡Empieza a descubrir y agregar algunos nuevos!
      </h2>

      <button className={styles.button} onClick={goToSearch}>
        <FaCirclePlus size='20px' />
        Agregar
      </button>
    </div>
  )
}

export default AnimalEmpty