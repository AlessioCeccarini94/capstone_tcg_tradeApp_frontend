export const GET_CAROUSEL = "GET_CAROUSEL"
export const GET_ALL_USERS = "GET_USERS"
export const DELETE_USER = "DELETE_USER"
export const EDIT_USER = "EDIT_USER"

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
        console.log(data)
        dispatch({
          type: GET_ALL_USERS,
          payload: data.content,
        })
      })
      .catch((err) => console.log(err))
  }
}

//------------------------------> GET USER BY ID <-----------------------------------

export const getUserById = (id) => {
  return (dispatch) => {
    const URL = `http://localhost:3023/users/${id}`
    fetch(URL, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        dispatch({
          type: SET_POFILE_USER,
          payload: data,
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

//----------------------------------> EDIT USER <--------------------------------------
export const editUserAdmin = (userData, userId) => {
  return (dispatch) => {
    const URL = `http://localhost:3023/users/${userId}`
    fetch(URL, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: EDIT_USER,
          payload: data,
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

// --------------------------------> DELETE USER <-------------------------------------

export const deleteUser = (userId) => {
  return (dispatch) => {
    fetch(`http://localhost:3023/users/${userId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Errore fetch utenti")
        return
      })
      .then(() => {
        dispatch({
          type: DELETE_USER,
          payload: userId,
        })
      })
      .catch((err) => console.log(err))
  }
}
