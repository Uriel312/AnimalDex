import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getAnimalByID } from '../../db/db';
import { AnimalType } from '../../types/Animal';
import styles from './animal_info.module.css'

const AnimalInfo = () => {
  const { id } = useParams();
  const [animal, setAnimal] = useState<AnimalType | null>(null)


  useEffect(() => {
    getAnimal()
  }, [])


  const textSpeach = (text: string) => {
    const synth = window.speechSynthesis;
    const audio = new SpeechSynthesisUtterance(text)
    audio.lang = 'es-ES'
    const voices = window.speechSynthesis.getVoices()
    audio.pitch = 0.3
    audio.rate = 1
    audio.voice = voices[0]
    synth.speak(audio)
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
    if (animal?.description) {
      textSpeach(animal?.description)
    }
  }, [animal])

  return (
    <div className={styles.container}>

      <div className={styles.badges}>

        <p className={`${styles.badge} ${styles.blue}`}>
          {animal?.animal_category}
        </p>

        <p className={`${styles.badge} ${getHostilityColor()}`}>
          {animal?.hostility_level}
        </p>
      </div>


      <img src={animal?.imagen} alt={animal?.common_name} />

      <div className={styles.names}>
        <h1 className={styles.title}>{animal?.common_name}</h1>
        <h3 className={styles.subtitle}>{animal?.scientific_name}</h3>
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

        <p>
          <span>Velocidad Max</span>
          {animal?.max_speed}
        </p>

      </div>

      <p>
        <span>Descripcion</span>
        {animal?.description}
      </p>

      <p>
        <span>Comportamiento</span>
        {animal?.behavior_description}
      </p>

      <p>
        <span>habitat</span>
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

    </div>
  )
}

export default AnimalInfo