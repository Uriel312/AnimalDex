
import { useRef, useState } from "react";
import { Camera, CameraType } from "react-camera-pro";
import styles from './search.module.css'
import { FaCameraRotate, FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { resizeBase64Image } from "../../utilities/utilities";
import { getAnimalData } from "../../utilities/ia";
import { addAnimalToDB } from "../../db/db";
import { AnimalType } from "../../types/Animal";

const Search = () => {
  const webcamRef = useRef<CameraType | null>(null);
  const [numberOfCameras, setNumberOfCameras] = useState(2);
  const navigate = useNavigate();
  const [image, setImage] = useState<string | null | undefined>(null)

  const takePhoto = async () => {
    if (webcamRef.current) {
      const newImage = await webcamRef.current?.takePhoto() as string
      const audio = new Audio('takePhotoSound.mp3');
      audio.play();
      const photo = await resizeBase64Image(newImage, 520, 520) as string
      setImage(photo)

      const result = await getAnimalData(photo) as AnimalType
      if (result) {
        result.imagen = photo
        result.id = result.scientific_name.toLocaleLowerCase()
        await addAnimalToDB(result)
        navigate(`/animalInfo/${result.id}`)
      }
    }
  }

  const back = () => {
    navigate(-1)
  }

  const changeCamera = () => {
    if (webcamRef.current) {
      webcamRef.current?.switchCamera();
    }
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.camera}>
          {
            !image ?
              <Camera ref={webcamRef} numberOfCamerasCallback={setNumberOfCameras} facingMode="environment" errorMessages={{}} /> :
              <img className={styles.img} src={image} alt="" />

          }
        </div>
        <div className={styles.buttons}>
          <button className={styles.back} onClick={back} >
            <FaArrowLeftLong size={'25px'} />
          </button>
          <button className={styles.takePhoto} onClick={takePhoto}></button>
          <button disabled={numberOfCameras <= 1} className={styles.change} onClick={changeCamera}>
            <FaCameraRotate size={'30px'} />
          </button>
        </div>
      </div>
    </>
  )
}

export default Search
