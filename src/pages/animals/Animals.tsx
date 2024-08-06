import { useEffect, useState } from "react"
import { getAllAnimals } from "../../db/db"
import CardAnimal from "../../components/card-animal/CardAnimal"
import { AnimalType } from "../../types/Animal"
import AnimalEmpty from "../../components/animal-empty/AnimalEmpty"
import styles from './animals.module.css'

const Animals = () => {

  const [animals, setAnimals] = useState([])

  useEffect(() => {
    getAnimals()
  }, [])

  const getAnimals = async () => {
    const response = await getAllAnimals()
    setAnimals(response)
  }


  return (
    <>
      <div className={styles.container}>

        <div className={styles.grid}>
          {
            animals &&
            animals.map((animal: AnimalType) => {
              return <CardAnimal key={animal?.id} animal={animal} />
            })
          }
        </div>

        {
          animals.length == 0 &&
          <AnimalEmpty />
        }
      </div>
    </>
  )
}

export default Animals