import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import * as sessionActions from './store/session';
// import SignupFormPage from './components/SignupModal/SignupFormModal';
import Navigation from './components/Navigation/Navigation';
import Spots from './components/Spots/Spots.jsx';
import SpotDetails from './components/Spots/SpotDetails.jsx';
import GetAllBookings from './components/Bookings/Bookings.jsx';

// import LoginFormModel from './components/LoginFormModel/LoginFormModel';


function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser())
    .then(() => {setIsLoaded(true)})
    .catch((error) => console.error("Session restore failed", error)
    );
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Outlet />}

    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Spots />
        // element: <h1>Welcome..</h1>
      },
      {
        path: "spots/:spotId",
        element: <SpotDetails />
      },
      {
        path: "spots/:spotId/bookings",
        element: <GetAllBookings />
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;