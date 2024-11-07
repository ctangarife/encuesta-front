import { env } from "app/config/env"; // Environment Variables
export const encuestaUrls = {
  survey: {
    all: `${env.ENCUESTA_BACK_URL}/survey`,
    one: `${env.ENCUESTA_BACK_URL}/survey/`,
    questions: `${env.ENCUESTA_BACK_URL}/question/`,
    response: `${env.ENCUESTA_BACK_URL}/response`,
  },
  user: {
    register: `${env.ENCUESTA_BACK_URL}/users/register`,
    checkUser: `${env.ENCUESTA_BACK_URL}/users`,
  },
}; // Encuesta Back URLs
