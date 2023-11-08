/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import styles from "./FormTickets.module.scss";

const FormTickets = () => {
  const dispatch = useDispatch();
  const { user, isLoading } = useAuth0();
  const allAreas = useSelector((state) => state.someReducer.allAreas);
  const allCategories = useSelector((state) => state.someReducer.allCategories);
  const allStatus = useSelector((state) => state.someReducer.allStatus);
  const allPriorities = useSelector((state) => state.someReducer.allPriorities);
  const allAccounts = useSelector((state) => state.someReducer.allAccounts);
  const [newForm, setNewForm] = useState({
    responsable: "",
    text: "",
    client: "",
    address: "",
  });
  const [newTicket, setNewTicket] = useState({
    username: "",
    informationId: "",
    areaId: "",
    categoryId: "",
    statusId: "",
    priorityId: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      if (!isLoading && user && user.name) {
        const userAccount = allAccounts.find(
          (account) => account.name === user.name
        );
        if (userAccount) {
          setNewTicket({ ...newTicket, username: userAccount.name });
        }
      }
    };
    fetchData();
  }, [isLoading, dispatch]);

  const handleSelectChange = (field, value) => {
    setNewTicket({
      ...newTicket,
      [field]: value,
    });
  };

  console.log(newTicket);

  return (
    <section className={styles.sectionFormTickets}>
      <h1>Crear Ticket</h1>
      <form>
        <select
          name="areas"
          onChange={(e) => handleSelectChange("areaId", e.target.value)}
        >
          <option value="">Ninguna</option>
          {allAreas?.map((area, index) => (
            <option key={area.id || index} value={area.id}>
              {area.name}
            </option>
          ))}
        </select>
        <select
          name="categories"
          onChange={(e) => handleSelectChange("categoryId", e.target.value)}
        >
          <option value="">Ninguna</option>
          {allCategories?.map((category, index) => (
            <option key={category.id || index} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <select
          name="status"
          onChange={(e) => handleSelectChange("statusId", e.target.value)}
        >
          <option value="">Ninguno</option>
          {allStatus?.map((status, index) => (
            <option key={status.id || index} value={status.id}>
              {status.name}
            </option>
          ))}
        </select>
        <select
          name="priorities"
          onChange={(e) => handleSelectChange("priorityId", e.target.value)}
        >
          <option value="">Ninguna</option>
          {allPriorities?.map((priority, index) => (
            <option key={priority.id || index} value={priority.id}>
              {priority.name}
            </option>
          ))}
        </select>
        <select name="responsable">
        <option value="">Ninguno</option>
          {allAccounts?.map((aaccount, index) => (
            <option key={aaccount.id || index} value={aaccount.name}>
              {aaccount.name}
            </option>
          ))}
        </select>
        <input type="text" name="text" placeholder="descripcion" />
        <input type="text" name="client" placeholder="cliente" />
        <input type="text" name="address" placeholder="direccion" />
      </form>
    </section>
  );
};

export default FormTickets;
