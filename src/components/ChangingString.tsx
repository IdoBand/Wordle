import { useState, useEffect} from 'react'
interface ChangingStringProps {
    text: string
    className?: string
}
const abc = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const ChangingString = ({text, className}: ChangingStringProps) => {

    const [text2, setText] = useState(text)
    useEffect(() => {
        setInterval(() => {
            let iterations = 0;
        const interval = setInterval(() => {
          setText((prevText) =>
            prevText.split("").map((letter, idx) => {
                if (idx < iterations) {
                  return text[idx];
                }
                return abc[Math.floor(Math.random() * 26)];
              })
              .join("")
          );
          iterations += 1;
          if (iterations >= text.length) clearInterval(interval)
        }, 100);
    
        return () => clearInterval(interval);
        }, 2000)
      }, []);
    
  return (
    <h1 className={`font-mono text-5xl text-light ${className}`}>{text2}</h1>
  )
}

export default ChangingString

///// M O U S E   E N T E R /////


// const abc = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'


// function changeText(event: React.MouseEvent<HTMLElement>) {
//     let iterations = 0;
//     const target = event.target as HTMLElement;
  
//     const interval = setInterval(() => {
//       target.innerText = target.innerText
//         .split("")
//         .map((letter, idx) => {
//           if (idx < iterations) {
//             return target.dataset.value![idx];
//           }
//           return abc[Math.floor(Math.random() * 26)];
//         })
//         .join("");
//       if (iterations >= target.dataset.value!.length) clearInterval(interval);
  
//       iterations += 1;
//     }, 100);
//   }
///////////////    r e t u r n    ///////////////
//   <h1 onMouseEnter={(e) => changeText(e)} data-value="W O R D L E" className="font-mono text-5xl text-light">{'W O R D L E'}</h1>