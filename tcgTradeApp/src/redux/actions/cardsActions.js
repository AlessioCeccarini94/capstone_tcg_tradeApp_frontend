export const ADD_CARD_LIST = "ADD_CARD_LIST"
export const ADD_CARD_FROM_ID = "ADD_CARD_FROM_ID"
export const ADD_FAVORITES = "ADD_FAVORITES"
export const GET_FAVORITES = "GET_FAVORITES"
export const GET_COLLECTION = "GET_COLLECTION"
export const REMOVE_CARD_FROM_ID = "REMOVE_CARD_FROM_ID"
export const SEARCH_CARD = "SEARCH_CARD"
export const CARDS_BY_EXPANSION = "CARDS_BY_EXPANSION"
export const SET_CARDS = "SET_CARDS"
export const SET_TOP_CARDS = "SET_TOP_CARDS"
export const SET_LOADING = "SET_LOADING"
export const GET_USER_COLLECTION = "GET_USER_COLLECTION"
export const baseURL = import.meta.env.VITE_API_URL

//---------------------> ADDING CARD LIST FOR GAME PAGE <------------------------------

export const addCardList = (userId) => {
  return (dispatch) => {
    const randomPage = Math.floor(Math.random() * 100)
    const URL = `${baseURL}/games/${userId}/cards?page=${randomPage}&size=12`
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

//----------------------> ADDING CARD TO FAVORITES <-----------------------------------

export const addToFavorites = (id) => {
  return (dispatch) => {
    const URL = `${baseURL}/cards/favorites/${id}`
    fetch(URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: ADD_FAVORITES,
          payload: data,
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
    const URL = `${baseURL}/cards/collection/${id}`
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
    const URL = `${baseURL}/cards/collection`
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

//---------------------------------> USER FAV LIST CARD <---------------------------------------------

export const userFavList = () => {
  return (dispatch) => {
    const URL = `${baseURL}/cards/favorites`
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
          type: GET_FAVORITES,
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
    const URL = `${baseURL}/cards/collection/${id}`
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

//----------------------------> REMOVE CARD FROM FAVORITES <-----------------------------------------

export const REMOVE_FAVORITE = "REMOVE_FAVORITE"

export const removeFavorite = (id) => {
  return (dispatch) => {
    fetch(`${baseURL}/cards/favorites/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then(() => {
      dispatch({
        type: REMOVE_FAVORITE,
        payload: id,
      })
    })
  }
}

//----------------------------> SEARCH CARD BY NAME <-----------------------------------------

export const searchCard = (query, gameId) => {
  return (dispatch) => {
    const params = new URLSearchParams()
    params.set("query", query)
    if (gameId) params.set("gameId", String(gameId))
    const URL = `${baseURL}/cards/search?${params.toString()}`
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
          payload: data?.content ?? [],
        })
      })
      .catch((err) => console.log(err))
  }
}

//----------------------------> SEARCH CARD BY EXPANSION <-----------------------------------------

export const getCardsByExpansion = (id) => {
  return (dispatch) => {
    const URL = `${baseURL}/cards/expansions/${id}`
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
    const URL = `${baseURL}/cards/top`
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

//-------------------------------> GET USER COLLECTION <----------------------------------------------

export const getUserCollection = (userId) => {
  return (dispatch) => {
    fetch(`${baseURL}/cards/collection/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Errore fetch collection")
        return res.json()
      })
      .then((data) => {
        dispatch({
          type: GET_USER_COLLECTION,
          payload: data,
        })
      })
      .catch((err) => console.log(err))
  }
}

//---------------------------------> CHANGE CONDITION CARD <------------------------------------------------

export const updateCardCondition = (userCardId, condition) => {
  return async (dispatch) => {
    try {
      const res = await fetch(
        `https://tgc-tradeapp-be.onrender.com/cards/collection/card/${userCardId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ condition }),
        },
      )

      if (!res.ok) throw new Error("Errore aggiornamento")

      dispatch(userCardList()) // 🔥 refresh lista
    } catch (error) {
      console.log(error)
    }
  }
}
