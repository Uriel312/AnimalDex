import { useEffect, useState } from "react"
import { getAllAnimals } from "../../db/db"
import CardAnimal from "../../components/card-animal/CardAnimal"
import { AnimalType } from "../../types/Animal"
import AnimalEmpty from "../../components/animal-empty/AnimalEmpty"

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
      <br /><br /><br />

      {
        animals &&
        animals.map((animal: AnimalType) => {
          return <CardAnimal key={animal?.id} animal={animal} />
        })
      }

      {
        animals.length == 0 &&
        <AnimalEmpty />
      }
    </>
  )
}

export default Animals