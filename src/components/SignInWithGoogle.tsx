import { useEffect, useContext } from 'react'
import jwt_decode from 'jwt-decode'
import { userContext } from '../providers/userProvider'
import { flexCenter } from '../_mixin'
import Button from './Button'
const BASIC_URL: string = import.meta.env.VITE_BASIC_URL
export interface DecodedUserJWT {
  aud?: string
  azp?: string
  email?: string | null
  email_verified?: string
  exp?: number
  family_name?: string
  given_name?: string
  iat?: number
  iss?: string
  jti?: string
  name?: string
  nbf?: number
  picture?: string
  sub?: string
}
interface SignInWithGoogleProps {
  onClose: () => void
}
function validateString(st: string): string {
  const unwanted = `',"`
  const arraySplit = st.split('')
  const result = arraySplit.map((letter => {
    return unwanted.includes(letter) ? '' : letter 
  }))
    .join('')

  return result
}

const SignInWithGoogle = ({onClose}: SignInWithGoogleProps) => {
  const { user, setUser } = useContext<any>(userContext)
  async function userSignIn(email: string, name: string, picture: string) {
    name = validateString(name)
    const userInfo = {
      email,
      name,
    }
    try {
      const response = await fetch(
        `${BASIC_URL}/user`,
        { 
          method: 'post',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(userInfo)
      })
      const result = await response.json()
    } catch (err) {
      console.log(err);
    } 
  }
  function handleCallbackResponse (response: any) {
    const userJWTObject: DecodedUserJWT = jwt_decode(response.credential)
    userSignIn(
      userJWTObject.email as string,
       userJWTObject.name as string,
       userJWTObject.picture as string
       )
  
    localStorage.setItem('wordleUser', JSON.stringify(userJWTObject))
    setUser(userJWTObject)
  }
  function handleLogOut() {
    setUser(null)
    localStorage.removeItem('wordleUser')
  }

  useEffect(() => {
    //@ts-ignore
    google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      callback: handleCallbackResponse
    })
    //@ts-ignore
    google.accounts.id.renderButton(
      document.getElementById('sign-in-div'),
      { theme: 'standard', size: 'large' }
    )
  },[user])
  return (
    <main className={`$flexCenter w-full text-center`}>
      <div className='pb-4 text-2xl lg:text-xl md:text-lg sm:text-sm'>
      {user ? `You are logged in as ${user.given_name}` : 'Sign in using your Google account.'}
      </div>
      <div>
        {!user && <div id="sign-in-div" className=''> </div>}
        {user && 
          <div id="sign-Out-div" className={`${flexCenter} flex-col`}>
            <span className={`w-full mb-4 md:text-sm`}>
              When Signing out, guesses that have not been checked will not be saved.
            </span>
            <div className={`${flexCenter} gap-6 md:gap-2`}>
              <Button 
                className=''
                text='Sign Out'
                onClick={handleLogOut}
                dark={true}
              />
              <Button 
                className=''
                text='Ok'
                onClick={onClose}
                dark={false}
              />
            </div>
          </div>
        }
      </div>
  </main>
    
  )
}

export default SignInWithGoogle