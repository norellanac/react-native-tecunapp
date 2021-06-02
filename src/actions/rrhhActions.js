import { getCompany, getNameCompany, getOtherCompany, loadingCompany, loadingCompanyOnlySendVacation, loadingCompanyOnlySendCertificate, errorCompany } from '../types/rrhhTypes';
import { apiUrl } from '../../App';


export const allCompany = token => async dispatch => {
    dispatch({
        type: loadingCompany
    });

    try {

        const response = await fetch(`${apiUrl.link}/api/allCompany`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
                Authorization: `Bearer ${token}`
            }
        });

        const data = await response.json();

        dispatch({
            type: getCompany,
            payload: data.companies,
            //cargando: false
        });
        
    } catch (error) {
        dispatch({
            type: errorCompany,
            error: error.message,
            //cargando: false
        });
    }
}

export const mailVacation = (objectMail, token) => async dispatch => {
    dispatch({
        type: loadingCompanyOnlySendCertificate
    });

    try {
        let dataForm = "_method=" + encodeURIComponent("POST");
        dataForm += "&email=" + encodeURIComponent(objectMail.email);
        dataForm += "&emailUser=" + encodeURIComponent(objectMail.emailUser);
        dataForm += "&departament=" + encodeURIComponent(objectMail.departament);

        const response = await fetch(`${apiUrl.link}/api/mailVacation`, {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
                Authorization: `Bearer ${token}`,
                Params: `json ${dataForm}`,
            },
            body: dataForm
        });
        
        const data = await response.json();

        console.log("Data en mailVacation ",data);

        if (!response.ok) {
            dispatch({
              type: errorCompany,
              error: "Error al enviar el correo, " + response.status,
              cargando: false
            });
          } else {
            dispatch({
              type: getOtherCompany,
              otherCompany: data.message,
              cargando: false
            });
          }

    } catch (error) {
        dispatch({
            type: errorCompany,
            error: error.message,
            cargando: false
          });
    }
}

export const mailCertificate = (objectMail, token) => async dispatch => {
    dispatch({
        type: loadingCompanyOnlySendVacation
    });

    try {

        let dataForm = "_method=" + encodeURIComponent("POST");
        dataForm += "&country=" + encodeURIComponent(objectMail.country);
        dataForm += "&emailUser=" + encodeURIComponent(objectMail.emailUser);
        dataForm += "&pais=" + encodeURIComponent(objectMail.pais);

        const response = await fetch(`${apiUrl.link}/api/mailConstancy`, {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
                Authorization: `Bearer ${token}`,
                Params: `json ${dataForm}`,
            },
            body: dataForm
        });
        
        const data = await response.json();

        console.log("Data mailCertificate ",data);

        if (!response.ok) {
            dispatch({
              type: errorCompany,
              error: "Error al enviar el correo, " + response.status,
              cargcargandoVacationando: false
            });
          } else {
            dispatch({
              type: getNameCompany,
              nameCompany: data.message,
              cargcargandoVacationando: false
            });
          }

    } catch (error) {
        dispatch({
            type: errorCompany,
            error: error.message,
            cargcargandoVacationando: false
          });
    }
}