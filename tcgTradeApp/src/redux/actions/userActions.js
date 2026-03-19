export const ADD_USER = "ADD_USER"
export const LOG_USER = "LOG_USER"
export const SET_USER = "SET_USER"
export const LOGOUT_USER = "LOGOUT_USER"
export const SET_POFILE_USER = "SET_POFILE_USER"
export const GET_USER = "GET_USER"

//---------------------> ADDING NEW USER <------------------------------

export const addUser = (userData) => {
  return (dispatch) => {
    const URL = "http://localhost:3023/auth/register"
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
    fetch("http://localhost:3023/users/me", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
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

//-----------------------------------> LOGIN USER <--------------------------------------

export const loginUser = (userData) => {
  return (dispatch, getState) => {
    const URL = "http://localhost:3023/auth/login"
    fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((res) => res.json())
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
  const formData = new FormData()
  formData.append("image", image)

  fetch(`http://localhost:3023/users/${userId}/image`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: formData,
  })
    .then((res) => res.json())
    .then(() => {
      dispatch(getUser())
    })
    .catch((err) => {
      console.log(err)
    })
}
