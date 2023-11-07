/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch } from "react-redux";
import { postAccount } from "../../redux/actions.js";
import styles from "./Home.module.scss";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading } = useAuth0();

  useEffect(() => {
    const fetchData = async () => {
      if (!isLoading && user && user.name) {
        await dispatch(postAccount(user.name));
      }
    };
    fetchData();
  }, [isLoading, dispatch]);

  const handleNavigate = () => {
    navigate("/admin");
  };

  return (
    <section className={styles.sectionHome}>
      <h1>Home</h1>
      <button onClick={handleNavigate}>ir a administrador</button>
    </section>
  );
};

export default Home;
