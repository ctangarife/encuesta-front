import { encuestaUrls } from './urls';
export const getQuestions = async (id:string) => {
    try {
        const response = await fetch(`${encuestaUrls.survey.questions}${id}`)
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error)
    }
}