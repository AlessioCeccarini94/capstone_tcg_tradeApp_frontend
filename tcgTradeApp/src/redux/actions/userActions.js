export const ADD_USER = "ADD_USER"
export const LOG_USER = "LOG_USER"
export const SET_USER = "SET_USER"
export const LOGOUT_USER = "LOGOUT_USER"
export const SET_POFILE_USER = "SET_POFILE_USER"
export const GET_USER = "GET_USER"
export const baseURL = import.meta.env.VITE_API_URL

//---------------------> ADDING NEW USER <------------------------------

export const addUser = (userData) => {
  return (dispatch) => {
    const URL = `${baseURL}/auth/register`
    return fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((res) => {
        return res.json().then((data) => {
          if (!res.ok) {
            throw new Error(
              data.message || data.errors?.[0] || "Something went wrong",
            )
          }
          return data
        })
      })
      .then((data) => {
        console.log(data)
        dispatch({
          type: ADD_USER,
          payload: data,
        })
        return { success: true }
      })
      .catch((err) => {
        return {
          success: false,
          message: err.message || err.errors?.[0] || "Something went wrong",
        }
      })
  }
}

//------------------------------> GET LOGGED USER <-----------------------------------

export const getUser = () => {
  return (dispatch) => {
    fetch(`${baseURL}/users/me`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: GET_USER,
          payload: data,
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

//------------------------------> GET USER BY ID <-----------------------------------

export const getUserById = (id) => {
  return (dispatch) => {
    const URL = `${baseURL}/users/${id}`
    fetch(URL, {
      method: "GET",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Request failed")
        return res.json()
      })
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

//-----------------------------------> LOGIN USER <--------------------------------------

export const loginUser = (userData) => {
  return (dispatch) => {
    const URL = `${baseURL}/auth/login`
    fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Request failed")
        return res.json()
      })
      .then((data) => {
        localStorage.setItem("token", data.accessToken.trim())
        console.log(data)
        dispatch({
          type: LOG_USER,
          payload: data,
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

//------------------------------> LOGOUT USER <-----------------------------------

export const logoutUser = () => {
  return (dispatch) => {
    localStorage.removeItem("token")
    dispatch({
      type: LOGOUT_USER,
      payload: {},
    })
  }
}

//----------------------------------> EDIT USER <--------------------------------------

export const editUser = (userData, userId) => {
  return (dispatch) => {
    const URL = `${baseURL}/users/${userId}`
    fetch(URL, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Request failed")
        return res.json()
      })
      .then(() => {
        dispatch(getUser())
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

//------------------------------> IMAGE PATCH USER <-----------------------------------

export const imagePatch = (image, userId) => {
  return (dispatch) => {
    const formData = new FormData()
    formData.append("image", image)

    fetch(`${baseURL}/users/${userId}/image`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: formData,
    })
      .then((res) => {
        if (!res.ok) throw new Error("Errore upload")
        return res.json()
      })
      .then(() => {
        dispatch(getUser())
        alert("Profilo aggiornato con successo")
      })
      .catch((err) => {
        console.log(err)
      })
  }
}
