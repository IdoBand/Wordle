import Tiles from "./Tiles"
import Keyboard from "./Keyboard";
import Spinner from "./Spinner";
import Modal from "./Modal";
import { flexCenter } from "../_mixin";
import useGame from "../hooks/useGame";
import Button from "./Button";
const Play = () => {

  const {
    dialogMessage,
    tiles,
    addLetter,
    removeLetter,
    handleKeyPressed,
    enterClickHandler,
    isFetching,
    uncompletedGame,
    setUnCompletedGame
  } = useGame()

  return (
    <>
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
  {uncompletedGame && 
      <Modal className='' onClose={() => setUnCompletedGame(prev => !prev)}>
        <div className={`${flexCenter} flex-col gap-6`}>
        System has detected a game you did not complete.
        <Button 
          className="py-2"
          text="Ok" 
          onClick={() => setUnCompletedGame(false)}
          dark={false}
        />
        </div>
      </Modal>}
    </>
  )
}

export default Play