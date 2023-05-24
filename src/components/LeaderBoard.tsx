import { useState, useEffect } from 'react'
const BASIC_URL: string = import.meta.env.VITE_BASIC_URL
import Spinner from './Spinner'
import { flexCenter } from '../_mixin'
import { userContext } from '../providers/userProvider'
import { useContext } from 'react'
const LeaderBoard = () => {

    const [leaderBoardArray, setLeaderBoardArray] = useState([])
    const [error, setError] = useState<boolean>(false)
    const [isFetching, setIsFetching] = useState<boolean>(false)
    const { user, setUser } = useContext<any>(userContext)
    async function getLeaderBoard() {
        setIsFetching(true)
        try {
            const response = await fetch(`${BASIC_URL}/getLeaderBoard`)
            const result = await response.json()
            setLeaderBoardArray(result)
        } catch (err) {
            console.log(err);
            setError(true)
        } finally {
            setIsFetching(false)
        }   
    }

    useEffect(() => {
        getLeaderBoard()
    }, [])

  return (
    <main className={`${flexCenter} flex-col`}>
        <div className='text-3xl mb-6'>
            Leader Board
        </div>
        {isFetching && <Spinner className=''></Spinner>}
        {error && <h1 className={`${flexCenter}`}>Server Error :(</h1>}
        {leaderBoardArray.length &&
        <div className='w-full'>
        <div className={`flex justify-between w-full text-xl`}>
            <div className='w-4/12 text-xl text-left'>#</div>
            <div className='w-4/12 text-xl text-center'>Name</div>
            <div className='w-4/12 text-xl text-right'>Score</div>
        </div>
    {leaderBoardArray.map((leader: any, idx: number) => {
        return (
        <div key={idx} className={`flex justify-between full`}>
            <div className='w-4/12 text-left'>{idx + 1}.</div>
            {user ? 
                <div className={`w-4/12 text-center ${user.email === leader.userId ? 'text-blue-400' : ''}`}>{leader.userName}</div>
            :
                <div className={`w-4/12 text-center`}>{leader.userName}</div>
            }
            <div className='w-4/12 text-right'>{leader.sum}</div>
        </div>)
    })
    }</div>
        }
    </main>
  )
}

export default LeaderBoard