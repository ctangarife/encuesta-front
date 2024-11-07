"use client";

import React, { useState } from "react";
import styles from "./RegisterForm.module.sass";
import {
  validateEmail,
  submitRegistration,
  GenderEnum,
  TypeIdentification,
} from "../../services/backEncuesta/register";
import { getClientDeviceInfo } from "app/utils/getClientDeviceInfo";

const RegisterForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    typeIdentification: TypeIdentification.CC,
    identification: "",
    birthDate: "",
    gender: GenderEnum.Other,
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  // Manejo del cambio de valores en el formulario
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Manejo del envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validar email
    if (!validateEmail(formData.email)) {
      setError("El email debe pertenecer al dominio @umanizales.edu.co");
      return;
    }

    const deviceInfo = getClientDeviceInfo();
    console.log(deviceInfo, "Device");

    try {
      // Enviar los datos al backend usando el servicio
      await submitRegistration(formData, deviceInfo);
      setSuccess(true);
    } catch (error) {
      setError("Hubo un error al registrar, por favor intenta nuevamente.");
    }
  };
  // Función para formatear la fecha de yyyy-MM-dd a dd-MM-yyyy
  const formatDateToInputValue = (dateString: string) => {
    if (!dateString) return "";
    const [year, month, day] = dateString.split("-");
    return `${day}-${month}-${year}`;
  };

  // Función para manejar el cambio en el input de tipo fecha
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Formatear la fecha de dd-MM-yyyy a yyyy-MM-dd antes de almacenarla
    const [day, month, year] = value.split("-");
    const formattedDate = `${year}-${month}-${day}`;
    setFormData({ ...formData, [name]: formattedDate });
  };

  // Función para obtener la fecha máxima permitida (hace 15 años)
  const getMaxDate = () => {
    const currentDate = new Date();
    // Restar 15 años
    currentDate.setFullYear(currentDate.getFullYear() - 15);
    // Formatear a yyyy-MM-dd
    return currentDate.toISOString().split("T")[0];
  };

  return (
    <div className={styles.registerForm}>
      <h2 className={styles.title}>Registro de Usuario</h2>
      {error && <p className={styles.error}>{error}</p>}
      {success && <p className={styles.success}>¡Registro exitoso!</p>}
      <form>
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          className={styles.inputField}
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="Apellido"
          className={styles.inputField}
          value={formData.lastName}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email (debe ser @umanizales.edu.co)"
          className={styles.inputField}
          value={formData.email}
          onChange={handleChange}
          required
        />
        <select
          name="typeIdentification"
          className={styles.inputField}
          value={formData.typeIdentification}
          onChange={handleChange}
          required
        >
          <option value={TypeIdentification.CC}>CC</option>
          <option value={TypeIdentification.CE}>CE</option>
          <option value={TypeIdentification.TI}>TI</option>
        </select>
        <input
          type="text"
          name="identification"
          placeholder="Identificación"
          className={styles.inputField}
          value={formData.identification}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="birthDate"
          placeholder="Fecha de Nacimiento"
          className={styles.inputField}
          value={formatDateToInputValue(formData.birthDate)}
          onChange={handleDateChange}
          max={getMaxDate()}
          required
        />
        <select
          name="gender"
          className={styles.inputField}
          value={formData.gender}
          onChange={handleChange}
          required
        >
          <option value={GenderEnum.Male}>Masculino</option>
          <option value={GenderEnum.Female}>Femenino</option>
          <option value={GenderEnum.Other}>Otro</option>
        </select>
        <button type="button" className={styles.button} onClick={handleSubmit}>
          Registrar
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
