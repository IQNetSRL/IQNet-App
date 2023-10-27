/* eslint-disable no-unused-vars */
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.scss";

const Login = () => {
  const { user } = useAuth0();
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/profil");
  };

  return (
    <section className={styles.sectionLogin}>
      <button onClick={handleRedirect}>
        <img src={user.picture} alt={user.name} />
      </button>
    </section>
  );
};

export default Login;
