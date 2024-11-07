import { QuestionWrapper } from 'app/components/Survey/QuestionWrapper';
import { Question, Survey } from 'app/types';
import { getQuestions } from 'app/services/backEncuesta/questions';
import { getOneSurvey } from 'app/services/backEncuesta/survey';
import Head from 'next/head';

interface CategoryProps {
    params: {
        survey: string[];
    };
    searchParams: {
        survey: string;
    };
}

const SurveyPage: React.FC<CategoryProps> = async ({ params }) => {
    const { survey } = params;
    const questions: Question[] = await getQuestions(survey[0]);
    const surveyOne: Survey = await getOneSurvey(survey[0]);

    const surveyData: Survey = {
        id: surveyOne.id,
        name: surveyOne.name,
        description: surveyOne.description,
        questions: questions,
    };
    return (
        <>
            <Head>
                <title>{surveyData.name}</title>
            </Head>
            <QuestionWrapper survey={surveyData} />
        </>
    );
};

export default SurveyPage;