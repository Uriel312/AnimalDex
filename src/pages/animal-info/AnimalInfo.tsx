import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getAnimalByID } from '../../db/db';
import { AnimalType } from '../../types/Animal';
import styles from './animal_info.module.css'
import useTts from '../../hooks/useTts';
import AudioControls from '../../components/audio-controls/AudioControls';

const AnimalInfo = () => {
  const { id } = useParams();
  const [animal, setAnimal] = useState<AnimalType | null>(null)
  const ttsAudio = useTts()

  const textSpeach = async (text: string) => {
    ttsAudio.play(text)
  }

  const getAnimal = async () => {
    const response = await getAnimalByID(id as string)

    setAnimal(response)
  }

  const getHostilityColor = () => {
    if (animal?.hostility_level == 'Inofensivo') {
      return styles.green
    } else if (animal?.hostility_level == 'Moderadamente Peligroso') {
      return styles.orange
    } else {
      return styles.red
    }
  }

  useEffect(() => {
    if (animal) {
      textSpeach(animal?.description)
    }
  }, [animal])

  useEffect(() => {
    getAnimal()
  }, [])


  return (
    <div className={styles.container}>

      <div className={styles.badges}>

        <p className={`${styles.badge} ${styles.blue}`}>
          {animal?.animal_category}
        </p>

        <p className={`${styles.badge} ${getHostilityColor()}`}>
          {animal?.hostility_level}
        </p>

        {
          animal?.poison &&
          <p className={`${styles.badge} ${styles.purple}`}>
            Venenoso
          </p>
        }

        {
          animal?.dangerous_to_humans &&
          <p className={`${styles.badge} ${styles.black}`}>
            ¡Cuidado 💀!
          </p>
        }

      </div>


      <img src={animal?.imagen} alt={animal?.common_name} />

      <div className={styles.ggg}>
        <AudioControls ttsCtrl={ttsAudio} text={animal!.description} />
        <div className={styles.names}>
          <h1 className={styles.title}>{animal?.common_name}</h1>
          <h3 className={styles.subtitle}>{animal?.scientific_name}</h3>
        </div>
      </div>


      <div className={styles.info}>
        <p>
          <span>Peso</span>
          {animal?.weight}
        </p>

        <p>
          <span>Altura</span>
          {animal?.height}
        </p>
      </div>

      <div className={styles.info}>
        <p>
          <span>Velocidad</span>
          {animal?.max_speed}
        </p>

        <p>
          <span>Viven</span>
          {animal?.lifespan}
        </p>
      </div>

      <p>
        <span>Descripción</span>
        {animal?.description}
      </p>

      <p>
        <span>Comportamiento</span>
        {animal?.behavior_description}
      </p>

      <p>
        <span>Hábitat</span>
        {animal?.habitat}
      </p>

      <div className={styles.info}>

        <p>
          <span>Dieta</span>
          {animal?.diet}
        </p>

        <p>
          <span>Tipo de parto</span>
          {animal?.birth_type}
        </p>
      </div>

    </div >
  )
}

export default AnimalInfo