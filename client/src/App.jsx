import "./styles/index.css";
import { Routes, Route, useLocation } from 'react-router-dom';
import GameArea from './pages/GameArea';
import Login from './pages/Login';
import Register from './pages/Register';
import StatusBar from './components/StatusBar';
import ActionBar from './components/ActionBar';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const location = useLocation();
  const hideBars =
    location.pathname === '/login' || location.pathname === '/register';

  return (
    <>
      {!hideBars && <StatusBar />}

      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route
          path='/'
          element={
            <ProtectedRoute>
              <GameArea />
            </ProtectedRoute>
          }
        />
        {/* Add more routes if needed */}
      </Routes>

      {!hideBars && <ActionBar />}
    </>
  );
}

export default App;
