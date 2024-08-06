import { useEffect, useState } from "react"
import { getAllAnimals } from "../../db/db"
import CardAnimal from "../../components/card-animal/CardAnimal"
import { Animal } from "../../assets/types/Animal"

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
      <br /><br /><br /><br /><br />
      <div>Animals</div>

      {
        animals.map((animal: Animal) => {
          return <CardAnimal key={animal?.id} animal={animal} />
        })
      }
    </>
  )
}

export default Animals