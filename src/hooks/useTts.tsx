import { useState } from "react"

export interface UseTTSType {
  speaking: boolean,
  stop: () => void,
  play: (text: string) => void,
}

const useTts = (): UseTTSType => {
  const synth = window.speechSynthesis
  const [speaking, setSpeaking] = useState<boolean>(false)

  const stop = () => {
    synth.cancel()
    setSpeaking(false)
  }

  const play = (text: string) => {
    const audio = new SpeechSynthesisUtterance(text)
    synth.speak(audio)
    setSpeaking(true)
  }

  return {
    speaking,
    stop,
    play
  }
}

export default useTts