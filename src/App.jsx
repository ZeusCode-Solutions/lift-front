import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Workouts from './Workouts';
import Profile from './About';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';

const AuthenticatedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth0();
  return isAuthenticated ? children : <Profile />
}
class App extends React.Component {
  render() {
    return (
      <Auth0Provider
      domain={import.meta.env.VITE_AUTH_DOMAIN}
      clientId={import.meta.env.VITE_AUTH_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
        
        <Router>
          <Header />
          <Routes>
            <Route
              exact path="/"
              element={<AuthenticatedRoute><Workouts /></AuthenticatedRoute>}
            />
            <Route
              path="/about"
              element={<Profile />}
            />
          </Routes>
          <Footer />
        </Router>
        </Auth0Provider>
    )
  }
}

export default App;