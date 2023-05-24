import AnimatedText from "./AnimatedText"
import { Link } from 'react-router-dom'
import ChangingString from "./ChangingString"
import { flexCenter } from "../_mixin"
import { userContext } from '../providers/userProvider'
import { useContext } from 'react'
const Home = () => {

  const { user, setUser } = useContext<any>(userContext)

  return (
    <div className="min-h-full bg-dark">

    <main className={`flex justify-start flex-col`}>
        <section className="p-16">
            <AnimatedText text={`Welcome${user ? ' ' + user.given_name : ''}!`} className="text-4xl" />
        </section>
        <section className="pt-3">
            <AnimatedText text="If you're not familiar with the game, click on 'How To Play'." className="lg:text-base" />
        </section>
        <section className="p-3 flex">
            <AnimatedText text="in order to save games and keep score, You can sign in." className="lg:text-base" >

            </AnimatedText>
        </section>
    </main>
    <main className="p-12">
      <ChangingString text="W O R D L E" className={`${flexCenter} lg:text-4xl`} />
    </main>
    </div >
  )
}

export default Home