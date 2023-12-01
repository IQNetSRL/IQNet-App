/* eslint-disable no-unused-vars */
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { TbLogout2 } from "react-icons/tb";
import styles from "./LogoutButton.module.scss";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <button
      className={styles.logoutButton}
      onClick={() =>
        logout({ logoutParams: { returnTo: window.location.origin } })
      }
    >
      <span>
        <TbLogout2 />
      </span>
      Cerrar sesion
    </button>
  );
};

export default LogoutButton;
