import PageOfCards from "./PageOfCards"
import { useParams } from "react-router-dom"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { getCardsByExpansion } from "../../redux/actions/cardsActions"

const ExpansioCardsPage = () => {
  const dispatch = useDispatch()
  const { id } = useParams()

  useEffect(() => {
    dispatch(getCardsByExpansion(id))
  }, [dispatch, id])

  return <PageOfCards />
}
export default ExpansioCardsPage
