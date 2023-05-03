import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import Home from './components/Home'
import Game from './components/Game'
export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/Game',
                element: <Game />
            },
        ]
    }
])