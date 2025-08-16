import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { 
  selectCurrentUser, 
  selectIsAuthenticated, 
  selectCurrentToken,
  logout,
} from '../store/slices/authSlice';
import '../assets/css/main.css';
import Account from '../components/Account';

function User() {
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Sélecteurs Redux
  const user = useSelector(selectCurrentUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const token = useSelector(selectCurrentToken);
  

  // Redirection si non authentifié
  useEffect(() => {
    if (!isAuthenticated && !token) {
      navigate('/sign-in');
    }
  }, [isAuthenticated, token, navigate]);

  // Initialisation des champs d'édition avec les données utilisateur
  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || '');
      setLastName(user.lastName || '');
    }
  }, [user]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/sign-in');
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    // Reset les champs si on annule
    if (isEditing && user) {
      setFirstName(user.firstName || '');
      setLastName(user.lastName || '');
    }
  };

  const handleSave = () => {
    // TODO: Implémenter la sauvegarde avec l'API
    console.log('Sauvegarde:', { firstName, lastName });
    setIsEditing(false);
  };

  return (
    <>
      <main className="main bg-dark">
        <div className="header">
          {!isEditing ? (
            // Mode affichage normal
            <>
              <h1>
                Welcome back
                <br />
                {user?.firstName} {user?.lastName}!
              </h1>
              <div>
                <button onClick={handleEditToggle} className="edit-button">
                  Edit Name
                </button>
                <button 
                  onClick={handleLogout} 
                  className="edit-button"
                  style={{ marginLeft: '10px', backgroundColor: '#dc3545' }}
                >
                  Sign Out
                </button>
              </div>
            </>
          ) : (
            // Mode édition
            <>
              <h1>Edit user info</h1>
              <div className="edit-form">
                <div className="input-wrapper">
                  <label htmlFor="firstName">First Name:</label>
                  <input
                    type="text"
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First Name"
                  />
                </div>
                <div className="input-wrapper">
                  <label htmlFor="lastName">Last Name:</label>
                  <input
                    type="text"
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last Name"
                  />
                </div>
                <div>
                  <button onClick={handleSave} className="edit-button">
                    Save
                  </button>
                  <button 
                    onClick={handleEditToggle} 
                    className="edit-button"
                    style={{ marginLeft: '10px' }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        <h2 className="sr-only">Accounts</h2>


        <Account title = "Argent Bank Checking (x8349)" amount="$2,082.79" description="Available Balance" />
        <Account title = "Argent Bank Savings (x6712)" amount="$10,928.42" description="Available Balance" />
        <Account title = "Argent Bank Credit Card (x8349)" amount="$184.30" description="Current Balance" />

      </main>

    </>
  );
}

export default User;
