import { encuestaUrls } from "./urls";
export const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@umanizales\.edu\.co$/;
  return emailRegex.test(email);
};

export const submitResponses = async (
  surveyId: string,
  userId: string,
  data: {
    responses: {
      [questionId: string]: { answer: any; justification?: string };
    };
  }
) => {
  try {
    const body = JSON.stringify({
      surveyId,
      userId,
      responses: data.responses,
    });

    const response = await fetch(`${encuestaUrls.survey.response}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: body,
    });

    if (!response.ok) {
      throw new Error("Failed to submit responses");
    }

    console.log("Responses submitted successfully");
  } catch (error) {
    console.error("Error submitting responses:", error);
  }
};
