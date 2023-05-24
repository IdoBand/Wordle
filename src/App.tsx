import { useState, useMemo, useCallback } from "react"
import Navbar from "./components/Navbar"
import { userContext } from "./providers/userProvider"
import { DecodedUserJWT } from "./components/SignInWithGoogle"
function isJWTValid (JWTexpTime: number) {
  const currentTime = Math.floor(Date.now() / 1000)
  const answer = currentTime <  JWTexpTime ? true : false
  return answer
}

function App() {
  const initialUserValue = useCallback(() => {
    const userCheck = JSON.parse(localStorage.getItem('wordleUser') as string)
    if (userCheck) {
      const JWTValidation = isJWTValid(userCheck.exp)
      if (JWTValidation) {
        return userCheck
      } else {
        localStorage.removeItem('wordleUser')
      }
  }
  }, [])
  
  const [user, setUser] = useState<DecodedUserJWT | null>(initialUserValue)
  const userContextValue = useMemo(() => ({user, setUser}), [user, setUser])
  
  return (
    <>
    <userContext.Provider value={userContextValue}>
      <Navbar />
    </userContext.Provider>
    </>
  )
}

export default App
