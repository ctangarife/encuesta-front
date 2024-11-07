import { encuestaUrls } from './urls';
export const getSurveys = async () => {
    try {
        const response = await fetch(`${encuestaUrls.survey.all}`)
        const data = await response.json()
        return data
    } catch (error) {
        console.log(error)
    }
}
export const getOneSurvey = async (id:string ) => {
    try {
        const response = await fetch(`${encuestaUrls.survey.one}${id}`)
        const data = await response.json()
        return data
    } catch (error) {
        console.log(error)
    }
}