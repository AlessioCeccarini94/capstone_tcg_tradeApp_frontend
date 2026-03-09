export const ADD_CARD_LIST = "ADD_CARD_LIST"

//---------------------> ADDING CARD LIST FOR GAME PAGE <------------------------------

export const addCardList = (id) => {
  return (dispatch) => {
    const randomPage = Math.floor(Math.random() * 100)
    const URL = `http://localhost:3023/games/${id}/cards?page=${randomPage}&size=12`
    fetch(URL, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: ADD_CARD_LIST,
          payload: data.content,
        })
        console.log(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }
}
