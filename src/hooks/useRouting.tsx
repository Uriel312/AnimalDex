import { useNavigate, useParams } from "react-router-dom"

const useRouting = () => {
  const navigation = useNavigate()
  const params = useParams()

  const goTo = (rute: string) => {
    navigation(rute)
  }

  const back = () => {
    navigation(-1)
  }

  const getParams = () => {
    return params
  }

  return {
    goTo,
    back,
    getParams
  }
}

export default useRouting