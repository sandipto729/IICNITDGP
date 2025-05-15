import { createBrowserRouter } from 'react-router-dom';
import App from '../App.jsx';
import Event from './../pages/Events/Events.jsx';
import Home from './../pages/Home/Home.jsx';
import Guidelines from './../pages/Guidelines/Guidelines.jsx';
import Team from './../pages/Team/Team.jsx';
import FAQ from './../pages/FAQ/FAQ.jsx';
import Error from './../layouts/Error/Error.jsx';
import Galary from '../pages/Galary/Galary.jsx';

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
                path: '/galary',
                element: <Galary />
            },
            {
                path: '*',
                element: <Error />
            }
        ],
        
    }
]);

export default router;