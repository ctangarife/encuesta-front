"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./QuestionWrapper.module.sass";
import { Question, QuestionType, Survey } from "app/types";
import {
  submitResponses,
  validateEmail,
} from "app/services/backEncuesta/response";
import { checkEmailExists } from "app/services/backEncuesta/register";

interface QuestionWrapperProps {
  survey: Survey;
}

export const QuestionWrapper: React.FC<QuestionWrapperProps> = ({ survey }) => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [answers, setAnswers] = useState<{
    [key: string]: { value: any; justification?: string };
  }>({});
  const [email, setEmail] = useState<string>("");
  const [isEmailValid, setIsEmailValid] = useState<boolean>(false);
  const [isEmailRegistered, setIsEmailRegistered] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showThankYouMessage, setShowThankYouMessage] =
    useState<boolean>(false);

  const questionsPerPage = 5;
  const totalPages = Math.ceil(survey.questions.length / questionsPerPage);

  useEffect(() => {
    const checkEmail = async () => {
      if (isEmailValid) {
        const exists = await checkEmailExists(email);
        setIsEmailRegistered(exists);

        if (!exists) {
          router.push(`/register`);
        }
      }
    };

    checkEmail();
  }, [isEmailValid, email, router]);

  const handleNextPage = async (): Promise<void> => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    } else {
      setIsSubmitting(true);
      try {
        // Preparar las respuestas en el formato esperado por el backend
        const formattedResponses = Object.keys(answers).reduce(
          (acc, questionId) => {
            acc[questionId] = {
              answer: answers[questionId].value,
              justification: answers[questionId].justification || "",
            };
            return acc;
          },
          {} as {
            [questionId: string]: { answer: any; justification?: string };
          }
        );

        // Enviar las respuestas al backend en el formato correcto
        await submitResponses(survey.id, email, {
          responses: formattedResponses,
        });
        setShowThankYouMessage(true);
      } catch (error) {
        console.error("Error submitting responses:", error);
        setIsSubmitting(false);
      }
    }
  };

  const handlePreviousPage = (): void => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleAnswerChange = (questionId: string, value: any): void => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: {
        ...prevAnswers[questionId],
        value,
      },
    }));
  };

  const handleJustificationChange = (
    questionId: string,
    value: string
  ): void => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: {
        ...prevAnswers[questionId],
        justification: value,
      },
    }));
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
    setIsEmailValid(validateEmail(emailValue));
  };

  // Función para renderizar dinámicamente cada tipo de pregunta
  const renderQuestionInput = (question: Question): JSX.Element | null => {
    const answer = answers[question.id]?.value;

    const renderJustificationField = (questionId: string) => (
      <textarea
        className={styles.justification}
        placeholder="Por favor, justifique su respuesta"
        value={answers[questionId]?.justification || ""}
        onChange={(e) => handleJustificationChange(questionId, e.target.value)}
      ></textarea>
    );

    switch (question.questionType.name) {
      case QuestionType.Closed:
        return (
          <div>
            <label>
              <input
                type="radio"
                name={`option-${question.id}`}
                value="true"
                className={styles.radio}
                checked={answer === true}
                onChange={() => handleAnswerChange(question.id, true)}
              />{" "}
              Sí
            </label>
            <label>
              <input
                type="radio"
                name={`option-${question.id}`}
                value="false"
                className={styles.radio}
                checked={answer === false}
                onChange={() => handleAnswerChange(question.id, false)}
              />{" "}
              No
            </label>
            {renderJustificationField(question.id)}
          </div>
        );

      case QuestionType.MultipleChoice:
        return (
          <div>
            {question.options?.map((option) => (
              <label key={option}>
                <input
                  type="checkbox"
                  className={styles.checkbox}
                  checked={Array.isArray(answer) && answer.includes(option)}
                  onChange={(e) =>
                    handleAnswerChange(
                      question.id,
                      e.target.checked
                        ? [...(Array.isArray(answer) ? answer : []), option]
                        : (answer as string[]).filter((opt) => opt !== option)
                    )
                  }
                />{" "}
                {option}
              </label>
            ))}
            {renderJustificationField(question.id)}
          </div>
        );

      case QuestionType.Text:
        return (
          <div>
            <input
              type="text"
              className={styles.input}
              value={answer || ""}
              onChange={(e) => handleAnswerChange(question.id, e.target.value)}
            />
            {renderJustificationField(question.id)}
          </div>
        );

      case QuestionType.ExtendedText:
        return (
          <div>
            <textarea
              className={styles.textarea}
              value={answer || ""}
              onChange={(e) => handleAnswerChange(question.id, e.target.value)}
            ></textarea>
            {renderJustificationField(question.id)}
          </div>
        );

      case QuestionType.NumericRange:
        return (
          <div>
            <input
              type="range"
              min="1"
              max="10"
              className={styles.range}
              value={answer || 1}
              onChange={(e) =>
                handleAnswerChange(question.id, Number(e.target.value))
              }
            />
            {renderJustificationField(question.id)}
          </div>
        );

      default:
        return null;
    }
  };

  if (!isEmailValid || !isEmailRegistered) {
    return (
      <div className={styles.QuestionWrapper}>
        <h2>Ingrese su correo electrónico para comenzar la encuesta</h2>
        <input
          type="email"
          className={styles.input}
          value={email}
          onChange={handleEmailChange}
        />
        {!isEmailValid && email && (
          <p>Por favor, ingrese un correo electrónico válido.</p>
        )}
      </div>
    );
  }

  const isCurrentPageValid = (): boolean => {
    const startIndex = currentPage * questionsPerPage;
    const endIndex = Math.min(
      startIndex + questionsPerPage,
      survey.questions.length
    );
    const currentQuestions = survey.questions.slice(startIndex, endIndex);

    return currentQuestions.every((question) => {
      const answer = answers[question.id]?.value;
      switch (question.questionType.name) {
        case QuestionType.Text:
        case QuestionType.ExtendedText:
        case QuestionType.NumericRange:
        case QuestionType.Closed:
          return answer !== "" && answer !== undefined;
        case QuestionType.MultipleChoice:
          return Array.isArray(answer) && answer.length > 0;
        default:
          return false;
      }
    });
  };

  if (showThankYouMessage) {
    return (
      <div className={styles.QuestionWrapper}>
        <p>Gracias por completar la encuesta.</p>
        <button onClick={() => (window.location.href = "/")}>
          Volver al inicio
        </button>
      </div>
    );
  }

  if (survey.questions.length === 0) {
    return <p>Cargando preguntas...</p>;
  }

  const startIndex = currentPage * questionsPerPage;
  const endIndex = Math.min(
    startIndex + questionsPerPage,
    survey.questions.length
  );
  const currentQuestions = survey.questions.slice(startIndex, endIndex);

  return (
    <div className={styles.QuestionWrapper}>
      <h2>{survey.name}</h2>
      <p>{survey.description}</p>
      {currentQuestions.map((question) => (
        <div key={question.id} className={styles.questionItem}>
          <p>{question.question}</p>
          {renderQuestionInput(question)}
        </div>
      ))}
      <div className={styles.navigationButtons}>
        <button
          className={styles.navButton}
          onClick={handlePreviousPage}
          disabled={currentPage === 0}
        >
          Anterior
        </button>
        <button
          className={styles.navButton}
          onClick={handleNextPage}
          disabled={
            currentPage === totalPages - 1 ? !isCurrentPageValid() : false
          }
        >
          {currentPage === totalPages - 1 ? "Finalizar" : "Siguiente"}
        </button>
      </div>
    </div>
  );
};
