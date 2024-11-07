"use client";
import { Survey } from 'app/types';
import styles from './SurveyList.module.sass';
import Link from 'next/link';


interface SurveyListProps {
  surveys: Survey[];
  onSurveySelect: (survey: Survey) => void;
}

export const SurveyList: React.FC<SurveyListProps> = ({ surveys, onSurveySelect }) => (
  <ul className={styles.surveyList}>
    {surveys.length > 0 ? (
      surveys.map((survey: Survey) => (
        <li key={survey.id} className={styles.surveyItem} onClick={() => onSurveySelect(survey)}>
          <Link href={`/survey/${survey.id}`}>
            <h2>{survey.name}</h2>
            <p>{survey.description}</p>
          </Link>
        </li>
      ))
    ) : (
      <li>No hay encuestas disponibles</li>
    )}
  </ul>
);