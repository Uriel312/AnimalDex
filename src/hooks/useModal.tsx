import { useState } from "react"

const useModal = (initialState: boolean) => {
  const [isOpen, setIsOpen] = useState<boolean>(initialState)

  const open = () => {
    setIsOpen(true)
  }

  const close = () => {
    setIsOpen(false)
  }

  return {
    isOpen,
    open,
    close
  }
}

export default useModal