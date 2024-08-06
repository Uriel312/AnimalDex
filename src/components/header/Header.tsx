import { useNavigate } from 'react-router-dom'
import styles from './header.module.css'

const Header = () => {

  const navigation = useNavigate()

  const goToHome = () => {
    navigation('/')
  }

  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <h1 onClick={goToHome}>Animaldex</h1>
      </div>
    </header>
  )
}

export default Header