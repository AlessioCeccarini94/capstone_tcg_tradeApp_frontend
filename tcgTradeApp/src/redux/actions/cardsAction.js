export const ADD_CARD_LIST = "ADD_CARD_LIST"
export const ADD_CARD_FROM_ID = "ADD_CARD_FROM_ID"
export const GET_COLLECTION = "GET_COLLECTION"
export const REMOVE_CARD_FROM_ID = "REMOVE_CARD_FROM_ID"

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

//----------------------------> CARD FROM ID <-----------------------------------------

export const addToCollection = (id) => {
  return (dispatch) => {
    const URL = `http://localhost:3023/cards/collection/${id}`
    fetch(URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: ADD_CARD_FROM_ID,
          payload: data,
        })

        console.log(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

//----------------------------> USER LIST CARD <-----------------------------------------

export const userCardList = () => {
  return (dispatch) => {
    const URL = `http://localhost:3023/cards/collection`
    fetch(URL, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error(res.status)
        return res.json()
      })
      .then((data) => {
        dispatch({
          type: GET_COLLECTION,
          payload: data,
        })

        console.log(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

//----------------------------> REMOVE CARD FROM COLLECTION <-----------------------------------------

export const removeFromCollection = (id) => {
  return (dispatch) => {
    const URL = `http://localhost:3023/cards/collection/${id}`
    fetch(URL, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Delete failed")
        }

        dispatch({
          type: REMOVE_CARD_FROM_ID,
          payload: id,
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }
}
