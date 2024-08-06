import { UseModalType } from "../../hooks/useModal"
import { Loader } from "../loader/Loader"
import styles from './modal.module.css'

interface ModalType {
  modalCtrl: UseModalType;
  width: number;
}

const Modal = ({ modalCtrl, width }: ModalType) => {
  return (
    <>
      {
        modalCtrl.isOpen &&
        <div className={styles.backdrop} >
          <div className={styles.modal} style={{ maxWidth: width }}>
            <h3>
              Generando información del animal. Esto puede tardar unos segundos.
            </h3>
            <Loader />
          </div>
        </div >

      }
    </>
  )
}

export default Modal