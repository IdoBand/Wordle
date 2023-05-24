import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import Home from './components/Home'
import Play from './components/Play'
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
                path: '/Play',
                element: <Play />
            },
            {
                path: '/Play',
                element: <Play />
            },
        ]
    }
])