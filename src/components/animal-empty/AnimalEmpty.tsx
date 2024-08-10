import styles from './animal_empty.module.css'
import { FaCirclePlus } from "react-icons/fa6";
import useRouting from '../../hooks/useRouting';

const AnimalEmpty = () => {
  const nav = useRouting()
  return (
    <div className={styles.container}>
      <h4>
        Actualmente, no tienes animales en tu lista.
      </h4>
      <h2>
        ¡Empieza a descubrir y agregar algunos nuevos!
      </h2>
      <button className={styles.button} onClick={() => nav.goTo('/search')}>
        <FaCirclePlus size='20px' />
        Agregar
      </button>
    </div>
  )
}

export default AnimalEmpty