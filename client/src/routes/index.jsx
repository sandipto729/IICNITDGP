import { createBrowserRouter } from 'react-router-dom';
import App from '../App.jsx';
import Event from './../pages/Events/Events.jsx';
import Home from './../pages/Home/Home.jsx';
import Guidelines from './../pages/Guidelines/Guidelines.jsx';
import Team from './../pages/Team/Team.jsx';
import FAQ from './../pages/FAQ/FAQ.jsx';
import Error from './../layouts/Error/Error.jsx';
import Gallery from '../pages/Gallery/Gallery.jsx';
import Login from '../authentication/Login/Login.jsx';
import Activity from '../pages/Activity/Activity.jsx';
import Collaboration from '../pages/Collaboration/Collaboration.jsx';

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
            },
            {
                path: '/guidelines',
                element: <Guidelines />
            },
            {
                path: '/team',
                element: <Team />
            },
            {
                path: '/faq',
                element: <FAQ />
            },
            {
                path: '/gallery',
                element: <Gallery />
            },
            {
                path: '/activity',
                element: <Activity />
            },
            {
                path: '/collaboration',
                element: <Collaboration />
            },
            // {
            //     path: '/login',
            //     element: <Login />
            // },
            {
                path: '*',
                element: <Error />
            }
        ],
        
    }
]);

export default router;