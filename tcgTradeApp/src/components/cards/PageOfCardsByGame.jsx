import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"

import { useEffect } from "react"
import { addCardList, addToCollection } from "../../redux/actions/cardsAction"
import PageOfCards from "./PageOfCards"

const PageOfCardsByGame = () => {
  const dispatch = useDispatch()
  const { id } = useParams()

  useEffect(() => {
    dispatch(addCardList(id))
  }, [dispatch, id])

  return <PageOfCards />
}

export default PageOfCardsByGame
