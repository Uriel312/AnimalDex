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
    console.log(voices)
    audio.pitch = 0.3
    audio.rate = 1
    audio.voice = voices[0]
    synth.speak(audio)
  }




  const getAnimal = async () => {
    const response = await getAnimalByID(id as string)
    setAnimal(response)

  }

  useEffect(() => {
    if (animal?.description) {
      textSpeach(animal?.description)
    }
  }, [animal])

  return (
    <>
      <div className={styles.container}>
        <img src={animal?.imagen} alt="" />

        <h1 className={styles.title}>{animal?.common_name}</h1>
        <h3 className={styles.subtitle}>{animal?.scientific_name}</h3>

        <p>
          <span>Descripcion</span>
          {animal?.description}
        </p>

        <p>
          <span>Comportamiento</span>
          {animal?.behavior_description}
        </p>


        <table className={styles.table1}>
          <thead>
            <tr>
              <th className={styles.right}>Peso:</th>
              <th className={styles.left}>{animal?.weight}</th>

              <th className={styles.right}>Dieta:</th>
              <th className={styles.left}>{animal?.diet}</th>

            </tr>
          </thead>
          <tbody>
            <tr>
              <th className={styles.right}>Altura:</th>
              <th className={styles.left}>{animal?.height}</th>

              <th className={styles.right}>velocidad:</th>
              <th className={styles.left}>{animal?.max_speed}</th>
            </tr>
          </tbody>
        </table>

      </div>
    </>
  )
}

export default AnimalInfo