import { getSurveys } from 'app/services/backEncuesta/survey';
import { SurveyComponent } from '../components/Survey';
import styles from './Home.module.sass';



const Home: React.FC = async () => {
  const surveys = await getSurveys();

  return (
    <main className={styles.main}>
      <SurveyComponent surveys={surveys} />
    </main>
  );
};

export default Home;