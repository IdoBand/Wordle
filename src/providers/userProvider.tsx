import { createContext, Dispatch, SetStateAction } from "react";
import { DecodedUserJWT } from "../components/SignInWithGoogle";
interface UserContextType {
    user: DecodedUserJWT | null;
    setUser: React.Dispatch<React.SetStateAction<DecodedUserJWT | null>>;
  }
  
export const userContext = createContext<UserContextType | null>(null);