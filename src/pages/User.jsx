import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useGetProfileQuery, useUpdateProfileMutation } from '../store/api/authApi';
import { 
  selectCurrentUser, 
  selectIsAuthenticated, 
  selectCurrentToken,
  logout,
  setUser 
} from '../store/slices/authSlice';
import '../assets/css/main.css';
import Account from '../components/Account';

function User() {
  const [isEditing, setIsEditing] = useState(false);
  const [userName, setUserName] = useState('');
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Sélecteurs Redux
  const user = useSelector(selectCurrentUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const token = useSelector(selectCurrentToken);
  
  // RTK Query hooks
  const { 
    data: profileData, 
    isLoading: isLoadingProfile, 
    error: profileError,
    refetch: refetchProfile 
  } = useGetProfileQuery(undefined, {
    skip: !token,
  });

  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();

  // Redirection si non authentifié
  useEffect(() => {
    if (!isAuthenticated && !token) {
      navigate('/sign-in');
    }
  }, [isAuthenticated, token, navigate]);

  // Mise à jour des données utilisateur quand le profil est récupéré
  useEffect(() => {
    if (profileData?.body) {
      dispatch(setUser(profileData.body));
      setUserName(profileData.body.userName || '');
    }
  }, [profileData, dispatch]);

  // Initialisation du userName avec les données utilisateur
  useEffect(() => {
    if (user) {
      setUserName(user.userName || '');
    }
  }, [user]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/sign-in');
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    // Reset le champ si on annule
    if (isEditing && user) {
      setUserName(user.userName || '');
    }
  };

  const handleSave = async () => {
    try {
      // Appel API pour mettre à jour l'username
      const result = await updateProfile({
        userName: userName
      }).unwrap();

      console.log('Profil mis à jour:', result);
      
      // Mettre à jour les données locales
      dispatch(setUser({
        ...user,
        userName: userName
      }));
      
      setIsEditing(false);
      
    } catch (err) {
      console.error('Erreur lors de la mise à jour:', err);
      alert('Erreur lors de la mise à jour du profil');
    }
  };

  // Affichage de chargement
  if (isLoadingProfile) {
    return (
      <main className="main bg-dark">
        <div className="header">
          <h1>Chargement du profil...</h1>
        </div>
      </main>
    );
  }

  // Affichage d'erreur
  if (profileError) {
    return (
      <main className="main bg-dark">
        <div className="header">
          <h1>Erreur lors du chargement du profil</h1>
          <button onClick={refetchProfile} className="edit-button">
            Réessayer
          </button>
          <button onClick={handleLogout} className="edit-button">
            Se déconnecter
          </button>
        </div>
      </main>
    );
  }

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
                  <label htmlFor="userName">User name:</label>
                  <input
                    type="text"
                    id="userName"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="User Name"
                    disabled={isUpdating}
                  />
                </div>
                <div>
                  <button 
                    onClick={handleSave} 
                    className="edit-button"
                    disabled={isUpdating}
                  >
                    {isUpdating ? 'Saving...' : 'Save'}
                  </button>
                  <button 
                    onClick={handleEditToggle} 
                    className="edit-button"
                    style={{ marginLeft: '10px' }}
                    disabled={isUpdating}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        <h2 className="sr-only">Accounts</h2>

        <Account title="Argent Bank Checking (x8349)" amount="$2,082.79" description="Available Balance" />
        <Account title="Argent Bank Savings (x6712)" amount="$10,928.42" description="Available Balance" />
        <Account title="Argent Bank Credit Card (x8349)" amount="$184.30" description="Current Balance" />

      </main>
    </>
  );
}

export default User;
