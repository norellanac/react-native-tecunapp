import { getCompany, getNameCompany, getOtherCompany, loadingCompany, errorCompany } from '../types/rrhhTypes';
import { apiUrl } from '../../App';


export const allCompany = token => async dispatch => {
    try {

        const response = await fetch(`${apiUrl.link}/api/allCompany`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
                Authorization: `Bearer ${token}`
            }
        });

        dispatch({
            type: loadingCompany
        });

        const data = await response.json();

        dispatch({
            type: getCompany,
            payload: data.companies,
            cargando: false
        });
        
    } catch (error) {
        dispatch({
            type: errorCompany,
            error: error.message,
            cargando: false
        });
    }
}