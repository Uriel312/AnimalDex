import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getAnimalByID } from '../../db/db';

const AnimalInfo = () => {
  const { id } = useParams();
  const [animal, setAnimal] = useState(null)


  useEffect(() => {
    getAnimal()
  }, [])

  const getAnimal = async () => {
    const response = await getAnimalByID(id as string)
    setAnimal(response)
  }

  return (
    <>
      <br /><br /><br /><br /><br />
      <pre>{JSON.stringify(animal, null, 2)}</pre>
      <div>AnimalInfo</div>
    </>
  )
}

export default AnimalInfo