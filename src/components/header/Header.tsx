import styles from './header.module.css'
import useRouting from '../../hooks/useRouting'

const Header = () => {
  const nav = useRouting()

  const goToHome = () => {
    nav.goTo('/')
  }

  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <img onClick={goToHome} src="/AnimalDex.png" alt="AnimalDex Logo" />
        <h1 onClick={goToHome}>AnimalDex</h1>
      </div>
    </header>
  )
}

export default Header