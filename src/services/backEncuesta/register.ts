import { encuestaUrls } from "./urls";

// Validar email para que pertenezca al dominio @umanizales.edu.co
export const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@umanizales\.edu\.co$/;
  return emailRegex.test(email);
};

export enum GenderEnum {
  Male = "Masculino",
  Female = "Femenino",
  Other = "Otro",
}

export enum TypeIdentification {
  CC = "CC",
  CE = "CE",
  TI = "TI",
}

// Manejo del envío del formulario de registro al backend
export const submitRegistration = async (
  formData: {
    name: string;
    lastName: string;
    email: string;
    typeIdentification: TypeIdentification;
    identification: string;
    birthDate: string;
    gender: GenderEnum;
  },
  deviceInfo: any
) => {
  try {
    const body = JSON.stringify({ formData, deviceInfo });

    console.log("Registrando usuario...", body);

    const response = await fetch(`${encuestaUrls.user.register}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: body,
    });

    if (!response.ok) {
      throw new Error("Failed to register user");
    }

    console.log("User registered successfully");
    return response.json();
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

export const checkEmailExists = async (email: string): Promise<boolean> => {
  try {
    // Construir la URL usando el path param
    const response = await fetch(
      `${encuestaUrls.user.checkUser}/email/${email}`,
      {
        method: "GET",
      }
    );

    if (!response.ok) {
      return false; // Retorna false si la petición no es exitosa
    }

    const data = await response.json();
    console.log(data,"Data")
    return data; // Retorna el valor de la respuesta
  } catch (error) {
    console.error("Error checking email:", error);
    return false;
  }
};
