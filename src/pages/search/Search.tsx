import { useRef, useState } from "react";
import { Camera, CameraType } from "react-camera-pro";
import styles from './search.module.css'
import { FaCameraRotate, FaArrowLeftLong } from "react-icons/fa6";
import { resizeBase64Image } from "../../utilities/utilities";
import { getAnimalData } from "../../utilities/ia";
import { addAnimalToDB } from "../../db/db";
import { AnimalType } from "../../types/Animal";
import Modal from "../../components/modal/Modal";
import useModal from "../../hooks/useModal";
import ModalError from "../../components/modal-error/ModalError";
import useRouting from "../../hooks/useRouting";

const Search = () => {
  const modal = useModal(false)
  const modalError = useModal(false)
  const webcamRef = useRef<CameraType | null>(null);
  const [numberOfCameras, setNumberOfCameras] = useState<number>(0);
  const [image, setImage] = useState<string | null | undefined>(null)
  const nav = useRouting()

  const takePhoto = async () => {
    if (webcamRef.current) {
      const newImage = await webcamRef.current?.takePhoto() as string
      const audio = new Audio('takePhotoSound.mp3');
      audio.play();
      const photo = await resizeBase64Image(newImage, 520, 520) as string
      setImage(photo)
      modal.open()
      const result = await getAnimalData(photo) as AnimalType
      if (result) {
        if (result?.error) {
          modal.close()
          modalError.open()
          setImage(null)
        } else {
          result.id = result.scientific_name.toLocaleLowerCase()
          result.imagen = photo
          await addAnimalToDB(result)
          modal.close()
          nav.goTo(`/animalInfo/${result.id}`)
        }
      }
      modal.close()
    }
  }

  const changeCamera = () => {
    if (webcamRef.current) {
      webcamRef.current?.switchCamera();
    }
  }

  const errors = {
    "noCameraAccessible": "No se puede acceder al dispositivo de cámara. Por favor, conecta tu cámara o prueba con otro navegador.",
    "permissionDenied": "Permiso denegado. Por favor, actualiza la página y concede permiso para la cámara.",
    "switchCamera": "No es posible cambiar a otra cámara porque solo hay un dispositivo de video accesible.",
    "canvas": "Canvas no es compatible."
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.camera}>
          {
            !image ?
              <Camera ref={webcamRef} numberOfCamerasCallback={setNumberOfCameras} facingMode="environment" errorMessages={errors} /> :
              <img className={styles.img} src={image} alt="" />
          }
        </div>
        <div className={styles.buttons}>
          <button className={styles.back} onClick={nav.back} >
            <FaArrowLeftLong size={'25px'} />
          </button>
          <button className={styles.takePhoto} onClick={takePhoto}></button>
          <button disabled={numberOfCameras <= 1} className={styles.change} onClick={changeCamera}>
            <FaCameraRotate size={'30px'} />
          </button>
        </div>
      </div>
      <Modal modalCtrl={modal} width={400} />
      <ModalError modalCtrl={modalError} width={400} />
    </>
  )
}

export default Search
