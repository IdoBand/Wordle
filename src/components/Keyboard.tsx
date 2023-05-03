import { useEffect } from "react";
import { flexCenter } from "../_mixin";

interface KeyboardProps {
    handleKeyPressed: any
    addLetter: any
    removeLetter: any
    enterClickHandler: any
}

const BASIC_KEY_CLASSNAME: string = 'h-12 w-12 border-solid border border-black bg-keyCap rounded-lg m-0.5 hover:bg-light'
const ENTER_BACK_CLASSNAME: string = 'h-12 w-20 bg-light rounded-lg m-0.5 hover:bg-red-400'
export default function Keyboard({handleKeyPressed, addLetter, removeLetter, enterClickHandler}: KeyboardProps) {
    const firsRow = ['Q','W','E','R','T','Y','U','I','O','P'];
    const secondRow = ['A','S','D','F','G','H','J','K','L'];
    const thirdRow = ['Z','X','C','V','B','N','M'];

  
    useEffect(() => {
        window.addEventListener("keyup", (handleKeyPressed));
        // console.log('added event listener');
        return () => {
            window.removeEventListener("keyup", handleKeyPressed);
            // console.log('removed event listener');
        }
    }, [handleKeyPressed]);

    function HandleClick(event: React.MouseEvent<HTMLButtonElement>) {

        const element = event.target as HTMLElement;
        const buttonClicked = element.id;
        if (buttonClicked !== 'enter' && buttonClicked !== 'back'){
                addLetter(buttonClicked);
        } else if (buttonClicked === 'back') {
                removeLetter();
        } else {
                enterClickHandler();
        };
    };

    return (
    <main className={`${flexCenter} flex-col`}>
        <div id="first-row" className="keyboard-row">
            {firsRow.map(key => 
                <button key={key} onClick={HandleClick} className={`${BASIC_KEY_CLASSNAME}`} id={key} type="button">{key}</button>)}
        </div>
        <div id="second-row" className="keyboard-row">
        {secondRow.map(key => 
                <button key={key} onClick={HandleClick} className={`${BASIC_KEY_CLASSNAME}`} id={key} type="button">{key}</button>)}
            
        </div>
        <div id="third-row" className="keyboard-row">
            <button onClick={HandleClick} className={`${ENTER_BACK_CLASSNAME}`} id="enter" type="button">ENTER ↲</button>
            {thirdRow.map(key => 
                <button key={key} onClick={HandleClick} className={`${BASIC_KEY_CLASSNAME}`} id={key} type="button">{key}</button>)}
            <button onClick={HandleClick} className={`${ENTER_BACK_CLASSNAME}`} id="back" type="button">← BACK</button>
        </div>
    </main>
    );
  }
