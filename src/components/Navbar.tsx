import { useState, useContext, useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { flexCenter, transformTranslateCenter } from '../_mixin';
import Modal from './Modal';
import HowToPlay from './HowToPlay';
import About from './About';
import ContactBar from './ContactBar';
const Navbar = () => {
  const [about, setAbout] = useState<boolean>(false)
  const [howToPlay, setHowToPlay] = useState<boolean>(false)
  const [responsiveMenu, setResponsiveMenu] = useState<boolean>(false)
  
  return (
    <>
    <ContactBar />
    <header className='flex justify-between items-center relative w-full py-2 px-10 bg-dark text-light'>
        <button className={`hidden lg:flex flex-col`} onClick={() => setResponsiveMenu(prev => !prev)}>
          <span className={`${flexCenter} h-0.5 w-5 my-0.5 rounded-lg bg-light`}></span>
          <span className={`${flexCenter} h-0.5 w-5 my-0.5 rounded-lg bg-light`}></span>
          <span className={`${flexCenter} h-0.5 w-5 my-0.5 rounded-lg bg-light`}></span>
        </button>
        <nav className='lg:hidden'>
            <Link to={'/'} className='font-mont pl-2'>Home</Link>
            <button className='font-mont px-4' onClick={() => setHowToPlay(prev => !prev)}>How To Play</button>
            <button className='font-mont' onClick={() => setAbout(prev => !prev)}>About</button>
        </nav>
        <div className={`absolute ${transformTranslateCenter} `}>
            Wordle
        </div>
        <div className=''>
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
    {responsiveMenu && <Modal className='' 
            onClose={() => setResponsiveMenu(prev => !prev)}
            >
            <nav className={`w-full ${flexCenter} flex-col`}>
            <Link to={'/'} className='font-mont' onClick={() => setResponsiveMenu(prev => !prev)}>Home</Link>
            <button className='font-mont my-2' onClick={() => {setHowToPlay(prev => !prev); setResponsiveMenu(prev => !prev)}}>How To Play</button>
            <button className='font-mont' onClick={() => {setAbout(prev => !prev); setResponsiveMenu(prev => !prev)}}>About</button>
        </nav>
    </Modal>}
    <Outlet />
    </>
  )
}

export default Navbar