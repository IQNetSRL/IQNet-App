/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { postTicket } from "../../redux/actions.js";
import { IoTicket } from "react-icons/io5";
import { IoLocationSharp } from "react-icons/io5";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import Swal from "sweetalert2";
import "leaflet/dist/leaflet.css";
import styles from "./FormTickets.module.scss";

const FormTickets = () => {
  const dispatch = useDispatch();
  const mapRef = useRef(null);
  const resultsRef = useRef(null);
  const { user, isLoading } = useAuth0();
  const allAreas = useSelector((state) => state.someReducer.allAreas);
  const allCategories = useSelector((state) => state.someReducer.allCategories);
  const allStatus = useSelector((state) => state.someReducer.allStatus);
  const allPriorities = useSelector((state) => state.someReducer.allPriorities);
  const allAccounts = useSelector((state) => state.someReducer.allAccounts);
  const allCustomers = useSelector((state) => state.someReducer.allCustomers);
  const [map, setMap] = useState(null);
  const [selectedArea, setSelectedArea] = useState("Ninguna");
  const [isSelected, setIsSelected] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [isListVisible, setListVisible] = useState(false);
  const [filteredCities, setFilteredCities] = useState([]);
  const [newTicket, setNewTicket] = useState({
    username: "",
    AreaId: "",
    CategoryId: "",
    StatusId: "",
    PriorityId: "",
    client: "",
    firstAddress: "",
    secondAddress: "",
    city: "",
    text: "",
    responsable: "",
    coordinates: "",
    customerId: "",
  });

  useEffect(() => {
    if (mapRef.current && map) {
      map.invalidateSize();
    }
    const fetchData = async () => {
      if (!isLoading && user && user.name) {
        const userAccount = allAccounts.find(
          (account) => account.name === user.name
        );
        if (userAccount) {
          setNewTicket((prevTicket) => ({
            ...prevTicket,
            username: userAccount.name,
          }));
        }
      }
    };

    fetchData();
  }, [isLoading, user, allAccounts, map]);

  const isFormValid = () => {
    return (
      newTicket.AreaId.trim() !== "" &&
      newTicket.CategoryId.trim() !== "" &&
      newTicket.StatusId.trim() !== "" &&
      newTicket.PriorityId.trim() !== "" &&
      newTicket.client.trim() !== "" &&
      newTicket.city.trim() !== "" &&
      (newTicket.firstAddress.trim() !== "" ||
        newTicket.secondAddress.trim() !== "") &&
      newTicket.text.trim() !== "" &&
      newTicket.responsable.trim() !== ""
    );
  };

  const handleBlur = () => {
    setTimeout(() => {
      setListVisible(false);
    }, 200);
  };

  const handleFocus = () => {
    if (allCustomers.length > 0) {
      setListVisible(true);
    }
  };

  const handleCustomerInputChange = (event) => {
    const inputValue = event.target.value;

    const isNumber = !isNaN(inputValue);

    const filteredCustomerList = allCustomers.filter((customer) => {
      const nameMatch = customer.name
        .toLowerCase()
        .includes(inputValue.toLowerCase());
      const docNumberMatch =
        isNumber && customer.docNumber.toString().startsWith(inputValue);

      return nameMatch || docNumberMatch;
    });

    setNewTicket((prevTicket) => ({
      ...prevTicket,
      client: inputValue,
      customerId: filteredCustomerList[0]?.id || "",
    }));

    setFilteredCities(filteredCustomerList);
    setListVisible(true);
  };

  const handleSelectCustomer = (selectedCustomer) => {
    setNewTicket({
      ...newTicket,
      customerId: selectedCustomer.id,
      client: selectedCustomer.name,
      firstAddress: selectedCustomer.address || "",
      city: selectedCustomer.city,
    });

    setFilteredCities([]);
    setListVisible(false);
  };

  const handleSelectChange = (field, value) => {
    if (field === "AreaId" && value) {
      let area = allAreas.find((area) => area.id === value);
      setSelectedArea(area.name);
      setIsSelected(true);
    } else if (field === "AreaId" && !value) {
      setIsSelected(false);
      setSelectedArea("Ninguna");
    }
    setNewTicket({
      ...newTicket,
      [field]: value,
    });
  };

  const handleCoordinatesChange = (value) => {
    const coordinatesArray = value.split(/,\s*/).map(Number);

    if (coordinatesArray.length === 2 && !coordinatesArray.some(isNaN)) {
      setNewTicket({
        ...newTicket,
        coordinates: coordinatesArray.join(","),
      });
    } else {
      console.error("Formato de coordenadas incorrecto");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid()) {
      Swal.fire({
        icon: "error",
        text: "Por favor, complete todos los campos (*) antes de enviar el formulario.",
        showCancelButton: false,
        confirmButtonText: "Aceptar",
        color: "#5a5a5a",
        confirmButtonColor: "#E05424",
      });
      return;
    }

    setIsAdding(false);
    try {
      await dispatch(
        postTicket({
          username: newTicket.username,
          AreaId: newTicket.AreaId,
          CategoryId: newTicket.CategoryId,
          StatusId: newTicket.StatusId,
          PriorityId: newTicket.PriorityId,
          client: newTicket.client,
          firstAddress: newTicket.firstAddress,
          secondAddress: newTicket.secondAddress,
          city: newTicket.city,
          text: newTicket.text,
          responsable: newTicket.responsable,
          coordinates: newTicket.coordinates,
          customerId: newTicket.customerId,
        })
      );
      setNewTicket((prevTicket) => ({
        ...prevTicket,
        username: "",
        AreaId: "",
        CategoryId: "",
        StatusId: "",
        PriorityId: "",
        client: "",
        firstAddress: "",
        secondAddress: "",
        city: "",
        text: "",
        responsable: "",
        coordinates: "",
        customerId: "",
      }));
    } catch (error) {
      console.error("Error al agregar un ticket:", error);
    }
  };

  const handleMapLoad = (map) => {
    setMap(map);
  };

  const handleAdd = () => {
    setIsAdding(!isAdding);
  };

  const handleOpenMap = () => {
    setIsMapOpen(!isMapOpen);
  };

  return (
    <section className={styles.sectionFormTickets}>
      <div className={styles.titleContainer}>
        <h2 className={styles.title}>Ticket</h2>
        <span className={styles.ticketIcon}>
          <IoTicket />
        </span>
      </div>
      <section className={styles.formSection}>
        <div className={styles.topButton}>
          <button onClick={handleAdd}>
            {isAdding ? "Cancelar" : "Cargar Ticket"}
          </button>
        </div>
        <div className={styles.formDiv}>
          {isAdding && (
            <form>
              <div>
                <label>
                  -Seleccionar Area {newTicket.AreaId.trim() === "" && "*"}
                </label>
                <select
                  name="areas"
                  value={newTicket.AreaId}
                  onChange={(e) => handleSelectChange("AreaId", e.target.value)}
                >
                  <option value="">Ninguna</option>
                  {allAreas?.map((area, index) => (
                    <option key={area.id || index} value={area.id}>
                      {area.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label>
                  -Seleccionar Categoria{" "}
                  {newTicket.CategoryId.trim() === "" && "*"}
                </label>
                <select
                  name="categories"
                  value={newTicket.CategoryId}
                  onChange={(e) =>
                    handleSelectChange("CategoryId", e.target.value)
                  }
                >
                  <option value="">Ninguna</option>
                  {allCategories?.map((category, index) => (
                    <option key={category.id || index} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label>
                  -Seleccionar Estado {newTicket.StatusId.trim() === "" && "*"}
                </label>
                <select
                  name="status"
                  value={newTicket.StatusId}
                  onChange={(e) =>
                    handleSelectChange("StatusId", e.target.value)
                  }
                >
                  <option value="">Ninguno</option>
                  {allStatus?.map((status, index) => (
                    <option key={status.id || index} value={status.id}>
                      {status.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label>
                  -Seleccionar Prioridad{" "}
                  {newTicket.PriorityId.trim() === "" && "*"}
                </label>
                <select
                  name="priorities"
                  value={newTicket.PriorityId}
                  onChange={(e) =>
                    handleSelectChange("PriorityId", e.target.value)
                  }
                >
                  <option value="">Ninguna</option>
                  {allPriorities?.map((priority, index) => (
                    <option key={priority.id || index} value={priority.id}>
                      {priority.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label>
                  -Asignar a {newTicket.responsable.trim() === "" && "*"}
                </label>
                <select
                  name="responsable"
                  value={newTicket.responsable}
                  disabled={isSelected ? false : true}
                  onChange={(e) =>
                    handleSelectChange("responsable", e.target.value)
                  }
                >
                  <option value="">Ninguno</option>
                  {selectedArea === "administracion" &&
                    allAccounts
                      .filter((account) => account.level === "admin")
                      .map((adminAccount, index) => (
                        <option
                          key={adminAccount.id || index}
                          value={adminAccount.name}
                        >
                          {adminAccount.name}
                        </option>
                      ))}
                  {selectedArea === "ventas" &&
                    allAccounts
                      .filter((account) => account.level === "sales")
                      .map((adminAccount, index) => (
                        <option
                          key={adminAccount.id || index}
                          value={adminAccount.name}
                        >
                          {adminAccount.name}
                        </option>
                      ))}
                  {selectedArea === "servicio técnico" &&
                    allAccounts
                      .filter((account) => account.level === "support")
                      .map((adminAccount, index) => (
                        <option
                          key={adminAccount.id || index}
                          value={adminAccount.name}
                        >
                          {adminAccount.name}
                        </option>
                      ))}
                </select>
              </div>
              <div>
                <label>
                  -Descripcion {newTicket.text.trim() === "" && "*"}
                </label>
                <input
                  type="text"
                  name="text"
                  placeholder="descripcion"
                  value={newTicket.text}
                  onChange={(e) => handleSelectChange("text", e.target.value)}
                />
              </div>
              <div>
                <label>-Cliente {newTicket.client.trim() === "" && "*"}</label>
                <input
                  type="text"
                  name="client"
                  placeholder="cliente o DNI"
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  value={newTicket.client}
                  onChange={handleCustomerInputChange}
                />
                {isListVisible && filteredCities.length > 0 && (
                  <ul className={styles.customerResults} ref={resultsRef}>
                    {filteredCities.slice(0, 5).map((customer) => (
                      <li
                        key={customer.id}
                        onClick={() => handleSelectCustomer(customer)}
                      >
                        {customer.name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div>
                <label>
                  -Ciudad{" "}
                  {newTicket.city === "" || (newTicket.city === null && "*")}
                </label>
                <input
                  type="text"
                  name="city"
                  disabled={newTicket.client.trim() === ""}
                  placeholder="ciudad"
                  value={newTicket.city}
                  onChange={(e) => handleSelectChange("city", e.target.value)}
                />
              </div>
              <div>
                <label>-Direccion 1</label>
                <input
                  type="text"
                  name="firstAddress"
                  placeholder="direccion 1"
                  disabled={true}
                  value={newTicket.firstAddress}
                  onChange={(e) =>
                    handleSelectChange("firstAddress", e.target.value)
                  }
                />
              </div>
              <div>
                <label>
                  -Direccion 2{" "}
                  {newTicket.firstAddress.trim() === "" &&
                    newTicket.secondAddress.trim() === "" &&
                    "*"}
                </label>
                <input
                  type="text"
                  name="secondAddress"
                  placeholder="direccion 2"
                  value={newTicket.secondAddress}
                  onChange={(e) =>
                    handleSelectChange("secondAddress", e.target.value)
                  }
                />
              </div>
              <div>
                <label>-Coordenadas</label>
                <input
                  type="text"
                  name="coordinates"
                  placeholder="coordenadas"
                  value={newTicket.coordinates}
                  onChange={(e) => handleCoordinatesChange(e.target.value)}
                />
              </div>
            </form>
          )}
        </div>
        {isAdding && (
          <div className={styles.createButtonContainer}>
            <button className={styles.createButton} onClick={handleSubmit}>
              Crear
            </button>
          </div>
        )}
      </section>
      <div style={{ width: "100%" }}>
        <button className={styles.showMapButton} onClick={handleOpenMap}>
          <p> {isMapOpen ? "Ocultar" : "Ver Mapa"}</p>
          <span>
            <IoLocationSharp />
          </span>
        </button>
      </div>
      {isMapOpen && (
        <div style={{ height: "400px", width: "100%" }}>
          <MapContainer
            center={
              newTicket.coordinates
                ? newTicket.coordinates.split(",").map(Number)
                : [-27.20789114815453, -54.975951133931545]
            }
            zoom={9}
            style={{ height: "100%", width: "100%" }}
            whenCreated={handleMapLoad}
            onLoad={() =>
              mapRef.current && mapRef.current.leafletElement.invalidateSize()
            }
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {newTicket.coordinates && (
              <Marker
                position={newTicket.coordinates.split(",").map(Number)}
                draggable={false}
              >
                <Popup>Tu ubicación ingresada aquí.</Popup>
              </Marker>
            )}
          </MapContainer>
        </div>
      )}
    </section>
  );
};

export default FormTickets;
