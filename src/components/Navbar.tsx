import { useState, useContext, useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { flexCenter, transformTranslateCenter } from '../_mixin';
import Modal from './Modal';
import HowToPlay from './HowToPlay';
import About from './About';
import ContactBar from './ContactBar';
import LeaderBoard  from './LeaderBoard'
import SignInWithGoogle from './SignInWithGoogle';
import { userContext } from '../providers/userProvider';
const BASIC_NAVBAR_LINK_CLASSNAME ='font-mont pb-2 border-b-2 border-solid'
const Navbar = () => {
  const [about, setAbout] = useState<boolean>(false)
  const [howToPlay, setHowToPlay] = useState<boolean>(false)
  const [responsiveMenu, setResponsiveMenu] = useState<boolean>(false)
  const [signInWithGoogle, setSignInWithGoogle] = useState<boolean>(false)
  const [leaderBoard, setLeaderBoard] = useState<boolean>(false)
  const [currentPage, setCurrentPage] = useState<string>('1')
  const { user, setUser } = useContext<any>(userContext)
  
  function handleCurrentPage(e: any) {
    setCurrentPage(e.target.dataset.key)
  }
  
  return (
    <>
    <ContactBar />
    <header className='flex justify-between items-center relative w-full py-2 px-10 bg-dark text-light md:px-0'>
        <button className={`hidden lg:flex flex-col  md:pl-2`} onClick={() => setResponsiveMenu(prev => !prev)}>
          <span className={`${flexCenter} h-0.5 w-5 my-0.5 rounded-lg bg-light`}></span>
          <span className={`${flexCenter} h-0.5 w-5 my-0.5 rounded-lg bg-light`}></span>
          <span className={`${flexCenter} h-0.5 w-5 my-0.5 rounded-lg bg-light`}></span>
        </button>
        <nav className='lg:hidden'>
            <Link data-key={1} to={'/'} className={`mr-2 ${BASIC_NAVBAR_LINK_CLASSNAME} ${currentPage === '1' ? 'border-light' : 'border-transparent'}`} onClick={(e) => handleCurrentPage(e)}>Home</Link>
            <Link data-key={2} to={'/Play'} className={`mx-2 ${BASIC_NAVBAR_LINK_CLASSNAME} ${currentPage === '2' ? 'border-light' : 'border-transparent'}`} onClick={(e) => handleCurrentPage(e)}>Play</Link>
            <button className='font-mont mx-2' onClick={() => {setHowToPlay(prev => !prev)}}>How To Play</button>
            <button className='font-mont mx-2' onClick={() => {setAbout(prev => !prev)}}>About</button>
            <button className={`font-mont mx-2`} onClick={() => {setLeaderBoard(prev => !prev)}}>Leader Board</button>
        </nav>
        <div className={`absolute ${transformTranslateCenter} md:text-sm`}>
            Wordle
        </div>
        <button className={`${flexCenter} font-mont hover:text-lightBlue md:text-sm md:pr-2`} onClick={() => setSignInWithGoogle(prev => !prev)}>
          {user ? `Hi, ${user.given_name}` : 'Sign In'}
          <img src={user ? user.picture : '/assets/react.svg'} alt="user-img" className={`ml-2 max-h-8 ${user ? 'rounded-full' : ''}`}/>
        </button> 

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
    {responsiveMenu && 
     <Modal className='' 
            onClose={() => setResponsiveMenu(prev => !prev)}
            >
          <nav className={`w-full ${flexCenter} flex-col`}>
            <Link to={'/'} className='font-mont mb-1' onClick={() => setResponsiveMenu(prev => !prev)}>Home</Link>
            <Link to={'/Play'} className='font-mont mb-1' onClick={() => setResponsiveMenu(prev => !prev)}>Play</Link>
            <button className='font-mont my-1' onClick={() => {setHowToPlay(prev => !prev); setResponsiveMenu(prev => !prev)}}>How To Play</button>
            <button className='font-mont my-1' onClick={() => {setAbout(prev => !prev); setResponsiveMenu(prev => !prev)}}>About</button>
            <button className={`font-mont mt-1`} onClick={() => {setLeaderBoard(prev => !prev); setResponsiveMenu(prev => !prev)}}>Leader Board</button>
        </nav>
    </Modal>}
    {signInWithGoogle && 
      <Modal className='' onClose={() => setSignInWithGoogle(prev => !prev)}>
          <SignInWithGoogle onClose={() => setSignInWithGoogle(false)}/>
      </Modal>}
    {leaderBoard && 
      <Modal className='' onClose={() => setLeaderBoard(prev => !prev)}>
          <LeaderBoard />
      </Modal>}
    <Outlet />
    </>
  )
}

export default Navbar