export const ADD_GAME_LIST = "ADD_GAME_LIST"
export const ADD_CARD_LIST = "ADD_CARD_LIST"
export const baseURL = import.meta.env.VITE_API_URL

//---------------------> ADDING GAME LIST <------------------------------

export const addGameList = () => {
  return (dispatch) => {
    fetch(`${baseURL}/games`)
      .then((res) => {
        if (!res.ok) throw new Error(res.status)
        return res.json()
      })
      .then((data) => {
        dispatch({
          type: ADD_GAME_LIST,
          payload: data,
        })
        console.log(data)
      })
      .catch((err) => {
        console.log("FETCH GAMES ERROR:", err)
      })
  }
}
