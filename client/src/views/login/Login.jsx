/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./Login.module.scss";

const Login = (props) => {
  const navigate = useNavigate();
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  Login.propTypes = {
    rol: PropTypes.string.isRequired,
  };

  useEffect(() => {
    if (isAuthenticated && props.rol !== "" && props.rol !== null) {
      props.rol === "admin" ? navigate("/filters") : navigate("/home");
    } else {
      return;
    }
  }, [isAuthenticated, navigate, props.rol]);

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
