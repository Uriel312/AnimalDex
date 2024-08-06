import { UseModalType } from "../../hooks/useModal"
import styles from './modal.module.css'

interface ModalErrorType {
  modalCtrl: UseModalType;
  width: number;
}

const ModalError = ({ modalCtrl, width }: ModalErrorType) => {
  return (
    <>
      {
        modalCtrl.isOpen &&
        <div className={styles.backdrop} >
          <div className={styles.modal} style={{ maxWidth: width }}>
            <h3>
              Lo sentimos, hubo un problema al procesar la solicitud. Por favor, intenta nuevamente
            </h3>
            <button onClick={modalCtrl.close}>Aceptar</button>
          </div>
        </div >

      }
    </>
  )
}

export default ModalError