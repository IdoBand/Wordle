import useGameLogic from "../hooks/useGameLogic"
import Tiles from "./Tiles"
import Keyboard from "./Keyboard";
import { useEffect } from "react";
import Spinner from "./Spinner";
import { flexCenter } from "../_mixin";
const Game = () => {

const {
  dialogMessage,
  gameState,
  setGameState,
  tiles,
  setTiles,
  resetGame,
  addLetter,
  removeLetter,
  handleKeyPressed,
  enterClickHandler,
  getWordFromServer,
  encryptedObject,
  checkWordAtServer,
  loginForToken,
  error,
  isFetching
} = useGameLogic()
useEffect(() => {
  getWordFromServer()
}, [])
  return (
  <div className={`this flex justify-start items-center flex-col bg-dark pt-2`}>
    <main className={`grid grid-cols-5 gap-2 self`}
    >
      <Tiles tiles={tiles} />
    </main>
    <main className={`h-12 text-light ${dialogMessage.className} flex w-64 my-2 rounded-xl text-end`}>
      <div className={`${flexCenter} w-full gap-1`}>
        {dialogMessage.message}
        {isFetching && <Spinner className={``}/>}
      </div>
      
    </main>
    <Keyboard 
      addLetter={addLetter}
      removeLetter={removeLetter}
      handleKeyPressed={handleKeyPressed}
      enterClickHandler={enterClickHandler}
    />
  </div>
    
  )
}

export default Game