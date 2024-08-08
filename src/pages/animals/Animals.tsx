import { useEffect, useState } from "react"
import { getAllAnimals } from "../../db/db"
import CardAnimal from "../../components/card-animal/CardAnimal"
import { AnimalType } from "../../types/Animal"
import AnimalEmpty from "../../components/animal-empty/AnimalEmpty"
import styles from './animals.module.css'
import Input from "../../components/input/Input"

const Animals = () => {
  const [allAnimals, setAllAnimals] = useState<AnimalType[]>([])
  const [animals, setAnimals] = useState<AnimalType[]>([])
  const [search, setSearch] = useState<string>('')

  useEffect(() => {
    getAnimals()
  }, [])

  const getAnimals = async () => {
    const response = await getAllAnimals()
    setAllAnimals(response)
    setAnimals(response)
  }

  const searchAnimal = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    const filter = allAnimals.filter(animal => animal.common_name.toLowerCase().includes(value.toLowerCase()))
    setSearch(value)
    setAnimals(filter)
  }

  console.log(animals, allAnimals)



  return (
    <>
      <div className={styles.container}>
        {allAnimals.length > 0 &&
          <>
            <header>
              <Input type="search" label="Buscar:" onChange={searchAnimal} />
              <span>Animales registrados: {allAnimals.length} de ???</span>
            </header>

            {
              animals.length > 0 ?
                <div className={styles.grid}>{
                  animals.map((animal: AnimalType) => {
                    return <CardAnimal key={animal?.id} animal={animal} />
                  })}
                </div> :
                <p className={styles.notFound}>
                  No se encontró el animal:
                  <span> "{search}" </span>
                </p>
            }

          </>
        }

        {
          allAnimals.length == 0 &&
          <AnimalEmpty />
        }
      </div>
    </>
  )
}

export default Animals