export const ADD_CARD_LIST = "ADD_CARD_LIST"
export const ADD_CARD_FROM_ID = "ADD_CARD_FROM_ID"
export const GET_COLLECTION = "GET_COLLECTION"
export const REMOVE_CARD_FROM_ID = "REMOVE_CARD_FROM_ID"
export const SEARCH_CARD = "SEARCH_CARD"
export const CARDS_BY_EXPANSION = "CARDS_BY_EXPANSION"
export const SET_CARDS = "SET_CARDS"
export const SET_TOP_CARDS = "SET_TOP_CARDS"
export const SET_LOADING = "SET_LOADING"

//---------------------> ADDING CARD LIST FOR GAME PAGE <------------------------------

export const addCardList = (id) => {
  return (dispatch) => {
    const randomPage = Math.floor(Math.random() * 100)
    const URL = `http://localhost:3023/games/${id}/cards?page=${randomPage}&size=12`
    fetch(URL, {
      method: "GET",
    })
      .then((res) => {
        if (!res.ok) throw new Error(res.status)
        return res.json()
      })
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

//----------------------------> SEARCH CARD BY NAME <-----------------------------------------

export const searchCard = (query) => {
  return (dispatch) => {
    const URL = `http://localhost:3023/cards/search?name=${query}`
    fetch(URL, {
      method: "GET",
    })
      .then((res) => {
        if (!res.ok) throw new Error(res.status)
        return res.json()
      })
      .then((data) => {
        dispatch({
          type: SEARCH_CARD,
          payload: data,
        })
      })
      .catch((err) => console.log(err))
  }
}

//----------------------------> SEARCH CARD BY EXPANSION <-----------------------------------------

export const getCardsByExpansion = (id) => {
  return (dispatch) => {
    const URL = `http://localhost:3023/cards/expansions/${id}`
    fetch(URL, {
      method: "GET",
    })
      .then((res) => {
        if (!res.ok) throw new Error(res.status)
        return res.json()
      })
      .then((data) => {
        dispatch({
          type: CARDS_BY_EXPANSION,
          payload: data.content,
        })
      })
      .catch((err) => console.log(err))
  }
}

//-------------------------------> ORDER CARD BY PRICE <----------------------------------------------

export const orderCardByPrice = () => {
  return (dispatch) => {
    dispatch({ type: SET_LOADING })
    const URL = "http://localhost:3023/cards/top"
    fetch(URL, {
      method: "GET",
    })
      .then((res) => {
        if (!res.ok) throw new Error(res.status)
        return res.json()
      })
      .then((data) => {
        dispatch({
          type: SET_TOP_CARDS,
          payload: data.content,
        })
        console.log(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }
}
