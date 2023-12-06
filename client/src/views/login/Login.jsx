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
      navigate("/filters");
    } else {
      return;
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = () => {
    setTimeout(() => {
      loginWithRedirect();
    }, "500");
  };

  return (
    <section className={styles.sectionLogin}>
      <div>
        <h1>IQNet</h1>
        <button onClick={handleLogin}>Ingresar</button>
      </div>
    </section>
  );
};

export default Login;
