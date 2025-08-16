import logo from '../assets/img/argentBankLogo.png';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentUser, selectIsAuthenticated, logout } from '../store/slices/authSlice';

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Sélecteurs Redux
  const user = useSelector(selectCurrentUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img className="main-nav-logo-image" src={logo} alt="Argent Bank Logo" />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div>
        {isAuthenticated ? (
          // Menu utilisateur connecté
          <>
            <Link className="main-nav-item" to="/user">
              <i className="fa fa-user-circle"></i>
              {user?.firstName || 'User'}
            </Link>
            <button 
              className="main-nav-item" 
              onClick={handleLogout}
              style={{ 
                background: 'none', 
                border: 'none', 
                color: 'inherit',
                cursor: 'pointer'
              }}
            >
              <i className="fa fa-sign-out"></i>
              Sign Out
            </button>
          </>
        ) : (
          // Menu utilisateur non connecté
          <Link className="main-nav-item" to="/sign-in">
            <i className="fa fa-user-circle"></i>
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
}
