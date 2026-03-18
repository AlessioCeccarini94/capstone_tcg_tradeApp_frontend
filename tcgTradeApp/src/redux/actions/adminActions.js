export const GET_CAROUSEL = "GET_CAROUSEL"
export const GET_ALL_USERS = "GET_USERS"

//------------------------------> GET CAROUSEL <-----------------------------------
export const getCarousel = () => {
  return (dispatch) => {
    fetch("http://localhost:3023/carousels")
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: GET_CAROUSEL,
          payload: data,
        })
      })
  }
}
//------------------------------> IMAGE PATCH CAROUSEL <-----------------------------------

export const imagePatch = (file, id) => {
  return (dispatch) => {
    const formData = new FormData()
    formData.append("file", file)

    fetch(`http://localhost:3023/carousels/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: formData,
    })
      .then((res) => {
        if (!res.ok) throw new Error(res.status)
        return res.json()
      })
      .then(() => {
        dispatch(getCarousel())
      })
      .catch((err) => console.log(err))
  }
}

//---------------------------------> GET ALL USERS <-------------------------------------
export const getAllUsers = () => {
  return (dispatch) => {
    fetch("http://localhost:3023/users", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Errore fetch utenti")
        return res.json()
      })
      .then((data) => {
        dispatch({
          type: GET_ALL_USERS,
          payload: data.content,
        })
      })
      .catch((err) => console.log(err))
  }
}
