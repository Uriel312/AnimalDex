import { UseTTSType } from '../../hooks/useTts';
import styles from './audio_controls.module.css'
import { FaCirclePlay, FaCircleStop } from "react-icons/fa6";

interface AudioControlsType {
  ttsCtrl: UseTTSType;
  text: string;
}

const AudioControls = ({ ttsCtrl, text = '' }: AudioControlsType) => {
  return (
    <div className={styles.controls}>
      {
        ttsCtrl.speaking && text ?
          <button className={styles.pause} onClick={() => ttsCtrl.stop()}>
            <FaCircleStop size='30px' />
          </button> :
          <button className={styles.play} onClick={() => ttsCtrl.play(text)}>
            <FaCirclePlay size='30px' />
          </button>
      }
    </div>
  )
}

export default AudioControls