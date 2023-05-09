import AnimatedText from "./AnimatedText"
import { Link } from 'react-router-dom'
import ChangingString from "./ChangingString"
import { flexCenter } from "../_mixin"
const Home = () => {
  return (
    <div className="min-h-full bg-dark">
    <main className={`flex justify-start flex-col`}>
        <section className="p-16">
            <AnimatedText text="Welcome!" className="text-4xl" />
        </section>
        <section className="pt-3">
            <AnimatedText text="If you're not familiar with the game, click on 'How To Play'." className="" />
        </section>
        <section className="p-3 flex">
            <AnimatedText text="Otherwise, you can" className="" >
              <Link to={'/Game'}className="bg-dark text-light rounded-md p-1 w-40 text-center
                      hover:border-solid border-2 hover:border-dark hover:bg-light hover:text-dark"
                      >
                      Start Playing
              </Link>
            </AnimatedText>
        </section>
    </main>
    <main className="p-12">
      <ChangingString text="W O R D L E" className={`${flexCenter}`} />
    </main>
    </div >
  )
}

export default Home