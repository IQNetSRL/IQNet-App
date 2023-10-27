/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.scss";

const Login = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    } else {
      return;
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = () => {
    loginWithRedirect();
  };

  return (
    <section className={styles.sectionLogin}>
      <h1>Login</h1>
      <button onClick={handleLogin}>Iniciar Sesión</button>
    </section>
  );
};

export default Login;
