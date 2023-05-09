import { flexCenter } from "../_mixin"
import { motion } from 'framer-motion'
interface WordleAnimationProps {
    text: string
    className?: string
}

const entireQuote = {
    initial: {
        opacity: 0,
    },
    animate: {
        opacity: 1,
        transition: {
            delay: 0.5,
            staggerChildren: 0.08
        },
    }
}
const letterTop = {
    initial: {
        opacity: 0,
        y: -50,
    },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 1.2
        },
    }
}
const letterBottom = {
    initial: {
        opacity: 0,
        y: 50,
    },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 1.2
        },
    }
}

const WordleAnimation = ({text, className=""}: WordleAnimationProps) => {
  return (
    <div className={`w-full mx-auto py-2 ${flexCenter} flex-col text-center bg-dark ${className}
    `}>
        <motion.h1 className={`inline-block w-full font-bold capitalize text-2xl dark:text-light ${className}`}
        variants={entireQuote}
        initial="initial"
        animate="animate"
        >
          {
         
            text.split("").map((letter, idx) => {
                if (idx % 2 === 0) {
                return (<motion.span key={idx} 
                                     className={`inline-block text-center font-mont p-2 m-1
                                        border rounded-md ${idx === 0 ? 'bg-bull' : ''} ${idx === 2 ? 'bg-cow' : ''}
                                     `}
                                    variants={letterTop}
                // when using staggerChildren on the parent element we don't have to initialize "initial" and "animate"
                >
                    {letter}
                </motion.span>)
                }else {
                    return (<motion.span key={letter+'-'+idx} 
                                     className={`inline-block text-center font-mont p-2 m-1
                                        border rounded-md
                                     `}
                                    variants={letterBottom}
                // when using staggerChildren on the parent element we don't have to initialize "initial" and "animate"
                >
                    {letter}
                </motion.span>)
                }

            })
          }
        </motion.h1>
    </div>
  )
}

export default WordleAnimation