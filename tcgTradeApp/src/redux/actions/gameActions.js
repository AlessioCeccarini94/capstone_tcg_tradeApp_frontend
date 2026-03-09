export const ADD_GAME_LIST = "ADD_GAME_LIST"
export const ADD_CARD_LIST = "ADD_CARD_LIST"

//---------------------> ADDING GAME LIST <------------------------------

export const addGameList = () => {
  return (dispatch) => {
    const URL = "http://localhost:3023/games"
    fetch(URL, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: ADD_GAME_LIST,
          payload: data,
        })
        console.log(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }
}
