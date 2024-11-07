"use client";
import styles from './SurveyComponent.module.sass';
import { SurveyList } from 'app/components/Home/';
import { Survey } from 'app/types';
import { useState } from 'react';

interface SurveyComponentProps {
  surveys: Survey[];
}

export const SurveyComponent: React.FC<SurveyComponentProps> = ({ surveys }) => {
  const [selectedSurvey, setSelectedSurvey] = useState<Survey | null>(null);

  const handleSurveySelect = (survey: Survey) => {
    setSelectedSurvey(survey);
  };

  return (
    <section className={styles.SurveyComponent}>
      <div>
        <h2>Encuestas:</h2>
        <SurveyList surveys={surveys} onSurveySelect={handleSurveySelect} />
      </div>
    </section>
  );
};