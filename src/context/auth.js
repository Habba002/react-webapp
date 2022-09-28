import { useState, useEffect, createContext } from "react";

import { getFromLocalStorage } from "../helpers/auth"
import { removeFromLocalStorage } from "../helpers/auth";

import axios from "axios";

const AuthContext = createContext()

const AuthProvider = ({children}) => {
  const [auth, setAuth] = useState(null)

  //configure axios
  axios.defaults.baseURL = process.env.REACT_APP_API
  axios.defaults.headers.common["Authorization"] = auth?.token
  axios.interceptors.response.use((response) => { return response }, (err) => {
    if (err.response.status === 401 || err.response.status === 403) {
      removeFromLocalStorage("auth")
      setAuth(null);
    }
    return Promise.reject(err)
  })

  useEffect(() => {
    setAuth(getFromLocalStorage("auth"))
  }, [])

  return (
    <AuthContext.Provider value={[ auth, setAuth ]}>
      {children}
    </AuthContext.Provider>
  )
}

export {AuthContext, AuthProvider}