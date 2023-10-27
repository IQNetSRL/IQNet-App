/* eslint-disable no-unused-vars */
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styles from "./Login.module.scss";

const Login = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <section className={styles.sectionLogin}>
      <h1>Login</h1>
      <button onClick={() => loginWithRedirect()}>Iniciar Sesión</button>
    </section>
  );
};

export default Login;
