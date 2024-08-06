import { useState } from "react"

export interface UseModalType {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const useModal = (initialState: boolean): UseModalType => {
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