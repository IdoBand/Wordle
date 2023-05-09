import { useState, useContext, useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { transformTranslateCenter } from '../_mixin';
import Modal from './Modal';
import HowToPlay from './HowToPlay';
import About from './About';
import ContactBar from './ContactBar';
const Navbar = () => {
  const [about, setAbout] = useState<boolean>(false)
  const [howToPlay, setHowToPlay] = useState<boolean>(false)
  return (
    <>
    <ContactBar />
    <header className='flex justify-between items-center relative w-full py-2 bg-dark text-light'>
        <nav className='pl-10'>
            <Link to={'/'} className='font-mont pl-2'>Home</Link>
            <button className='font-mont px-4' onClick={() => setHowToPlay(prev => !prev)}>How To Play</button>
            <button className='font-mont' onClick={() => setAbout(prev => !prev)}>About</button>
        </nav>
        <div className={`absolute ${transformTranslateCenter} `}>
            Wordle
        </div>
        <div className='pr-10'>
            <img src={'/assets/react.svg'} />
        </div>
    </header>
    {about && <Modal className='' 
                     onClose={() => setAbout(false)}>
                     <About />
              </Modal>}
    {howToPlay && <Modal className='' 
                         onClose={() => setHowToPlay(false)}
                         >
                          <HowToPlay />
                  </Modal>}
    <Outlet />
    </>
  )
}

export default Navbar