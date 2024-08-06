import { useNavigate } from 'react-router-dom'
import styles from './card_animal.module.css'
import { Animal } from '../../assets/types/Animal'

interface CardAnimalType {
    animal: Animal
}


const CardAnimal = ({ animal }: CardAnimalType) => {
    console.log(animal)
    const navigate = useNavigate()

    const open = () => {
        navigate(`/animalInfo/${animal.id}`)
    }

    return (
        <>
            <div className={styles.card} onClick={open}>
                <img src={animal?.imagen} alt="" />
                <div className={styles.info}>
                    <div>
                        <h1 className={styles.title}>{animal?.common_name}</h1>
                        <p className={styles.subtitle}>{animal?.scientific_name}</p>
                        <p className={styles.subtitle}>felino</p>

                    </div>

                    <div className={styles.data}>
                        <p>
                            <span>Peso</span>
                            {animal?.weight}
                        </p>
                        <p>
                            <span>Velocidad (max)</span>
                            {animal?.max_speed}
                        </p>
                    </div>

                </div>
            </div>
        </>
    )
}

export default CardAnimal