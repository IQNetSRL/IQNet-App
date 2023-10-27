/* eslint-disable no-unused-vars */
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styles from "./Profile.module.scss";

const Profile = () => {
  const { user, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  const handleNavigate = () => {
    window.history.back();
  };
  
  return (
    <section className={styles.sectionProfile}>
      <h1>Perfil</h1>
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>
      <button onClick={handleNavigate}>volver</button>
    </section>
  );
};

export default Profile;