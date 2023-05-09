import WordleAnimation from "./WordleAnimation"
const HowToPlay = () => {
  return (
    <>
    <h1 className={`w-full text-center text-3xl mb-8 font-mont`}>How To Play</h1>
    <h3 className="font-mont mt-4">&#8226; You have a maximum of 6 attempts to guess a 5 letter word.</h3>
    <h3 className="font-mont mt-4">&#8226; After each attempt the letters you've selected will be colored according to the letters in the word you are supposed to guess.</h3>
    <h3 className="font-mont mt-4">&#8226; One letter can appear more than once in the word.</h3>
    <h3 className="font-mont mt-4">&#8226; After selecting 5 letters, press 'Enter' to find out whether you're correct or how close were you.</h3>
    <main className="pt-6">
      <WordleAnimation text="REACT" className=""/>
    </main>
    <ul className={`flex justify-start flex-col`}>
      <li className={``}>
        <span className={`bg-bull rounded-full text-transparent px-3`} />&nbsp;- Bullseye
      </li>
      <li className={`my-2`} >
        <span className={`bg-cow rounded-full text-transparent px-3`} />&nbsp;- Letter exist but not in place
      </li>
      <li className={``} >
        <span className={`bg-black rounded-full text-transparent px-3`} />&nbsp;- Letter does not exist
      </li>
    </ul>
    </>
  )
}

export default HowToPlay