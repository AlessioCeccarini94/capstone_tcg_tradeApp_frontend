export const ADD_USER = "ADD_USER"
export const LOG_USER = "LOG_USER"

//---------------------> ADDING NEW USER <------------------------------

export const addUser = (userData) => {
  return (dispatch, getState) => {
    const URL = "http://localhost:3023/auth/register"
    fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3NzI2MjQzMTEsImV4cCI6MTc3NTIxNjMxMSwic3ViIjoiYTk1MTkxODQtZThhYS00OTA0LWJkYjQtNjZmMDZiZTU0MTg0In0.cGkQ2D94gae4SXbUw2XXQw8eq4Qq1Wn-UGEZfGiiDag",
      },
      body: JSON.stringify(userData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        dispatch({
          type: ADD_USER,
          payload: data,
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

//------------------------------> LOGIN USER <-----------------------------------
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
        localStorage.setItem("token", data.accessToken)
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
