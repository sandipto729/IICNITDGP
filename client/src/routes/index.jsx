import { createBrowserRouter } from 'react-router-dom';
import App from '../App.jsx';
import Event from './../pages/Events/Events.jsx';
import Home from './../pages/Home/Home.jsx';

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/event',
                element: <Event />
            }
        ]
    }
]);

export default router;