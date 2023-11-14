/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  postAccount,
} from "../../redux/actions.js";
import Default from "../.././assets/images/profile-icon.png"; 
import styles from "./ProfileButton.module.scss";

const ProfileButton = () => {
  const { user, isLoading } = useAuth0();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      if (!isLoading && user && user.name) {
        await dispatch(postAccount(user.name));
      }
    };

    fetchData();
  }, [isLoading, dispatch, user]);

  const handleRedirect = () => {
    navigate("/profile");
  };

  return (
    <section className={styles.sectionProfileButton}>
      <button onClick={handleRedirect}>
        <img src={isLoading ? Default : user.picture} alt={isLoading ? "perfil" : user.name} />
      </button>
    </section>
  );
};

export default ProfileButton;
