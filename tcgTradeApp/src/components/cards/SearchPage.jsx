import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useSearchParams } from "react-router-dom"
import { searchCard } from "../../redux/actions/cardsActions"
import PageOfCards from "./PageOfCards"

const SearchPage = () => {
  const dispatch = useDispatch()
  const [params] = useSearchParams()
  const query = params.get("query")

  useEffect(() => {
    if (query) dispatch(searchCard(query))
  }, [dispatch, query])

  return <PageOfCards />
}

export default SearchPage
