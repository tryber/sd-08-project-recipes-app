import React, { useEffect, useState } from 'react';
import components from '../components/index';

function Profile() {
  const [data, setData] = useState();

  useEffect(() => {
    localStorage.setItem('email', 'email@mail.com');
    setData(localStorage.getItem('email'));
  }, []);
  return (
    <div>
      <components.Header title="Perfil" />
      <main className="explore-container">
        <h3 data-testid="profile-email">{data}</h3>
        <components.DoneRecipesButton />
        <components.FavoritesButton />
        <components.LogoutButton />
      </main>

      <components.Footer />
    </div>
  );
}

export default Profile;
