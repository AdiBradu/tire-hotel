import React, { useState, useContext, useEffect } from 'react'
import api, { axiosLib } from '../utils/Api'

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}


export  function AuthProvider({ children }) {

  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)
  
 
  function login(email, password) {
    
    return api.post('/auth/login', {
      username: email,
      password: password
    })
   
  }

  function logout() {
    return api.get('/auth/logout')
  }

  function setLoggedUser(user) {
    setCurrentUser(user)
  }

  

  useEffect(() => {

    let source  = axiosLib.CancelToken.source();

    const userCheck = async () => { 
      try {
        const response = await api.get('/auth/me', {
          cancelToken: source.token
        })

        setCurrentUser(response.data)
        setLoading(false)
      } catch (error) {
        if(axiosLib.isCancel(error)) {
          console.log('user abort')
        } else {
          console.log(error)
          setCurrentUser(null)
          setLoading(false) 
        }
      }
    }
    userCheck()

    return () => {
      console.log('unmounted')
      source.cancel()
    }
  }, [])


  const value = {
    currentUser,
    setLoggedUser,
    login,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}  
    </AuthContext.Provider>
  )
}
