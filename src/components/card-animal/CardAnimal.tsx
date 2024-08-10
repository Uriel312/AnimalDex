import styles from './card_animal.module.css'
import { AnimalType } from '../../types/Animal'
import useRouting from '../../hooks/useRouting'

interface CardAnimalType {
    animal: AnimalType
}


const CardAnimal = ({ animal }: CardAnimalType) => {
    const nav = useRouting()

    const open = () => {
        nav.goTo(`/animalInfo/${animal.id}`)
    }

    const getHostilityColor = () => {
        if (animal.hostility_level == 'Inofensivo') {
            return styles.green
        } else if (animal.hostility_level == 'Moderadamente Peligroso') {
            return styles.orange
        } else {
            return styles.red
        }
    }

    return (
        <>
            <div className={styles.card} onClick={open}>
                <img className={`${styles.imagen} ${getHostilityColor()}`} src={animal?.imagen} alt={animal.common_name} />
                <div className={styles.info}>
                    <div>
                        <span className={`${styles.badge} ${getHostilityColor()}`}>
                            {animal?.hostility_level}
                        </span>
                        <h1 className={styles.title}>{animal?.common_name}</h1>
                        <p className={styles.subtitle}>{animal?.scientific_name}</p>
                        <p className={styles.subtitle}>{animal?.animal_category}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CardAnimal